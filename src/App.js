import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const [listOfFriends, setListOfFriends] = useState([]);

  const addFriend = () => {
    Axios.post('http://localhost:3001/addfriend', 
      {name: name, age: age,
    }).then(()=> {
      setListOfFriends([...listOfFriends, {name:name, age:age}])
    });
  };

  const updateFriend = (id) => {
    const newAge = prompt("Enter new age:");
    Axios.put('http://localhost:3001/update',{ newAge: newAge, id: id }).then(() => {
      setListOfFriends(listOfFriends.map((val) => {
        return val._id === id ? {_id: id, name: val.name, age: newAge} : val
      }))
    })
  }

  const deleteFriend = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setListOfFriends(listOfFriends.filter((val) => {
        return val._id != id;
      }))
    })
  }

  useEffect(() => {
    Axios.get('http://localhost:3001/read')
      .then((response)=> {
        setListOfFriends(response.data);
      }).catch(() => {
        console.log("ERR");
      });
    }, []
  );

  return (
    <div className="App">
      <div className="inputs">
        <input type="text" 
          placeholder="Friend Name" 
          onChange= {event =>{setName(event.target.value);
          }}
        />
        <input type="number" 
          placeholder="Friend Age"
          onChange={event =>{setAge(event.target.value);
          }}
        />

        <button onClick={addFriend}>Add Friend</button>
      </div>

      <div className="listOfFriends">
        {listOfFriends.map((val) => {
          return (
            <div className="friendContainer">
              <div className="friend">
                <h3>Name: {val.name}</h3> 
                <h3>Age: {val.age}</h3>
              </div>
              <button onClick={() =>
                updateFriend(val._id)}>Update</button>
              <button id="removeBtn"
                onClick={() =>
                  deleteFriend(val._id)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
