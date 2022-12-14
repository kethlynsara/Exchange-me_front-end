import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from "react-toastify";

import CartElement from "../../components/CartElement";
import UserContext from "../../contexts/UserContext";

toast.configure();


function Cart() {
    const [books, setBooks] = useState([]);
    const { setConfirmOrderStep } = useContext(UserContext);
    const navigate = useNavigate();
    let total = 0;
    const userData = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userData);
    const { token } = userInfo;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      } 
    }

    useEffect(() => {
        async function getUserCart() {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/cart`, config);
                setBooks([...data]);
            } catch (error) {
                console.log(error.response);
                toast("Não foi possível buscar o carrinho");
            }
        }
        getUserCart();
    }, []);

    return (
        <Container>
            {books.length > 0 ?
            books.map((element, index) => {
                total = total + parseFloat(element.book.price)
                console.log('tot', total)
                return <CartElement element={element.book} key={index}/>
            })
            :
            <NoBooks>Sem livros no carrinho...</NoBooks>}

            <Checkout>
                <Price>
                    <p className="total">Total </p>
                    <p className="price">R$ {total.toFixed(2)}</p>
                </Price>
                <button onClick={() => {
                    setConfirmOrderStep(1);
                    navigate("/checkout");
                }}>Checkout</button>
            </Checkout>
        </Container>
    )
}

export default Cart;

const Container = styled.div`
    padding: 30px;
    margin-top: 100px;
    margin-bottom: 200px;
    font-family: "Inter",Helvetica,Arial,sans-serif;
    color: #161619;

    display: flex;
    flex-direction: column;
    
    overflow-x: hidden;
    overflow-y: hidden;

    @media (min-width: 498px) {
        padding: 10%;
    }

    @media (min-width: 498px) {
        padding: 15%;
        margin-top: 80px;
    }

    @media (min-width: 952px) {
        padding: 20%;
        margin-top: 0;
    }
`;

const Checkout = styled.div`
    width: 100%;
    height: 100px;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F8F8F8;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    padding: 0 25px;

    button {
        margin-right: 50px;
        border: none;
        border-radius: 22px;
        background-color: #FF914C;
        color: #FFFFFF;
        font-weight: 600;
        font-size: 18px;
        width: 140px;
        height: 45px;
        text-align: center;

        :hover {
            cursor: pointer;
        }
    }
`;

const Price = styled.div`
    .total {
        font-size: 11px;
    }

    .price {
        font-weight: 500;
        margin-top: 3px;
    }
`;

const NoBooks = styled.p`
    text-align: center;
    opacity: 0.5;
    margin-top: 200px;
`;