import { useContext, useState } from "react";
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
`;

const Box = styled.div`
    width: 100%;
    background-color: #F3F3F3;
    position: relative;
`;