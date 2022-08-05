import styled from "styled-components";
import { Link } from "react-router-dom";

function Exchange() {
    return (
        <Link to="/exchanges/register">
            <Button>Register Book</Button>
        </Link>
    )
}

export default Exchange;

const Button = styled.button`
    border: none;
    border-radius: 2px;
    color: white;
    background-color: salmon;
    margin: 15px 0 0 15px;
    
    &:hover {
        cursor: pointer;
    }
`;