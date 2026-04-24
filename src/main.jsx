import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import HyperbolaClock from './HyperbolaClock.jsx';

function Router() {
  const [page, setPage] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => setPage(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return page === '#hyperbola' ? <HyperbolaClock /> : <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
