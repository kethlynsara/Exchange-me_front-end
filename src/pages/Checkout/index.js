import { useContext, useState } from "react";
import { FaRegCheckCircle } from 'react-icons/fa';
import styled from "styled-components";

import AddressForm from "../../components/AddressForm";
import PaymentDetails from "../../components/PaymentDetails";
import ReviewOrder from "../../components/ReviewOrder";
import UserContext from "../../contexts/UserContext";

function Checkout() {
    const { confirmOrderStep } = useContext(UserContext);
    const [address, setAddress] = useState({
        nome: '',
        email: '',
        telefone: '',
        cep: '',
        rua: '',
        num: '',
        bairro: '',
        cidade: '',
        uf: ''
    });
    const [payment, setPayment] = useState({
        name: "",
        cardNumber: "",
        expirationDate: "",
        cvv: ""
    })
    
    function checkout() {
        if (confirmOrderStep === 1) {
            return <AddressForm inputs={address} setInputs={setAddress}/>
        } else if (confirmOrderStep === 2) {
            return <PaymentDetails payment={payment} setPayment={setPayment} />
        } else if (confirmOrderStep === 3) {
            return <ReviewOrder payment={payment} address={address} />
        } else {
            return <p>Não foi possível carregar as informações</p>
        }        
    }

    return (
        <Container>
            <Box>
                <h1>Checkout</h1>
                <Steps>
                    <Shipping>
                        <FaRegCheckCircle color={confirmOrderStep === 1 ? "#FF914C" : "#161619"} opacity={confirmOrderStep === 1 ? 1 : 0.7}/>
                        <P opacity={confirmOrderStep === 1 ? 1 : 0.7}>Entrega</P>
                    </Shipping>
                    <Payment>
                        <FaRegCheckCircle color={confirmOrderStep === 2 ? "#FF914C" : "#161619"} opacity={confirmOrderStep === 2 ? 1 : 0.7} />
                        <P opacity={confirmOrderStep === 2 ? 1 : 0.7} >Pagamento</P>
                    </Payment>
                    <Review>
                        <FaRegCheckCircle color={confirmOrderStep === 3 ? "#FF914C" : "#161619"} opacity={confirmOrderStep === 3 ? 1 : 0.7} />
                        <P opacity={confirmOrderStep === 3 ? 1 : 0.7}>Confirmação</P>
                    </Review>
                </Steps>
                {checkout()}
            </Box>
        </Container>
    )
}

export default Checkout;

const Container = styled.div`
    margin-top: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
    font-family: "Inter",Helvetica,Arial,sans-serif;
    color: #161619;

    @media (min-width: 560px) {
        padding: 10%;
    }

    @media (min-width: 780px) {
        padding: 15%;
        margin-top: 0;
    }

    @media (min-width: 1020px) {
        padding: 20%;
        margin-top: 0
    }
`;

const Box = styled.div`
    width: 100%;
    background-color: #F3F3F3;
    position: relative;
    text-align: center;
    
    h1 {
        font-size: 23px;
        font-weight: 700;
        margin-top: 30px;
        color: #FF914C;
    }
`;

const Steps = styled.div`
    display: flex;
    justify-content: space-around;
    font-size: 13px;
    font-weight: 500;
    margin-top: 35px;
    margin-left: 15px;
    margin-right: 15px;

    @media (min-width: 570px) {
        margin-left: 10%;
        margin-right: 10%;
    }

    @media (min-width: 570px) {
        margin-left: 15%;
        margin-right: 15%;
    }

    @media (min-width: 810px) {
        margin-left: 20%;
        margin-right: 20%;
    }

    @media (min-width: 970px) {
        margin-left: 22%;
        margin-right: 22%;
    }

    @media (min-width: 1186px) {
        margin-left: 24%;
        margin-right: 24%;
    }
`;

const Shipping = styled.div`
    display: flex;

    svg {
        color: ${(props) => props.color};
        opacity: ${(props) => props.opacity};
    }
`;

const Payment = styled.div`
    display: flex;

    svg {
        color: ${(props) => props.color};
        opacity: ${(props) => props.opacity};
    }
`;

const Review = styled.div`
    display: flex;

    svg {
        color: ${(props) => props.color};
        opacity: ${(props) => props.opacity};
    }
`;

const P = styled.p`
    margin-left: 5px;
    font-weight: 600;
    opacity: ${(props) => props.opacity};
`;

