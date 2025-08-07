import { Routes, Route } from 'react-router';
import './App.css';
import Home from './Home';
import Shop from './Shop';
import OpenPack from './OpenPack';
import Battle from './Battle';
import AppContext from './AppContext';
import {useEffect, useState} from 'react';
import { getPack } from './utils';

export default function App() {
  const [funds, setFunds] = useState(1000);
  const [packs, setPacks] = useState([]);

  useEffect( ()=>{
    getPack((pack)=>{setPacks([...packs, pack])})
  },[])
  return (
    <AppContext.Provider value={{credits: funds, setCredits: setFunds, cardPacks: packs}}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/open-packs' element={<OpenPack/>}/>
        <Route path='/battle' element={<Battle/>}/>
      </Routes>
    </AppContext.Provider>
  )
}
