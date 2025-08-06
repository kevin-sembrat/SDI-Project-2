import { Routes, Route } from 'react-router';
import './App.css';
import Home from './Home';
import Shop from './Shop';
import OpenPack from './OpenPack';
import Battle from './Battle';

export default function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/open-packs' element={<OpenPack/>}/>
        <Route path='/battle' element={<Battle/>}/>
      </Routes>

    </>
  )
}
