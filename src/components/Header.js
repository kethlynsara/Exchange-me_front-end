import styled from "styled-components";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import Menu from "./Menu";
import logo from "../assets/img/logo.svg"

function Header() {
    const navigate = useNavigate();
    return (
        <NavBar>
            <Menu />  
            <img src={logo} onClick={() => navigate("/")} />
            <div>
                <BsHandbag className="cart" />
                <AiOutlineUser />                  
            </div>
        </NavBar>
    )
}

export default Header;

const NavBar = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFF;
    width: 100%;
    padding: 15px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 100;

    font-family: "Inter",Helvetica,Arial,sans-serif;
    color: #161619;
    
    
    div {
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-right: 20px;

        svg {
            width: 22px;
            height: 22px;        
            cursor: pointer;
        }

        .cart {
            width: 19px;
            height: 19px;   
        }

    }

    h1 {
        font-size: 20px;
        font-weight: 700;
    }

    img {
        width: 200px;
        cursor: pointer;
    }
`;