import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

  
function MyApp() {
    const [characters, setCharacters] = useState([]);
  
    //DELETE on backend
    function removeOneCharacter(id) {

      fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE"
      })
      .then((res) => {
        if (res.status == 204){
          setCharacters((prev) => prev.filter((user) => user._id !== id));
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }

    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json)) //changed this
        .catch((error) => { console.log(error); });
    }, [] );

    function postUser(person) {
      const promise = fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }

    
    function updateList(person) { 
      postUser(person)
        .then((res) => {
          if (res.status != 201){ //Use 201 Content Created
            throw new Error("Error: User could not be added");
          }
          return res.json();
        })
        .then((newperson) => { 
          console.log("User added:", newperson);
          setCharacters((prev) => [...prev, newperson]);
        })
        .catch((error) => {
          console.log(error);
        })
    }

    return (
      <div className="container">
        <Table
          characterData={characters}
          removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
      </div>
    );
  }


export default MyApp;