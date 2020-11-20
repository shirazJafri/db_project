import React,{Fragment,useState,useEffect} from 'react';
import {toast} from 'react-toastify';
import { useHistory} from "react-router-dom";
const Dashboard = ({setAuth}) => {
    const[name,setName] = useState("");
    let history = useHistory();
const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:3005/dashboard2/", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  const logout = (e) =>{
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logout Successfully");
  }
    return (
        <Fragment>
            <h1>Dashboard {name}</h1>
            <h6></h6>
            <label></label>
            <button className="btn btn-primary" onClick={(e) => logout(e)}>Logout</button>

        </Fragment>
    );
}
export default Dashboard;  