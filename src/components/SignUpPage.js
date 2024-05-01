import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function SignUpPage() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleUserNameChange(event) {
    setUserName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    // Client-side validation
    if (!username || !email || !password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    const formData = {
      username: username,
      email: email,
      password: password
    };

    // Assuming you have an endpoint to send the data to
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        // Reset form and show success message
        setIsSubmitted(true);
        setErrorMessage("");
        setUserName("");
        setEmail("");
        setPassword("");
      } else if (response.status === 409) {
        // Account already exists
        setErrorMessage("An account with this email or username already exists.");
      } else {
        // Handle other server errors
        return response.json().then(data => {
          setErrorMessage(data.error || "Something went wrong. Please try again.");
        });
      }
    })
    .catch(error => {
      // Handle network errors
      setErrorMessage("Network error. Please try again.");
    });
  }

  return (
    <div className="container bg-primary d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h2 className="mb-4">Sign Up</h2>
        {isSubmitted ? (
          <p>Sign up successful! <Link to="/">Sign In</Link></p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="username" className="form-label"> Username:
              <input type="text" className="form-control" id="username" name="username" value={username} required onChange={handleUserNameChange} />
            </label>
            <label htmlFor="email" className="form-label"> Email:
              <input type="email" className="form-control" id="email" name="email" value={email} required onChange={handleEmailChange} />
            </label>
            <label htmlFor="password" className="form-label"> Password:
              <input type="password" className="form-control" id="password" name="password" value={password} required onChange={handlePasswordChange} />
            </label>
            <button type="submit" className="btn btn-primary">Sign Up</button>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </form>
        )}
      </div>
      <div className="mt-3">
        <p>Already have an account? <Link to="/">Sign In</Link></p>
      </div>
    </div>
  );
}

export default SignUpPage;
