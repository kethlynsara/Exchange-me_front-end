import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function SignUp() {
    const URL = "http://localhost:5000";
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();

    async function signUp(e) {
        e.preventDefault();
        console.log("data", data)

        try {
            await axios.post(`${URL}/signup`, data);
            navigate("/signin");
        } catch (error) {
            console.log(e.response.data.error)
        }
    }

    return <>
        <form onSubmit={signUp}>
            <input type="text" placeholder="Name" required value={data.name} onChange={e => setData({...data, name: e.target.value})} />
            <input type="email" placeholder="Email" required value={data.email} onChange={e => setData({...data, email: e.target.value})} />
            <input type="password" placeholder="Password" required value={data.password} onChange={e => setData({...data, password: e.target.value})} />
            <input type="password" placeholder="Confirme Password" required value={data.confirmPassword} onChange={e => setData({...data, confirmPassword: e.target.value})} />
            <button type="submit">Sign Up</button>
        </form>
    </>
}

export default SignUp;