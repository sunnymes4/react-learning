import './App.css';
import { Header } from './components';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Cart, Home} from './components'

function App() {
  return (
    // <CartContext>

    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/cart' element={<Cart/>} />
      </Routes>
    </BrowserRouter>
    // </CartContext>
  );
}

export default App;
