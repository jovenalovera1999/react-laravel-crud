import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Genders from "./pages/gender/Genders";
import AddGender from "./pages/gender/AddGender";
import EditGender from "./pages/gender/EditGender";
import AddUser from "./pages/user/AddUser";
import DeleteGender from "./pages/gender/DeleteGender";
import Users from "./pages/user/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/genders" element={<Genders />} />
        <Route path="/gender/add" element={<AddGender />} />
        <Route path="/gender/edit/:gender_id" element={<EditGender />} />
        <Route path="/gender/delete/:gender_id" element={<DeleteGender />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/add" element={<AddUser />} />
      </Routes>
    </Router>
  );
}

export default App;
