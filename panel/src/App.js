import logo from './logo.svg';
import './App.css';
import { Suspense } from 'react';
import { MainLayaout } from './Components';
import {  HardSearch ,Hardresult} from './Pages';
import { Routes, Route } from "react-router-dom";


function Error404() {
  return (
    <div>
      <h2>Aradığınız Sayfa Bulunamadı</h2>
    </div>
  )
}


function App() {
  return (
    <Suspense fallback={<p>Yükleniyor....</p>} >
      <Routes>
        <Route element={<MainLayaout />} >
          <Route path="/" element={<HardSearch />} />
          <Route path="/hard" element={<HardSearch />} />
          <Route path="/hardresult" element={<Hardresult />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}

export default App;
