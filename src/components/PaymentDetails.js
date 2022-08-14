import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

function PaymentDetails({payment, setPayment}) {
    const { setConfirmOrderStep } = useContext(UserContext);

    return (
        <Container>
            <form>
                <Input type="text" placeholder="Nome" value={payment.name} required
                    onChange={(e) => setPayment({...payment, name: e.target.value})}></Input>
                           
                <Input type="text" placeholder="Número" value={payment.cardNumber} required
                    onChange={(e) => setPayment({...payment, cardNumber: e.target.value})}></Input>

                <Input type="date" placeholder="Data de expiração" value={payment.expirationDate} required
                    onChange={(e) => setPayment({...payment, expirationDate: e.target.value})}></Input>

                <Input type="number" placeholder="CVV" value={payment.cvv} required
                    onChange={(e) => setPayment({...payment, cvv: e.target.value})}></Input>

                <NextIcon onClick={() => setConfirmOrderStep(3)}>
                    <HiOutlineChevronDoubleRight />
                </NextIcon>
{/* 
                <button onClick={() => {
                    setConfirmOrderStep(3)
                }}>review order</button> */}
            </form>
        </Container>
    )
}

export default PaymentDetails;


const Input = styled.input`
    width: 326px;
    height: 40px;
    background: #FFFFFF;
    border: none;
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
    margin: 120px 25px 120px 25px; 
    font-family: 'Raleway', sans-serif;

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input::placeholder {
        font-size: 15px;
        font-weight: 400;
        color: #06070D;
    }
`;

const NextIcon = styled.div`
    width: 60px;
    height: 30px;
    background-color: #131319;
    padding-top: 11px;
    text-align: center;
    position: absolute;
    right: 15px;
    bottom: 40px;

    svg {
        color: #FFFFFF;
        stroke-width: 10;
        width: 20px;
        height: 20px;        
    }

    &:hover {
        cursor: pointer;
        background-color: #929292;
    }
`;