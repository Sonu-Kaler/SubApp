import { useState } from "react";
import useAuth from "../context/AuthContext"
import {useNavigate,  Link } from "react-router-dom"
const Signup=()=>{
    const {signUp,error,setError,loading} = useAuth();

    const [form,setForm] = useState({name:"",email:"",password:""})
    const navigate = useNavigate();

    const handleChange=(e)=>setForm({...form,[e.target.name]:e.target.value})

    const handleSignup=async(e)=>{
        e.preventDefault();
        setError("");
        const ok = await signUp(form);
        if(ok){
            return navigate("/dashboard")
        }
    }

    return(
        <div className="form-container">
            <div className="form">
                <h1>
                    Create Account
                <p>
                    Signup to get started!
                </p>
                </h1>
            <form onSubmit={handleSignup}>
                <div>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Name" />
                </div>
                <div>  
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Email" />
                </div>
                <div>
                    <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="Password" />
                </div>
                {
                    error && <p>{error}</p>
                }
                <button type="submit" className="auth_btn">
                    {
                        loading ? "Loading..." : "Create Account"
                    }
                </button>
            </form>
            <p>
                Already have an account <Link to={"/signIn"}>Signin</Link>
            </p>
            </div>
        </div>
    )
}

export default Signup;