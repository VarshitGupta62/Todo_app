import { useState } from 'react';
import '../style/Style.css';
import axios from 'axios';

function Add() {
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");

  function handelName(event){
    setName(event.target.value);
  }

  function handelpassword(event){
    setpassword(event.target.value);
  }

  async function addData(){

    try {
      const response = await axios.post('http://localhost:3000/api/students', {
        name: name,
        password: password
      });
      
      console.log("Data added successfully:", response.data);

      // Clear the input fields after successful addition
      setName("");
      setpassword("");
      alert("Data added successfully");
    } catch (error) {
      console.error("Error adding data:", error);
    }
  }

  return (
    <>
      <div className='main' >
        <h2>Todo App</h2>
        <hr />
        <label>Username : </label>
        <input type="text" name='name' placeholder='Enter your username' className='inputBox' value={name} onChange={handelName} required/>
        <br />
        <br />
        <label>Password : </label>
        <input type="password" name='password' placeholder='Enter your password' className='inputBox' value={password} onChange={handelpassword} required/>
        <br />
        <br />
        <button className='btn' onClick={addData}>Add</button>
      </div>
    </>
  );
}

export default Add;
