import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [data,setData] = useState({

        email:"",
        password:""
    })
    const handlechange =(e)=>{
setData({
    ...data,
    [e.target.name]:e.target.value
})
console.log(data);
    }
    const handlesubmit =async(e)=>{
 e.preventDefault()

 const result = await fetch("/api/users/login",{
    method:"POST",
    credentials:'include',
    body:JSON.stringify(data),
    headers:{
        'Content-Type': 'application/json', 
    } })

    
        
    console.log('reslult',result.ok);
    console.log('promise',result.body);
    if(result.ok === true){

        navigate('/dashboard')
    }
    }
  return (
    
    <div className="  bg-stone-800 w-screen  flex justify-center items-center h-screen">
        <div className='flex flex-col w-1/4  gap-6 mb-6'>

      <input name='email' value={data.email} onChange={(e)=>handlechange(e)}  className='text-center' type="text" placeholder='email' />
      <input  name='password' value={data.password} onChange={(e)=>handlechange(e)}  className='text-center' type="password" placeholder='Password' />
 <button  onClick={(e)=>handlesubmit(e)} className='text-center bg-sky-700 rounded-2xl hover:bg-sky-950 hover:text-white' >Submit</button>
 <h1 className='text-center text-cyan-500'>Don't have an account?  yet</h1>
    <h3 onClick={()=>navigate('/singup')} className='text-center text-cyan-600 hover:text-sky-700 cursor-pointer hover:outline-dashed hover:rounded-3xl' >Create an account</h3>
 </div>
    </div>
  )
}

export default Login