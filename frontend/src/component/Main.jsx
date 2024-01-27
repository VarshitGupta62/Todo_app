import '../style/Style.css';
import { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import Add from './Add';
import axios from 'axios';

function Main(){

  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios.get('http://localhost:3000/api/students')
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
    }, []);

    const handleDeleteItem = (id) => {
        axios.delete(`http://localhost:3000/api/students/${id}`)
          .then(() => setItems(items.filter(item => item._id !== id)))
          .catch(error => console.error(error));

          alert("Data Delete Successfully")
      };

    return(
        <>
        <Add/>
        <br />
          <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                   {items.map((data , index) => (
                    <tr key={index} >
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.password}</td>
                        <td>
                            <button className='btn'>
                                <Link style={{textDecoration: 'none' , color : 'white' }} to={`/update/${data._id}`} >Update</Link>
                            </button>
                        </td>
                        <td><button className='btn' onClick={() => handleDeleteItem(data._id) }>Delete</button></td>
                    </tr>
                   ))}
                     
                </tbody>
            </table>
        </div>
        </>
    );
}
export default Main;