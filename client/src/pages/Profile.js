import { useEffect, useState } from "react";
import useAuth from "../context/AuthContext"
import { deleteUser, getUser, updateUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile=()=>{
    const {user,setUser,setToken} = useAuth();

    const [profile,setProfile] = useState(null);
    const [form,setForm] = useState({name:"",email:""})
    const [isEdit,setEdit] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                if(!user?._id){
                    return
                }
                const res = await getUser(user._id);
                const data = res.data.data
               
                    setProfile(data);
                    setForm({name:data.name, email:data.email})
               
            }
            catch(e){
                    console.error("Error while fetching user",e);
                    if(e.response){
                        console.error("Server Response", e.response.status, e.response.data)
                    }
                
            }
        }
        fetchUser();
    },[user])

    const handleChange=(e)=>setForm({...form,[e.target.name]:e.target.value})

    const handleUpdate=async(e)=>{
        e.preventDefault();
        try{
            await updateUser(user._id,form);
            setProfile({...profile,...form});
            setEdit(false);
        }
        catch(e){
            console.error("Error while making an update",e)
        }
    }

    const handleDelete=async()=>{
        try{
            await deleteUser(user._id);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setToken(null); setUser(null);
            navigate("/signIn");
        }
        catch(e){
            console.error("Error while deleting user",e)
        }
    }

    if(!profile) return <p>Loading....</p>

    return(
        <div>
            <Navbar />
            <div className="profile-container">
            {
                !isEdit ?
                (
                    <div className="profile-detail-container profile-box">
                        <h2>
                            Profile Details
                        </h2>
                        <div>
                            <p>
                                Name : {profile.name}
                            </p>
                            <p>
                                Email : {profile.email}
                            </p>
                            <p>
                                User ID : {profile._id}
                            </p>
                        </div>
                        <div>
                            <button onClick={()=>setEdit(true)} className="profile-btn">
                                Edit
                            </button>
                            <button onClick={handleDelete} className="profile-btn">
                                Delete 
                            </button>
                        </div>
                    </div>
                )
                :
                (
                    <div className="profile-form-container">
                        <form onSubmit={handleUpdate} className="form-box">
                            <h2>
                                Update Details
                            </h2>
                            <div className="profile-inputs">
                                <input type="name" name="name" value={form.name} onChange={handleChange} required />
                                <input type="email" name="email" value={form.email} onChange={handleChange} required />
                            </div>
                            <div>
                                <button type="submit" className="profile-btn">
                                    Update 
                                </button>
                                <button onClick={()=>setEdit(false)} className="profile-btn">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
            </div>
        </div>
    )

}

export default Profile;