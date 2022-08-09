import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import CartElement from "../../components/CartElement";
import UserContext from "../../contexts/UserContext";

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
            }
        }
        getUserCart();
    }, []);

    //console.log(total, books)
    return (
        <Container>
            {books.length > 0 ?
            books.map((element, index) => {
                total = total + parseFloat(element.book.price)
                console.log('tot', total)
                return <CartElement element={element.book} key={index}/>
            })
            :
            <p>Loading</p>}

            <Checkout>
                <p>Total: R$ {total.toFixed(2)}</p>
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

`;

const Checkout = styled.div`
    display: flex;
    justify-content: space-between;

    button {
        cursor: pointer;
    }
`;