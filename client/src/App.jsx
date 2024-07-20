import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import AuthChecker from './components/Main/AuthChecker'; 

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthChecker /> 
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;