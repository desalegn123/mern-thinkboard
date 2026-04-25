import React from 'react';
import { Route, Routes } from 'react-router';
import HomePages from './Pages/HomePages';
import CreatePage from './Pages/CreatePage';
import NoteDetails from './Pages/NoteDetails';
import toast from 'react-hot-toast';

const App = () => {
  return (
    <div className="relative w-full min-h-screen">
      <div className="absolute w-full h-full inset-0 -z-10 items-center px-4 py-24 [background:radial-gradient(125%_125%_at_50%_10%, #000_60%, #00FF9040_100%)]" />
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetails />} />
      </Routes>
    </div>
  );
};

export default App;
