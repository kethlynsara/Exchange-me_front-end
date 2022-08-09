import { useContext, useState } from "react";

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

    if (confirmOrderStep === 1) {
        return <AddressForm inputs={address} setInputs={setAddress}/>
    } else if (confirmOrderStep === 2) {
        return <PaymentDetails />
    } else if (confirmOrderStep === 3) {
        return <ReviewOrder />
    } else {
        return <p>Não foi possível carregar as informações</p>
    }
}

export default Checkout;