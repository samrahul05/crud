import { useEffect, useState } from 'react'
import Axios from "axios"
import './App.css'


function App() {


  const [users, setUsers] = useState([]);
  const [filterusers,setFilterusers] = useState([])
  const [isModelOpen,setIsModelOpen] =useState(false)
  const [userData,setUserData]=useState({ name:"" , age:"" , city:"" })

  const getAllUsers = async () => {
   await Axios.get("http://localhost:8080/api/Get")
      .then((res) => {
        setUsers(res.data)
        setFilterusers(res.data)
      })
      .catch((err)=>{
       console.log("SAM:",err)
      })
    
  }
  const handleSearchChange =(e) =>{
      
    const searchText = e.target.value.toLowerCase();
    const filteredUsers=users.filter((user)=>user.name.toLowerCase().includes(searchText)
           || user.city.toLowerCase().includes(searchText))
           setFilterusers(filteredUsers)
  }
  const handleUpdate =(user) =>{

    setUserData(user)
    setIsModelOpen(true)
       
     }
     const handleDelete = async (value) => {
      const isConfirm = window.confirm("Are You sure Want to Delete")
  
      if (isConfirm) {
        try {
          await Axios.delete(`http://localhost:8080/api/Delete/${value}`)
          getAllUsers()
          
        }
        
        catch (error) {
          console.log(error)
        }
      }
    }
  

  const handleAddRecord =  () =>{
    
    
      // await Axios.put("http://localhost:8080/api/Post")
      setUserData({ name:"" , age:"" , city:"" })
      setIsModelOpen(true)
    
   
    

  }

  const handleClose =() =>{
    setIsModelOpen(false)
    getAllUsers()
  }

   const handelData =(e)=>{
    setUserData({...userData ,[e.target.name]:e.target.value})
   }
    
   const handleSubmit=async(e) =>{
    e.preventDefault();
    console.log("HELLO",userData._id)
   if(userData._id){
    await Axios.put(`http://localhost:8080/api/Update/${userData._id}`,userData)
    
    .then((res)=>{
     console.log(res);
    })
   }else{
    await Axios.post("http://localhost:8080/api/Post",userData)
    .then((res)=>{
     console.log(res);
    })
   }
     handleClose()
     setUserData({ name:"" , age:"" , city:"" })
   }




  useEffect(() => {
    getAllUsers()
  }, [])


  return (
    <>
      <div className='container'>

        <h1>
          CRUD Operation
        </h1>
        <div className='input-search'>
          <input type='search' placeholder='Search Here....' onChange={handleSearchChange}/>
          <button  onClick={handleAddRecord}  className='btn green' >Add Record</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterusers && 
            filterusers.map((user,index)=>{
            return(
              <tr key={user._id}>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.city}</td>
              <td><button onClick={()=>handleUpdate(user)} className='btn green '>Edit</button></td>
              <td><button onClick={()=>handleDelete(user._id)} className='btn red'>Delete</button></td>
            </tr>
            )
            })}
            
           
          </tbody>

        </table>

        {isModelOpen && (
    <div className='form'>
    <div className='form-content'>
      <span className='close' onClick={handleClose}>
        &times;
      </span>
      <h3>Add Recored</h3>
      <div className="input-group">
        <label for="name">Name</label>
        <input type="text" value={userData.name} name="name" id='name' onChange={handelData}/>
      </div>
      <div className="input-group">
        <label for="age">Age</label>
        <input type="number" value={userData.age} name="age" id='age' onChange={handelData}/>
      </div>
      <div className="input-group">
        <label for="city">City</label>
        <input type="text" value={userData.city} name="city" id='city' onChange={handelData}/>
      </div>
      <button className='btn green' onClick={handleSubmit}>Add Record</button>
    </div>
  </div>

        )

        }
      
    

      </div>
    </>
  )
}

export default App

