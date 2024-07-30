import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Genders from "./pages/gender/Genders";
import AddGender from "./pages/gender/AddGender";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/genders" element={<Genders />} />
        <Route path="/gender/add" element={<AddGender />} />
      </Routes>
    </Router>
  );
}

export default App;
