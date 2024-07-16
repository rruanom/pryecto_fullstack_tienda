import { BrowserRouter } from 'react-router-dom';
//import './App.css'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
//importamos contexto
function App() {
  return (
    <>
      <BrowserRouter >
        <Header />
        <Main />
      </BrowserRouter>
      <Footer />
    </>
  )
}
export default App
