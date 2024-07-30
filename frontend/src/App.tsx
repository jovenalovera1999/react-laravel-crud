import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Genders from "./pages/gender/Genders";
import AddGender from "./pages/gender/AddGender";
import EditGender from "./pages/gender/EditGender";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/genders" element={<Genders />} />
        <Route path="/gender/add" element={<AddGender />} />
        <Route path="/gender/edit/:gender_id" element={<EditGender />} />
      </Routes>
    </Router>
  );
}

export default App;
