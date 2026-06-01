import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleLogin =
    (e) => {

      e.preventDefault();

      const savedUser =
        JSON.parse(
          localStorage.getItem(
            "demoUser"
          )
        );

      if (
        savedUser &&
        savedUser.email === email &&
        savedUser.password === password
      ) {

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        navigate(
          "/dashboard"
        );

      }

      else {

        setError(
          "Invalid credentials"
        );

      }

    };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>TaskFlow</h1>

        <form
          onSubmit={
            handleLogin
          }
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          New user?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

        {error && (
          <p
            style={{
              color: "red"
            }}
          >
            {error}
          </p>
        )}

      </div>

    </div>

  );

}

export default Login;