import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaRegCheckCircle } from 'react-icons/fa';

function Success() {
    return (
        <Container>
            <FaRegCheckCircle className="check-icon" />
            <h6>Compra realizada com sucesso!</h6>
            <p>O pedido será entregue em até 30 dias. </p>
            <Link to='/'><button>Voltar</button></Link>
        </Container>
    )
}

export default Success;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Inter', sans-serif;
    margin: 150px 25px 0 25px;
    h6 {
        font-weight: 400;
        font-size: 24px;
        line-height: 30px;
        color: #222222;
        margin-top: 44.86px;
    }
    p {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #868686;
        margin-top: 45.91px;
        margin-bottom: 99.63px;
        text-align: center;
    }
    .check-icon {
        width: 88.83px;
        height: 124.6px;
        color: #3cab30
    }
    button {
        width: 140px;
        height: 30px;
        background: #FF914C;
        border-radius: 50px;
        border: none;
        color: #fff;
        cursor: pointer;
        font-weight: 600;
    }
`;