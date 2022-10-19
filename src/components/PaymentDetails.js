import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { HiOutlineChevronDoubleRight, HiOutlineChevronDoubleLeft } from "react-icons/hi";
import CreditCard from "./CreditCard";

function PaymentDetails({payment, setPayment}) {
    const { setConfirmOrderStep } = useContext(UserContext);

    return (
        <Container>
            <CreditCard payment={payment} setPayment={setPayment}/>
            <Icons>
                <BackIcon onClick={() => setConfirmOrderStep(1)}>
                    <HiOutlineChevronDoubleLeft />
                </BackIcon>
                <NextIcon onClick={() => setConfirmOrderStep(3)}>
                    <HiOutlineChevronDoubleRight />
                </NextIcon>
            </Icons>
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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 40px 25px 120px 25px; 
    font-family: "Inter",Helvetica,Arial,sans-serif;

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

    input:focus {
        outline: none !important;
        border:1px solid #575759;
    }
`;

const NextIcon = styled.div`
    width: 60px;
    height: 30px;
    background-color: #FF914C;
    padding-top: 11px;
    text-align: center;

    svg {
        color: #FFFFFF;
        stroke-width: 10;
        width: 20px;
        height: 20px;        
    }

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: none !important;
        border:1px solid #575759;
    }
`;

const BackIcon = styled.div`
    width: 60px;
    height: 30px;
    background-color: #FF914C;
    padding-top: 11px;
    text-align: center;
    margin-right: 10px;
 

    svg {
        color: #FFFFFF;
        stroke-width: 10;
        width: 20px;
        height: 20px;        
    }

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: none !important;
        border:1px solid #575759;
    }
`;

const Icons = styled.div`
    display: flex;
    position: absolute;
    right: 15px;
    bottom: 40px;
`;