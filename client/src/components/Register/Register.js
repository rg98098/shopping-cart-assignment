import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button/Button";

import { EMAIL_REGEX_PATTERN } from "../../utility/RegexEmailPattern";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState(INITIAL_FORM);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    let formErrors = { ...INITIAL_FORM };

    // first name validation
    if (!form.firstName) {
      formErrors.firstName = "Please enter your first name.";
    }

    if (typeof form.firstName !== "undefined") {
      const re = /^\S*$/;
      if (form.firstName.length < 6 || !re.test(form.firstName)) {
        formErrors.firstName = "Please enter valid first name.";
      }
    }

    // last name validation
    if (!form.lastName) {
      formErrors.lastName = "Please enter your last name.";
    }

    if (typeof form.lastName !== "undefined") {
      const re = /^\S*$/;
      if (form.lastName.length < 6 || !re.test(form.lastName)) {
        formErrors.lastName = "Please enter valid last name.";
      }
    }

    // email validation
    if (form.email.match(EMAIL_REGEX_PATTERN)) {
      formErrors.email = "";
    } else {
      formErrors.email = "Invalid Email!";
    }

    // password validation
    if (form.password === form.confirmPassword) {
      formErrors.confirmPassword = "";
    } else {
      formErrors.confirmPassword = "Passwords don't match!. Try again";
    }

    // error checking
    const hasError = Object.values(formErrors).every(
      (item) => item.trim() === ""
    );
    if (!hasError) {
      setError({ ...formErrors });
      return;
    }
    window.localStorage.setItem("user", JSON.stringify(form));
    history.push("/login?register=true");
    setError(INITIAL_FORM);
    setForm(INITIAL_FORM);
    formErrors = { ...INITIAL_FORM };
  };

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  return (
    <div className="col-md-10 mx-auto login-container">
      <div className="row pt-5">
        <div className="col-md-7">
          <h1>Signup</h1>
          <p>We do not share your personal details with anyone</p>
        </div>
        <div className="col-md-5">
          <form autoComplete="off" onSubmit={handleSubmit} name="register">
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                className="form-control"
                required
                value={form.firstName}
                onChange={handleInputChange}
                autoFocus={true}
              />
              <label htmlFor="firstName">First Name</label>
              {error.firstName && <span className="form-error">{error.firstName}</span>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                className="form-control"
                required
                value={form.lastName}
                onChange={handleInputChange}
              />
              <label htmlFor="lastName">Last Name</label>
              {error.lastName && <span className="form-error">{error.lastName}</span>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="email"
                className={`form-control ${error.email ? "error" : ""}`}
                required
                value={form.email}
                onChange={handleInputChange}
              />
              <label htmlFor="email">Email</label>
              {error.email && <span className="form-error">{error.email}</span>}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                required
                value={form.password}
                onChange={handleInputChange}
                autoComplete="new-password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                className={`form-control ${
                  error.confirmPassword ? "error" : ""
                }`}
                required
                value={form.confirmPassword}
                onChange={handleInputChange}
                autoComplete="new-password"
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              {error.confirmPassword && (
                <span className="form-error">{error.confirmPassword}</span>
              )}
            </div>
            <Button type="submit" variant="primary" className="btn-block">
              Signup
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
