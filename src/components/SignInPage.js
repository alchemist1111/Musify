import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

function SignInPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  async function handleFormSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          if (rememberMe) {
            localStorage.setItem("username", username);
          }
          navigate("/home");
        } else {
          setError("Invalid username or password.");
        }
      } else {
        setError("Failed to authenticate.");
      }
    } catch (error) {
      setError("An error occurred while authenticating.");
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Sign In</div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(event) => setUserName(event.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
              </form>
            </div>
            <div className="card-footer">
              <Link to="/signup">Don't have an account? Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
