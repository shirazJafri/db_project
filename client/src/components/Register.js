import React,{Fragment,useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
const Register = ({setAuth}) => {
    const [inputs,setInputs] = useState({
        email: "",
    password: "",
    name: "",
    type:"",
    id:0
    });
    const { email, password, name,type,id } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = { email, password, name,type,id };
          const response = await fetch(
            "http://localhost:3005/register",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
            }
          );
          const parseRes = await response.json();
          if(parseRes.token){
            //localStorage.setItem("token",parseRes.token);
           // console.log(parseRes.rows[0].user_type)
            setAuth(true);
            toast.success("Registration Successful");
          }
            else{
              setAuth(false);
              toast.error(parseRes);
            }
        } catch (err) {
          console.error(err.message);
        }
      };
    return (
        <Fragment>
            <h1 className="text-center my-5">Register</h1> 
            <form onSubmit={onSubmitForm}>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="email"
              className="form-control my-3"
              onChange={e => onChange(e)}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="password"
              className="form-control my-3"
              onChange={e => onChange(e)}
            />
            <input
              type="text"
              name="name"
              value={name}
              placeholder="name"
              className="form-control my-3"
              onChange={e => onChange(e)}
            />
           
          <div >
       <select type="text" name="type" value={type} onChange={e => onChange(e)} className="custom-select my-1 mr-sm-2">
       <option  hidden>Mode</option>
        <option value='STD'>Student</option>
        <option value='TEA'>Teacher</option>
        <option value='AD'>Admin</option>
        </select> 
        </div>
        <input
              type="number"
              name="id"
              value={id}
              placeholder="ID"
              className="form-control my-3"
              onChange={e => onChange(e)}
            />

            <button className="btn btn-success btn-block">Submit</button>
            </form>
        </Fragment>
        
    )
}
export default Register;