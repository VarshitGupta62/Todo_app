import Main from '../component/Main';
import Update from '../component/Update';
import { BrowserRouter , Routes , Route } from 'react-router-dom';

//  import React from 'react'
 
 function Router() {
   return (
      <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/update/:id" element={<Update />}/>
      </Routes>
      </BrowserRouter>
      </>
   )
 }

 export default  Router
 