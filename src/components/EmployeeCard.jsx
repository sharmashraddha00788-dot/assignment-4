import React, { useEffect, useState } from 'react'

import axios from 'axios'
import {createuserapi,getuserapi,updateuserapi,deleteuserapi} from "../service/api"

const EmployeeCards = () => {
  const[users, setUsers] = useState([])

  const[newUser, setNewUser] = useState({
      name:'',
      email:'',
      empId:''
  })

  async function getUserData(){
    try {
      const response = await axios.get(getuserapi)
      console.log(response.data.user )

      setUsers(response.data.user)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getUserData()
  },[])


  function changeHandler(e){

      let {name, value} = e.target
   

      setNewUser((preItem)=>{
        return {...preItem, [name]:value}
      })

  }


    async function createUser(){
      try {
        const response = await axios.post(createuserapi, newUser )
        console.log(response)
        getUserData()
      } catch (error) {
        console.log(error)
      }
    }


  function submitHandler(e){
    e.preventDefault()
    // console.log(e)
    createUser()
    // console.log(newUser)


  }
  
  return (
    <div>
        <h1>Employee System App</h1>
        <form onSubmit={submitHandler}>
            <input onChange={changeHandler} name='name' placeholder='Name'/><br/>
            <input  onChange={changeHandler} name='email' placeholder='Email'/><br/>
            <input  onChange={changeHandler} name='empId' placeholder='Emp. Id'/><br/>
            <button type='submit'>Sumbit</button>
        </form>


        <div>
          {
            users.map((item,i)=>{
              return <div key={i}>
                <p>Name : {item.name}</p>
                <p>Email : {item.email}</p>
                <p>Emp. Id: {item.empId}</p>
                <div>
                  <button>Delete</button>
                  <button>Edit</button>
                </div>
                <hr/>
              </div>
            })
          }
        </div>
    </div>
  )
}

export default EmployeeCards