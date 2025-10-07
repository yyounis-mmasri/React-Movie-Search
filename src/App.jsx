import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Details from "./pages/Details.jsx";

const navStyle = {
  display: "flex",
  gap: 16,
  padding: "12px 16px",
  borderBottom: "1px solid #eee",
  position: "sticky",
  top: 0,
  background: "#fff",
  zIndex: 10,
};

export default function App() {
  return (
    <BrowserRouter>
      {/* Dev Nav*/}
      <nav style={navStyle}>
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/movie/123">Details</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<Details />} />

        <Route path="*" element={<div style={{ padding: 16 }}>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
