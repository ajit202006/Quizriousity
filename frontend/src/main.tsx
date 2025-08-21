import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { ContextToken } from './contexts/TokenContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextToken>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextToken>
  </StrictMode>,
)
