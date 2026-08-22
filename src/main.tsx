import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ContentProvider } from './context/ContentContext';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContentProvider>
      <App />
    </ContentProvider>
  </StrictMode>,
);
