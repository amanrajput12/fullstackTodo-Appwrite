
import React, {useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [data,setData] = useState({
        title:"",
        description:""
    })
   
    const [cookies,setToken ] = useCookies();
const [todo,setTodo]= useState();
const [isedit,setIsEdit]=useState(false)
const [editItemId, setEditItemId] = useState(null);
  console.log(cookies.token);
  const tokenval = cookies.token;

     const handlechange =(e)=>{ 
        
         setData({
            ...data,
            [e.target.name]:e.target.value,
           
         })
         console.log(data);
         setEditData(e)
     }
   
    const handledata =async()=>{
        const result = await  fetch("http://localhost:8090/api/todos/create",{
            method:"POST",
            body:JSON.stringify(data),
         headers:{
                'Content-Type': 'application/json', 
                'Authorization': `${tokenval}`
            } })
            console.log('await',result.ok);
            if(result.ok === true){
                setData({
                    title:'',
                    description:''
                })
                }
            }
    
  

    useEffect(()=>{
          fetch("http://localhost:8090/api/todos",{
            method:"GET",
            
         headers:{
                'Content-Type': 'application/json', 
                'Authorization': `${tokenval}`
            } })
            .then((result)=>{

                console.log('await',result);
                   result.json()
                   .then((data)=>{
                    console.log('data',data.todos);
                    setTodo(data.todos)
                    
                })
              
            })
            
           
    },[data,editItemId])


    console.log('todo set data',todo);
    console.log( 'todo is ',Array.isArray(todo));

    const handledelte =async(e)=>{
        console.log(e);
        const result = await  fetch(`http://localhost:8090/api/todos/delete/${e}`,{
            method:"DELETE",
          
         headers:{
                'Content-Type': 'application/json', 
                'Authorization': `${tokenval}`
            } })
    }


 const handleEdit =(item)=>{
    console.log(item);
    setData({
        title:item.title,
        description:item.description
    })
    setIsEdit(true)
    setEditItemId(item._id);
 }
 
 

    const handleupdate =async()=>{
        const id = editItemId; // Use editItemId to get the item ID
        console.log("id are", id);
      
        const result = await fetch(`http://localhost:8090/api/todos/update/${id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${tokenval}`
          }
        });
        if(result.ok === true){
            setEditItemId(null);
            setData({
                title:'',
                description:''
            })
            setIsEdit(false)
        
        }

    }
    const handleLogout = async()=>{
        console.log('clicked logout');
        const resp = await fetch('http://localhost:8090/api/users/logout', {
            method: 'GET',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${tokenval}`
              }
            })
            console.log('resp',resp);
    }
  return (
<>

{ tokenval ? 
    <div className=' bg-slate-800 text-white w-screen h-screen '>
           <div className='flex justify-center pt-9 '>
        <div className='flex flex-col justify-center items-center'>
        <input className='text-center  mb-2 rounded-lg text-black' onChange={(e)=>handlechange(e)} type="text" name='title' value={data.title} placeholder='title' />
        <input className='text-center  rounded-lg text-black   ' onChange={(e)=>handlechange(e)} type="text" name='description' value={data.description} placeholder='description' />
        </div>
<button className=' bg-slate-700 ml-7 rounded-md p-2 mt-2 text-slate-50' onClick={isedit?()=>handleupdate() :()=> handledata()}>
    {isedit ? "Update" : "Submit"}
</button>

</div>
<button onClick={()=> handleLogout()} className="bg-indigo-600  md:p-2  md:mt-2  absolute top-0 right-10 mt-0 p-1  rounded-md " > Logout</button>

<div className='flex flex-col items-center mt-24'>
{
    todo ? 
    todo.map((item)=>(
        <div className='flex  gap-5 items-center' key={item._id}>
            <h3 className='flex flex-col'>
        <h3  className=' bg-slate-500 mb-2 mt-2  text-center rounded-md p-1    ' >{item.title}  </h3> 
        <h3 className=' bg-slate-500 mb-2 mt-2  text-center rounded-md p-1 ' > {item.description}  </h3>
        </h3>
        <h3>
        <h3 onClick={()=> {handleEdit(item) ; }} className='p-2 hover:cursor-pointer '>"📁</h3>
        <h3 onClick={()=>handledelte(item._id)} className='p-2 hover:cursor-pointer'>❌</h3>
        </h3>
        </div>
    ))
    :
    " error"
}
</div>
    </div>
:
<div className='w-screen  h-screen  bg-slate-800 flex flex-col   pt-8 '>
<nav className=' flex justify-around md:justify-end md:gap-10 '>

<Link className=' bg-sky-700 p-2 rounded-md text-white cursor-pointer ' to='/'>Login</Link>
<Link className=' bg-sky-700 p-2 rounded-md text-white cursor-pointer ' to='/singup'>Singup</Link>
</nav>
<div className='flex flex-col  items-center  mt-24'>
    <h1 className=' animate-bounce text-white text-2xl'> unauthorized </h1>
    <h1 className='animate-ping  text-white text-2xl mt-4'> please login </h1>
    </div>

</div>
}


    





    </>
  )
}

export default Dashboard