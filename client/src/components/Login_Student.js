import React,{useState} from 'react';
import { useHistory} from "react-router-dom";
import {toast} from 'react-toastify';

const Login = ({setAuth}) => {
    let history = useHistory();
    const [inputs,setInputs]=useState({
        email:"",
        password:""
    });
    const {email,password} = inputs;
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value});
    };
    const onSubmitForm= async (e) => {
        e.preventDefault();
        try {
            const body = { email, password};
            const response = await fetch(
              "http://localhost:3005/login/Students",
              {
                method: "POST", 
                headers: {
                  "Content-type": "application/json"
                },
                body: JSON.stringify(body)
              }
            );
            const parseRes = await response.json();
            if (parseRes.token){
                localStorage.setItem("token",parseRes.token);
                setAuth(true);
                toast.success("Login Successfully");
            }
            else{  
                toast.error(parseRes);
                setAuth(false);
            }
            history.push(`/studentView/${parseRes.userRefID}`)
             
        } catch (err) {
            console.log(err.message);
        }
    }
    const Admin = () =>{
        history.push("/login");
    }
    const Teachers = () =>{
        history.push("/login/Teachers");
    }
    return (
        <section className='login'>
    <div className="loginContainer">
    <h1  className="text-center my-5 log">Login</h1>
    <label className="text-center my-5 log">You are Logging as Student!</label>
        <label>Email</label>
		<input type="text" 
		name = "email"
		value ={email}
		 placeholder="email" 
		 onChange={e=>onChange(e)}
		/>
        <label>Password</label>
		<input
	  type="password"
	  name="password"
	  value={password}
	  placeholder="password"
	  onChange={e=>onChange(e)}
	  />
      <label></label>
      <div class="btn-group btn-group-" role="group" ><button onClick={Admin} className="btn btn-outline-success">Admin</button>
      <button onClick={Teachers} className="btn btn-outline-primary">Teacher</button></div>
      <label></label>
   <button className = "btn btn-danger" onClick={onSubmitForm} >Submit</button>
	</div>
</section>

    );
};
export default Login;