import React from 'react'
import Form from './components/Form';
import FormData from './components/Formdata';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';


const App = () => {
  return (
  // <div className="container">
  //     <Form/>
  //   </div>
<div className=" border-l-orange-900">

<Router>

   <Routes>
    <Route exact path="/" element={<Form/>} />
    <Route path="/entries" element={<FormData/>} />
    </Routes>

</Router>
</div>

  )
}

export default App
