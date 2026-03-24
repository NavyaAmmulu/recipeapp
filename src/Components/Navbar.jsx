import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { FavoritesContext } from "../Pages/FavoritesContext";
import { ThemeContext } from "../context/ThemeContext";
import "./Navbar.css";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { favorites } = useContext(FavoritesContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/?q=${search}`);
    setSearch("");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">🍽️ RecipeApp</h2>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`search-input ${darkMode ? "dark" : ""}`}
        />
        <button type="submit"
          className={`search-btn ${darkMode ? "dark" : ""}`}
        >
          Search
        </button>
      </form>

      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>

        <li className="favorites-link">
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Favorites
            {favorites.length > 0 && (
              <span className="fav-badge">{favorites.length}</span>
            )}
          </NavLink>
        </li>

        {!isLoggedIn && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Login
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Register
              </NavLink>
            </li>
          </>
        )}

        {isLoggedIn && (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}

        {/* Dark Mode Toggle */}
        <li>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`theme-btn ${darkMode ? "dark" : "light"}`}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;