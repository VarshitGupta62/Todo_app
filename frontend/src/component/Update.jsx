import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/Style.css';

function Update() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState(''); 
  const history = useNavigate(); 

  const { id } = useParams();

  const handleName = (event) => {
    setName(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios.get(`http://localhost:3000/api/students/${id}`)
      .then(response => {
        setName(response.data.name);
        setPassword(response.data.password);
      })
      .catch(error => console.error(error));
    }, []);
  
  const updateData = () => {
    axios.put(`http://localhost:3000/api/students/${id}`, {
      name: name,  
      password: password  
    })
    .then(response => {
      console.log('Data updated successfully:', response);
      alert("User data has been updated!");
      setName("");
      setPassword("");
      history('/'); // Redirect to the home page
    })
    .catch(error => {
      console.error('Error updating data:', error);
    });
  }

  return (
    <div className='main'>
      <h2>Update Data</h2>
      <hr />
      <label>Username: </label>
      <input type="text" name='name' className='inputBox' value={name} onChange={handleName} />
      <br />
      <br />
      <label>Password : </label>
      <input type="text" name='password' className='inputBox' value={password} onChange={handlePassword} />
      <br />
      <br />
      <button className='btn' onClick={updateData}>Update</button>  
    </div>
  );
}

export default Update;
