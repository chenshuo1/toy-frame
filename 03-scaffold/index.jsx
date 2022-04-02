import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import TodoApp from './pages';
import About from './pages/about';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<TodoApp />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  </HashRouter>
);
