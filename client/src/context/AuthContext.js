import { createContext, useContext, useMemo, useState } from "react";
import API from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider=({children})=>{
    // now here what user, token, error, loading
    // signUp - signIn - signOut - sb hoga 
    const [user,setUser] = useState(()=>{
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null
    })
    const [token,setToken] = useState(()=>{
        return localStorage.getItem("token") || null
    })
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");


    const signUp=async(payload)=>{
        setLoading(false);
        setError("");
        try{
            const res = await API.post("/auth/signUp",payload);
            const {token,user} = res.data.data;
            localStorage.setItem("token",token);
            localStorage.setItem("user",JSON.stringify(user));
            setToken(token); setUser(user);
            return true
        }
        catch(e){
            console.error("Failed to signup",e.response?.data || e.message);
            setError(e.response?.data?.error || "Signup Error");
            return false
        }
        finally{setLoading(false)}
    }

    const signIn=async(payload)=>{
        setLoading(false);
        setError("");
        try{
            const res = await API.post("/auth/signIn",payload);
            const {token,user} = res.data.data;
            localStorage.setItem("token",token);
            localStorage.setItem("user",JSON.stringify(user));
            setToken(token); setUser(user);
            return true
        }
        catch(e){
            console.error("Failed to signin",e.response?.data || e.message);
            setError(e.response?.data?.error || "Signin Error");
            return false
        }
        finally{setLoading(false)}
    }

    const signOut=async()=>{
        try{
            await API.post("/auth/signOut").catch(()=>{})
        }
        finally{
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setToken(null); setUser(null);
            setError("")
            console.log("User Signed Out")
        }
    }

    const value = useMemo(()=>({
        user,setUser,
        token,setToken,
        error,setError,
        loading,setLoading,
        signUp,signIn,signOut
    }),[token,user,loading,error])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


const useAuth=()=>useContext(AuthContext);

export default useAuth;