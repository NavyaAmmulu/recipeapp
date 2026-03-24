import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      alert("Email already registered! Please login.");
      return;
    }

    // Add new user
    const newUser = { email, password };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
