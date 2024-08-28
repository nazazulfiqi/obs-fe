import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListUsersModule from "./modules/list-users/module";
import { Toaster } from "./components/ui/toaster";
import AddUserModule from "./modules/add-user/module";
import EditUserModule from "./modules/edit-user/module";

// import AddUser from "./components/AddUser";
// import EditUser from "./components/EditUser";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListUsersModule />} />
        <Route path="/add-user" element={<AddUserModule />} />
        <Route path="/edit-user/:id" element={<EditUserModule />} />
        {/* <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} /> */}
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
