import { useContext } from "react";
import UserContext from "../contexts/UserContext";

function PaymentDetails() {
    const { setConfirmOrderStep } = useContext(UserContext);

    return (
        <>
            <p>payment details</p>
            <button onClick={() => {
                setConfirmOrderStep(3)
            }}>review order</button>
        </>
    )
}

export default PaymentDetails;