import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import DetailCuaca from './DetailCuaca.jsx'
import Container from './Container.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Container>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/cuaca/:id" element={<DetailCuaca />} />
            </Routes>
        </Container>
      </BrowserRouter>
  </StrictMode>
);