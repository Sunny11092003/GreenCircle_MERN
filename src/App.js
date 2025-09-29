import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TreeDetails from "./pages/TreeDetails";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/tree/:id" element={<TreeDetails />} />
        <Route path="*" element={<p className="p-4">Page not found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
