import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

import CartElement from "./CartElement";


function ReviewOrder({payment, address}) {
    const [books, setBooks] = useState([]);
    let total = 0;
    let order = {};
    const userData = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userData);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
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

    async function placeOrder() {
        order = {
            user: {
                name: address.nome,
                email: address.email,
                phone: address.telefone
            },
            order: books,
            total,
            address: {
                cep: address.cep,
                street: address.rua,
                number: parseInt(address.num),
                district: address.bairro,
                city: address.cidade,
                uf: address.uf
            },
            payment: {
                userId: userInfo.userId,
                name: payment.name,
                number: payment.cardNumber,
                cvv: parseInt(payment.cvv),
                expirationDate: payment.expirationDate   
            }
        }
        try {
            console.log(order);
            await axios.post(`${process.env.REACT_APP_API_URL}/order`, order, config);
        } catch (error) {
            console.log(error.response)
            alert("Não foi possível efetuar a compra");
        }
    }
    
    return (
        <Container>
            <OrderSumary>
                    <p>Livros</p>
                    {books.length > 0 ?
                    books.map((element, index) => {
                        total = total + parseFloat(element.book.price);
                        return <Product>
                                    <div>
                                        <p>Livro {index + 1}</p>
                                        <p>{element.book.title}</p>
                                    </div>
                                    <p>R$ {element.book.price}</p>
                               </Product> 
                    })
                    :
                    <p>Loading</p>}
                    <p>total: R$ {total}</p>
            </OrderSumary>            

            <Shipping>payment: 
                {address.nome}
                {address.email}
                {address.telefone}
                {address.bairro}
                {address.num}
                {address.cep}
                {address.cidade}
                {address.uf}
            </Shipping>

            <PaymentDetails>address: 
                {payment.name}
                {payment.cardNumber}
                {payment.cvv}
                {payment.expirationDate}
            </PaymentDetails>

            <button onClick={placeOrder}>place order</button>
        </Container>
    )
}

export default ReviewOrder;

const Container = styled.div`

`;

const OrderSumary = styled.div`

`;

const Product = styled.div`
    display: flex;
    margin-top: 25px;
`;

const Shipping = styled.div`

`;

const PaymentDetails = styled.div`

`;