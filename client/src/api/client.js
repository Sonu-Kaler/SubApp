import axios from "axios"
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5500/api/v1",
    headers:{"Content-Type":"application/json"}
})

API.interceptors.request.use((req)=>{
    const token = localStorage.getItem("token")
    if(token){
        req.headers.Authorization=`Bearer ${token}`
    }
    return req 
})

API.interceptors.response.use(
    (res)=>res,
    (err)=>{
        if(err.response && err.response.status===401){
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            if(window.location.pathname!=="/signIn"){
                window.location.href="/signIn"
            }
        }
        return Promise.reject(err)
    }
)

export default API;
