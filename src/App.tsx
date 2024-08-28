import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListUsersModule from './modules/list-users/module';
import { Toaster } from './components/ui/toaster';
import AddUserModule from './modules/add-user/module';
import EditUserModule from './modules/edit-user/module';
import { ThemeProvider } from './components/ThemeProvider';

const App: React.FC = () => {
  // Removed children prop from React.FC
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ListUsersModule />} />
          <Route path="/add-user" element={<AddUserModule />} />
          <Route path="/edit-user/:id" element={<EditUserModule />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
};

export default App;
