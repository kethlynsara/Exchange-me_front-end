import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";


function PaymentDetails({payment, setPayment}) {
    const { setConfirmOrderStep } = useContext(UserContext);

    return (
        <Container>
            <p>payment details</p>
            <form>
                <Input type="text" placeholder="Nome" value={payment.name} required
                    onChange={(e) => setPayment({...payment, name: e.target.value})}></Input>
                           
                <Input type="text" placeholder="Número" value={payment.cardNumber} required
                    onChange={(e) => setPayment({...payment, cardNumber: e.target.value})}></Input>

                <Input type="date" placeholder="Data de expiração" value={payment.expirationDate} required
                    onChange={(e) => setPayment({...payment, expirationDate: e.target.value})}></Input>

                <Input type="number" placeholder="CVV" value={payment.cvv} required
                    onChange={(e) => setPayment({...payment, cvv: e.target.value})}></Input>

                <button onClick={() => {
                    setConfirmOrderStep(3)
                }}>review order</button>
            </form>
        </Container>
    )
}

export default PaymentDetails;


const Input = styled.input`
    width: 326px;
    height: 58px;
    background: #FFFFFF;
    border: 1px solid #06070D;
    border-radius: 5px;
    margin-bottom: 13px;
    padding-left: 15px;
`;


const Button = styled.div`
    width: 100%;
    height: 46px;
    border-radius: 5px;
    border: none;  
    padding-top: 11px;
    margin-bottom: 36px;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #ffffff;
    background-color: #06070D;
    
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 159px 25px 192px 25px; 
    font-family: 'Raleway', sans-serif;
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    input::placeholder {
        font-size: 20px;
        line-height: 23px;
        font-weight: 400;
        color: #06070D;
    }
`;