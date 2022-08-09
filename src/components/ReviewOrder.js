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
                number: address.num,
                district: address.bairro,
                city: address.cidade,
                uf: address.uf
            },
            payment
        }
        try {
            console.log(order);
            await axios.post(`${process.env.REACT_APP_API_URL}/order`, order, config);
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <>
            <p>review order</p>
            {books.length > 0 ?
            books.map((element, index) => {
                total = total + parseFloat(element.book.price);
                return <CartElement element={element.book} key={index}/>
            })
            :
            <p>Loading</p>}
            <div>payment: 
                {payment.name}
                {payment.cardNumber}
                {payment.cvv}
                {payment.expirationDate}
            </div>
            <div>address: 
                {address.nome}
                {address.email}
                {address.telefone}
                {address.bairro}
                {address.num}
                {address.cep}
                {address.cidade}
                {address.uf}
            </div>
            <p>total: R$ {total}</p>
            <button onClick={placeOrder}>place order</button>
        </>
    )
}

export default ReviewOrder;