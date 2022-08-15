import styled from "styled-components";
import { BsHandbag, BsBookHalf } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdOutlineMenuBook } from "react-icons/md";

import Menu from "./Menu";
import logo from "../assets/img/logo2.svg"

function Header() {
    const navigate = useNavigate();
    const userData = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userData);
    let token = "";
    if (userInfo !== null) {
        token = userInfo.token;
    }
    return (
        <NavBar>
            <Menu className="menu"/>   
            <Logo>
                <img src={logo} onClick={() => navigate("/")} />             
            </Logo>               
            <Cart>
                <BsHandbag className="cart" onClick={() => {
                    console.log('tokennn', token)
                    if (token === "") navigate("/signin"); else navigate("/cart"); 
                }}/>
                {/* <AiOutlineUser />   */}
            </Cart>
        </NavBar>
    )
}

export default Header;

const NavBar = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFF;
    padding: 15px;
    padding-left: 45px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 100;

    font-family: "Inter",Helvetica,Arial,sans-serif;
    color: #161619;

    /* display: flex;
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
    color: #161619; */
    
    
    /* div {
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

    } */

    /* h1 {
        font-size: 20px;
        font-weight: 700;
    }

    img {
        width: 200px;
        cursor: pointer;
    } */
`;

const Cart = styled.div` 
    /* width: 80px;
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
    } */

    .cart {
        width: 19px;
        height: 19px;   
        cursor: pointer;
    }

`;

const Logo = styled.div`   
    display: flex;
    justify-content: space-between;
    width: 80px;
    height: 35px;
    margin-right: 67px;
    margin-top: 3px;

    :hover {
        cursor: pointer;
    }


    /* svg {
        height: 50px;
    } */
    
    /* svg {
        color: #FF914C;
        width: -100px;
    } */
`;