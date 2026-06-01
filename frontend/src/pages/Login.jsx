import { useState } from "react";
import { Link,
         useNavigate } from "react-router-dom";

import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

  const [error,setError] =
    useState("");

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await API.post(
            "/login",
            {
              email,
              password
            }
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        navigate("/dashboard");

      }

      catch {

        setError(
          "Invalid credentials"
        );

      }

    };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>TaskFlow</h1>

        <form onSubmit={handleLogin}>

          <input
            placeholder="Email"
            value={email}
            onChange={(e)=>
              setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>
              setPassword(e.target.value)}
          />

          <button>
            Login
          </button>

        </form>

        <p>
          New user?
          <Link to="/register">
            Register
          </Link>
        </p>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

      </div>

    </div>

  );
}

export default Login;