
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Singup = () => {
    const navigate = useNavigate()
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })
    const handlechange = (e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
        console.log(data);
    }
    const handlesubmit = async(e)=>{
    e.preventDefault()
   
    console.log("clicked");
      const result = await fetch("/api/users/register",{
        method:"POST",
        credentials:'include',
        body:JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json', 
        } })
        console.log('reslult',result);
        if(result){
            navigate('/dashboard')
        }
     
    }
    const login = ()=>{
        navigate('/')
    }
  return (
    <div className="  bg-stone-800 w-screen  flex justify-center items-center h-screen">
        <div className='flex flex-col w-1/4  gap-6 mb-6'>
      <input name='name' value={data.name} onChange={(e)=>handlechange(e)} className='text-center' type="text"  placeholder='name' />
      <input name='email' value={data.email} onChange={(e)=>handlechange(e)}  className='text-center' type="text" placeholder='email' />
      <input  name='password' value={data.password} onChange={(e)=>handlechange(e)}  className='text-center' type="password" placeholder='Password' />
 <button  onClick={(e)=>handlesubmit(e)} className='text-center bg-sky-700 rounded-2xl hover:bg-sky-950 hover:text-white' >Submit</button>
 <h1 className='text-center text-cyan-500'>Already have an account?  yet</h1>
    <h3 onClick={()=>login()} className='text-center text-cyan-600 hover:text-sky-700 cursor-pointer hover:outline-dashed hover:rounded-3xl' >Login</h3>
 </div>
    </div>
  )
}

export default Singup