import React, { useState } from 'react';

const Modal = () => {
  const initialFormState = {
    firstName: '',
    lastName: '',
    address: '',
    country: '',
    email: '',
    phone: '',
  };

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = 'First Name is required';
    if (!form.lastName) newErrors.lastName = 'Last Name is required';
    if (!form.address) newErrors.address = 'Address is required';
    if (!form.country) newErrors.country = 'Country is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Please enter a valid email';
    if (!form.phone || !/^\d{10}$/.test(form.phone)) newErrors.phone = 'Please enter a valid phone number with exactly 10 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      // Reset the form after a short delay to show the alert message
      setTimeout(() => {
        setForm(initialFormState);
        setErrors({});
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For phone number, allow only numeric input and limit to 10 digits
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
      if (numericValue.length > 10) return; // Limit to 10 digits
      setForm({
        ...form,
        [name]: numericValue,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }

    // Real-time validation
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content sidebar rounded-5">
            <div className="modal-body">
              <div>
                <div className="row">
                  <div className="col-md-4">
                    <ul className="nav nav-pills flex-column mb-auto h-100">
                      <li className="nav-item text-dark mt-2">
                        <div className="shadow-sm p-3 mb-5 bg-white rounded text-center">
                          <h3 className="mb-0">Hi Reader,</h3>
                          <span className="mb-0">Here's Your News</span>
                        </div>
                      </li>
                      <li className="nav-item text-dark mt-2 text-center">
                        <div className="shadow-sm p-3 mb-5 bg-white rounded">
                          <h3>Have a Feedback</h3>
                          <button className="border-0 rounded-3 py-2 px-5 btnbg feedbackbtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            We're Listening!
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-8 d-flex justify-content-center">
                    <div>
                      <h3>Thank You so Much for Taking The Time!</h3>
                      <p>Please provide the below details!</p>
                      {isSubmitted && <div className="alert alert-success">Form submitted successfully!</div>}
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-8 mb-3">
                            <label htmlFor="exampleInputFname" className="form-label">First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputFname"
                              name="firstName"
                              value={form.firstName}
                              onChange={handleChange}
                              placeholder="John"
                            />
                            {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-8 mb-3">
                            <label htmlFor="exampleInputLname" className="form-label">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputLname"
                              name="lastName"
                              value={form.lastName}
                              onChange={handleChange}
                              placeholder="Doe"
                            />
                            {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3">
                            <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                            <textarea
                              className="form-control"
                              id="exampleInputAddress"
                              name="address"
                              value={form.address}
                              onChange={handleChange}
                              placeholder="Enter Your Full Postal Address"
                            />
                            {errors.address && <div className="text-danger">{errors.address}</div>}
                          </div>
                        </div>
                        <div className="col-md-8 mb-3">
                          <label htmlFor="exampleInputCountry" className="form-label">Country</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputCountry"
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            placeholder="India"
                          />
                          {errors.country && <div className="text-danger">{errors.country}</div>}
                        </div>
                        <div className="row">
                          <div className="col-md-8 mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input
                              type="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="example@sample.com"
                            />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-8 mb-3">
                            <label htmlFor="exampleInputNumber" className="form-label">Phone Number</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputNumber"
                              name="phone"
                              value={form.phone}
                              onChange={handleChange}
                              placeholder="9876543456"
                            />
                            {errors.phone && <div className="text-danger">{errors.phone}</div>}
                          </div>
                        </div>
                        <button type="submit" className="btn text-white submitbtn py-2 px-5">Submit Feedback</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
