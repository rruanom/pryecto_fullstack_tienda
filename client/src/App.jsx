import React, { useEffect, useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import AuthChecker from './components/Main/AuthChecker'; 
import FloatingCartIcon from './components/Main/Home/FloatingCartIcon/FloatingCartIcon';
import { AlertProvider } from './components/Common/AlertContext/AlertContext';
import './styles/styles.scss'

function NotificationHandler() {
  const [message, setMessage] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const msg = params.get('message');
    if (msg) {
      setMessage(msg);
      setTimeout(() => setMessage(null), 3000); // El mensaje desaparece después de 3 segundos
    }
  }, [location]);

  if (!message) return null;

  return (
    <div className="notification">
      {message}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AlertProvider>
          <NotificationHandler />
          <AuthChecker /> 
          <Header />
          <Main />
          <Footer />
          <FloatingCartIcon />
        </AlertProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;