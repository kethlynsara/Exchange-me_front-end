import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function SignIn() {
    const URL = "http://localhost:5000";
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();
        console.log("data", data)

        try {
            const {data: userInfo} = await axios.post(`${URL}/signin`, data);
            console.log(userInfo);
            const serializedData = JSON.stringify(userInfo);
            localStorage.setItem("userInfo", serializedData);
            navigate("/");
        } catch (error) {
            console.log(e.response.data.error)
        }
    }

    return <>
        <form onSubmit={login}>
            <input type="email" placeholder="Email" required value={data.email} onChange={e => setData({...data, email: e.target.value})} />
            <input type="password" placeholder="Password" required value={data.password} onChange={e => setData({...data, password: e.target.value})} />
            <button type="submit">Sign In</button>
        </form>
    </>
}

export default SignIn;