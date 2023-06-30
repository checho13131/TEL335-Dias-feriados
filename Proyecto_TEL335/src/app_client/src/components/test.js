import React from 'react';
import { useEffect, useState } from "react";
import Axios from "axios";

function Test() {
    const [listOfTask, setListOfTask] = useState([]);

    useEffect(()=> {
      Axios.get("http://localhost:3001/api/tasks").then((response)=>{setListOfTask(response.data)})
    }, [] );
  
    return (
      
      <div className="App">
        <div className="taskDisplay"> 
          {listOfTask.map((user)=>{
            return(
              <div> 
                <h1>title: {user.title} </h1>
                <h1>description: {user.description} </h1>
              </div>
            );
            
          })}
        </div>
      </div>
    );
}
export default Test;