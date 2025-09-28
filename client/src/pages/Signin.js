import { useState } from "react";
import useAuth from "../context/AuthContext"
import {useNavigate, Link } from "react-router-dom"

const Signin=()=>{
    const {signIn,error,setError,loading} = useAuth();

    const [form,setForm] = useState({email:"",password:""})
    const navigate = useNavigate();

    const handleChange=(e)=>setForm({...form,[e.target.name]:e.target.value})

    const handleSignin=async(e)=>{
        e.preventDefault();
        setError("");
        const ok = await signIn(form);
        if(ok){
            return navigate("/dashboard")
        }
    }

    return(
        <div className="form-container">
            <div className="form">
                <h1>
                    Welcome back
                <p>
                    Enter your credential to continue
                </p>
                </h1>
            <form onSubmit={handleSignin}>
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
                        loading ? "Loading..." : "Signin"
                    }
                </button>
            </form>
            <p>
                Not have an account <Link to={"/signUp"}>Create one</Link>
            </p>
            </div>
        </div>
    )
}

export default Signin;