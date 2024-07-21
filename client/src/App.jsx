import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import AuthChecker from './components/Main/AuthChecker'; 
import FloatingCartIcon from './components/Main/Home/FloatingCartIcon/FloatingCartIcon';
import { AlertProvider } from './components/Common/AlertContext/AlertContext';
import './styles/styles.scss'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AlertProvider>
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