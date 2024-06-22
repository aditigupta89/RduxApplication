import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_Card, removeCard, setCurrentPage } from '../redux/featuresSlice';

const CardData = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, Cards, currentPage, cardsPerPage } = useSelector(state => state.feature);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      dispatch(get_Card());
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleRemoveCard = (index) => {
    const actualIndex = (currentPage - 1) * cardsPerPage + index;
    dispatch(removeCard(actualIndex));
  };

  const handlePaginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = Cards.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(Cards.length / cardsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading cards...</div>;
  }

  if (isError) {
    return <div>Error loading cards. Please try again.</div>;
  }

  return (
    <>
      <div className="tab-content mt-5" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-card" role="tabpanel" aria-labelledby="pills-card-tab">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {currentCards.map((card, index) => (
              <div className="col" key={card.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <div>
                      <h4
                        className="text-end text-danger mb-0"
                        onClick={() => handleRemoveCard(index)}
                        style={{ cursor: 'pointer' }}
                      >
                        X
                      </h4>
                    </div>
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text">{card.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav>
        <ul className="pagination justify-content-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <a onClick={() => handlePaginate(i + 1)} className="page-link" href="#!">
                {i + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default CardData;
