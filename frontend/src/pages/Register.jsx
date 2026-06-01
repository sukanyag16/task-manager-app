import { useState } from "react";

import { Link,
         useNavigate }
from "react-router-dom";

import API from "../services/api";

function Register() {

  const navigate =
    useNavigate();

  const [name,setName] =
    useState("");

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

  const register =
    async (e) => {

      e.preventDefault();

      localStorage.setItem(
  "demoUser",
  JSON.stringify({
    name,
    email,
    password
  })
);

alert("Registration successful");

navigate("/");

    };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>Create Account</h1>

        <form onSubmit={register}>

          <input
            placeholder="Name"
            onChange={(e)=>
              setName(e.target.value)}
          />

          <input
            placeholder="Email"
            onChange={(e)=>
              setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e)=>
              setPassword(e.target.value)}
          />

          <button>
            Register
          </button>

        </form>

        <Link to="/">
          Back to Login
        </Link>

      </div>

    </div>

  );
}

export default Register;