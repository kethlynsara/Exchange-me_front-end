import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
toast.configure();


function SignIn() {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();

        try {
            setLoading(true);
            const {data: userInfo} = await axios.post(`${process.env.REACT_APP_API_URL}/signin`, data);
            console.log(userInfo);
            const serializedData = JSON.stringify(userInfo);
            localStorage.setItem("userInfo", serializedData);
            navigate("/");
        } catch (error) {
            console.log(error.response)
            toast("Dados inválidos! Tente novamente.");
        }
    }

    return (
        <Container>
            <Box>
                <form onSubmit={login}>
                    <h1>Login</h1>
                    <input type="email" placeholder="Email" required value={data.email} onChange={e => setData({...data, email: e.target.value})} />
                    <input type="password" placeholder="Senha" required value={data.password} onChange={e => setData({...data, password: e.target.value})} />                  

                    {!loading ? 
                    <button type="submit">Sign In</button>
                    :
                    <DivLoading>
                        <ThreeDots color="#FFFFFF" width={50}/>
                    </DivLoading>
                    }

                    
                    <StyledLink to="/signup">Primeira vez? Cadastre-se!</StyledLink>

                </form>
            </Box>
        </Container>
    )
}

export default SignIn;

const Container = styled.div`
    font-family: "Inter",Helvetica,Arial,sans-serif;
    color: #161619;
    padding: 30px;
    margin-top: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 1172px) {
        padding: 10%;
    }
`;

const Box = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    h1 {
        margin-top: 15px;
        margin-bottom: 30px;
        font-size: 26px;
        font-weight: 700;
        color: #FF914C;

        @media (min-width: 1172px) {
            margin-top: -40px;
        }
    }

    input {
        width: 99%;
        height: 40px;
        background: #FFFFFF;
        border: none;
        margin-bottom: 13px; 
        padding-left: 10px;
    }

    form {
        background-color: #F3F3F3;
        padding: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        button {
            background-color: #FF914C;
            border: none;
            width: 100%;
            height: 40px;
            color: #FFFFFF;
            margin-bottom: 20px;
            margin-top: 15px;
            font-weight: 600;
            font-size: 17px;

            :hover {
                cursor: pointer;
            }
        }

        @media (min-width: 438px) {
            padding: 10%;
        }

        @media (min-width: 1172px) {
            padding: 20%;
        }

    }

    @media (min-width: 438px) {
        width: 90%;
    }
`;

const DivLoading = styled.div`
    background-color: #FF914C;
    border: none;
    width: 100%;
    height: 40px;
    color: #FFFFFF;
    margin-bottom: 20px;
    margin-top: 15px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    text-align: center;
    font-size: 14px;
    color: #929292;
    margin-bottom: 20px;
`;