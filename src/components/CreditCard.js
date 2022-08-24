import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import styled from "styled-components";


function CreditCard({payment, setPayment}) {
  const [focus, setFocus] = useState("");

  return (
    <>
      <Cards
        number={payment.cardNumber}
        name={payment.name}
        expiry={payment.expirationDate}
        cvc={payment.cvc}
        focused={focus} /> 

      <Form>
          <input
            type={"tel"}
            name="number"
            placeholder="Número do cartão"
            value={payment.cardNumber}
            onChange={e => setPayment({...payment, cardNumber: e.target.value})} 
            onFocus={e => setFocus(e.target.name)}/>

          <input
            type={"text"}
            name="name"
            placeholder="Nome"
            value={payment.name}
            onChange={e => setPayment({...payment, name: e.target.value})} 
            onFocus={e => setFocus(e.target.name)}/>
          
          <input
            type={"tel"}
            name="expiry"
            placeholder="Data de expiração (MM/YY)"
            value={payment.expirationDate}
            onChange={e => setPayment({...payment, expirationDate: e.target.value})} 
            onFocus={e => setFocus(e.target.name)}/>

          <input
            type={"tel"}
            name="cvc"
            placeholder="CVC"
            value={payment.cvc}
            onChange={e => setPayment({...payment, cvc: e.target.value})} 
            onFocus={e => setFocus(e.target.name)}/>          
      </Form>
    </>
  )
}

export default CreditCard;

const Form = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input::placeholder {
        font-size: 15px;
        font-weight: 400;
        color: #06070D;
    }

    input {
        width: 326px;
        height: 40px;
        background: #FFFFFF;
        border: none;
        margin-bottom: 13px;
        padding-left: 15px;
    }
`;
