import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";
import RecipeDetails from "./Pages/RecipeDetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./Components/Navbar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Home />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipe/:id"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <RecipeDetails />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Favorites />
              </>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

