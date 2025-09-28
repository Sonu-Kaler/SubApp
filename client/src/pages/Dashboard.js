import Navbar from "../components/Navbar";
import useAuth from "../context/AuthContext"

const Dashboard=()=>{
    const {user} = useAuth();
    return(
        <div>
            <Navbar />
            <div className="dashboard">
                <h2>
                    Dashboard
                </h2>
                <p>
                    Welcome {user?.name || user?.email}
                </p>
            </div>
        </div>
    )
}

export default Dashboard;