import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
toast.configure();

function SignUp() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function signUp(e) {
        e.preventDefault();
        console.log("data", data)
        const regex = /([A-Za-z0-9]{6})/;

        if (data.password !== data.confirmPassword) {
            toast("As senhas devem ser iguais");
        } else if (!regex.test(data.password) || !regex.test(data.confirmPassword)){
            toast("A senha deve conter somente letras e números");
        } else {
            try {
                setLoading(true);
                await axios.post(`${process.env.REACT_APP_API_URL}/signup`, data);
                navigate("/signin");
            } catch (error) {
                console.log(error.response);
                toast("Não foi possível cadastrar usuário");
            }
        }
    }

    return (
        <Container>
            <Box>
                <form onSubmit={signUp}>
                    <h1>Criar conta</h1>
                    <input type="text" placeholder="Nome" required value={data.name} onChange={e => setData({...data, name: e.target.value})} />
                    <input type="email" placeholder="Email" required value={data.email} onChange={e => setData({...data, email: e.target.value})} />
                    <input type="password" placeholder="Senha" required value={data.password} onChange={e => setData({...data, password: e.target.value})} />
                    <input type="password" placeholder="Confirme a senha" required value={data.confirmPassword} onChange={e => setData({...data, confirmPassword: e.target.value})} />
                    
                    {!loading ? 
                    <button type="submit">Sign Up</button>
                    :
                    <DivLoading>
                        <ThreeDots color="#FFFFFF" width={50}/>
                    </DivLoading>
                    }

                    <StyledLink to="/signin">Já tem uma conta? Entre agora!</StyledLink>
                </form>
            </Box>
        </Container>
    )

}

export default SignUp;

const Container = styled.div`
    font-family: "Inter",Helvetica,Arial,sans-serif;
    color: #161619;
    padding: 30px;
    margin-top: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 920px) {
        padding: 10%;
    }
`;

const Box = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    h1 {
        margin-top: 15px;
        margin-bottom: 20px;
        font-size: 26px;
        font-weight: 700;
        color: #FF914C;

        @media (min-width: 920px) {
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
        
        :focus {
            outline: none !important;
            border:1px solid #575759;
        }
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

            :focus {
                outline: none !important;
                border:1px solid #575759;
            }
        }

        @media (min-width: 438px) {
            padding: 10%;
        }

        @media (min-width: 920px) {
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