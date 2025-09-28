import { useNavigate } from "react-router-dom";
import useAuth from "../context/AuthContext"
import { useEffect, useState } from "react";
import { createSub, deleteSub, getUserSubs, updateSub } from "../api/subApi";
import Navbar from "../components/Navbar";


const CURRENCIES = ["USD","EUR","INR"];
const FREQUENCIES = ["daily","weekly","monthly","yearly"]
const CATEGORIES= ["entertainment","news","sports","technology","politics","other"]
const PAYMENT_METHOD = ["Credit Card","Debit Card","UPI"]
const Subscription=()=>{
    const {user} = useAuth();
    const navigate = useNavigate();

    const [subscriptions,setSubscriptions] = useState([])
    const [currSub,setCurrSub] = useState(null);
    const [isOpen,setOpen] = useState(false);
    const [form,setForm]= useState({
        name:"",
        price:"",
        currency:"USD",
        frequency:"monthly",
        category:"entertainment",
        paymentMethod:"Credit Card",
        startDate:new Date().toISOString().split("T")[0]
    })
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    useEffect(()=>{
        if(!user){
            return navigate("/signIn")
        }
    },[user,navigate])

    useEffect(()=>{
        const fetchSubs=async()=>{
            if(!user?._id) return;
            try{
                setLoading(true)
                const res = await getUserSubs(user._id);
                setSubscriptions(res.data.data);
            }
            catch(e){
                console.error("Failed to fetch user subs",e);
                setError("Failed to fetch user subs")
            }
            finally{setLoading(false)}
        }
        fetchSubs();
    },[user])

    const handleChange=(e)=>setForm((prev)=>({...prev,[e.target.name]:e.target.value}))

    const resetForm=()=>{
        setForm({
        name:"",
        price:"",
        currency:"USD",
        frequency:"monthly",
        category:"entertainment",
        paymentMethod:"Credit Card",
        startDate:new Date().toISOString().split("T")[0]
        })
        setCurrSub(null);
        setOpen(false);
        setError("")
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");
        try{
            if(currSub){
                const res = await updateSub(currSub._id,form);
                setSubscriptions((subs)=>
                    subs.map((sub)=>
                        sub._id===currSub._id ? res.data.data : sub 
                    )
                )
            }
            else{
                const res = await createSub({...form,user:user._id})
                setSubscriptions((subs)=>[...subs,res.data.data])
            }
            resetForm();
        }
        catch(e){
            console.error("Subscription Operation Failed",e);
            setError(e.response?.data?.message || "an error occured")
        }
        finally{setLoading(false)}
    }

    const handleEdit=(sub)=>{
        setCurrSub(sub);
        setForm({
            name:sub.name,
            price:sub.price.toString(),
            currency:sub.currency,
            frequency:sub.frequency,
            category:sub.category,
            paymentMethod:sub.paymentMethod,
            startDate:new Date(sub.startDate).toISOString().split("T")[0]
        })
        setOpen(true)
    }

    const handleDelete=async(subId)=>{
        if(!window.confirm("Do you really want to delete this sub")){
            return
        }
        try{
            await deleteSub(subId);
            setSubscriptions((subs)=>subs.filter(sub=>sub._id!==subId))
        }
        catch(e){
            console.error("Error while deleting sub");
        }
    }

    const formatDate=(dateString)=>{
        return new Date(dateString).toLocaleDateString()
    }

    return(
        <div>
            <Navbar />
            <div className="subscription">

            {
                !isOpen ?
                (
                    <div>
                        <div className="subscription-top">
                        <h1>
                            All Subscriptions
                        </h1>
                        <button onClick={()=>setOpen(true)} className="add-new">
                            Add New 
                        </button>
                        </div>
                        {
                            loading ? (<p>Loading...</p>)
                            :
                            (
                                <div>
                                {
                                    subscriptions.length===0?(<p>No Subscriptions Found</p>)
                                    :
                                    (
                                        <div className="subscription-container">
                                            {
                                                subscriptions.map((sub)=>(
                                                    <div className="subscription_data">
                                                        <p>
                                                            Name : {sub.name}
                                                        </p>
                                                        <p>
                                                            Price : {sub.price}
                                                        </p>
                                                        <p>
                                                            Currency : {sub.currency}
                                                        </p>
                                                        <p>
                                                            Frequency : {sub.frequency}
                                                        </p>
                                                        <p>
                                                            Category : {sub.category}
                                                        </p>
                                                        <p>
                                                            Status : {sub.status}
                                                        </p>
                                                        <p>
                                                            Payment Method : {sub.paymentMethod}
                                                        </p>
                                                        <p>
                                                            Start Date : {formatDate(sub.startDate)}
                                                        </p>
                                                        <p>
                                                            Renewal Date : {formatDate(sub.renewalDate)}
                                                        </p>
                                                        <div>
                                                            <button onClick={()=>handleEdit(sub)} className="subscription-btn">
                                                                Edit 
                                                            </button>
                                                            <button onClick={()=>handleDelete(sub._id)} className="subscription-btn">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )    
                                }
                                </div>
                            )
                        }
                    </div>
                )
                :
                (
                    <div className="subscription-form-container">
                        <h1>
                            {
                                currSub ? "Update Subscription" : "Create Subscription"
                            }
                        </h1>
                        <form onSubmit={handleSubmit} className="subscription-form">
                            <div>
                                <input type="text" name="name" value={form.name} onChange={handleChange} required/>
                            </div>
                            <div>
                                <input type="number" name="price" value={form.price} onChange={handleChange} required/>
                            </div>
                            <div className="sub-select">
                                <select name="currency" value={form.currency} onChange={handleChange}>
                                    {
                                        CURRENCIES.map((curr)=><option key={curr} value={curr}>{curr}</option>)
                                    }
                                </select>
                            </div>
                            <div className="sub-select">
                                <select name="category" value={form.category} onChange={handleChange}>
                                    {
                                        CATEGORIES.map((cate)=><option key={cate} value={cate}>{cate}</option>)
                                    }
                                </select>
                            </div>
                            <div className="sub-select">
                                <select name="frequency" value={form.frequency} onChange={handleChange}>
                                    {
                                        FREQUENCIES.map((fq)=><option key={fq} value={fq}>{fq}</option>)
                                    }
                                </select>
                            </div>
                            <div className="sub-select">
                                <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                                    {
                                        PAYMENT_METHOD.map((py)=><option key={py} value={py}>{py}</option>)
                                    }
                                </select>
                            </div>
                            {
                                error && <p>{error}</p>
                            }
                            <div className="sub-form-btn">
                                <button type="submit" disabled={loading} className="sub-update-btn">
                                    {
                                        loading ? "Processing...." : (currSub ? "Update" : "Create")
                                    }
                                </button>
                                <button onClick={resetForm} className="sub-update-btn">
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

export default Subscription;