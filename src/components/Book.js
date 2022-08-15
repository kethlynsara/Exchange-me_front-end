import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";

function Book({element}) {
    console.log('el', element)
    const userData = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userData);
    // const { token, userId } = userInfo;
    let token = "";
    let userId;
    if (userInfo !== null) {
        token = userInfo.token;
        userId = userInfo.userId;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      } 
    }
    const navigate = useNavigate();

    async function addBookToCart(element) {
        const cartInfo = {
            userId,
            bookId: element.id,
            active: true
        }
        try {
            axios.post(`${process.env.REACT_APP_API_URL}/cart`, cartInfo, config);
            navigate("/cart")
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <Container>
                <BookElement>
                    <StyledLink to={"/books/" + element.id}>
                        <Cover src={element.image} />
                    </StyledLink>  
                    <BookInfo>
                        <Status color={element.conservationState === "used" ? "#7e0b7d" : "#29de02"} >{element.conservationState === "used" ? "USADO" : "NOVO"}</Status>
                        <p className="title">{element.title}</p>
                        <p className="author">{element.author}</p>
                        <p className="price">R$ {parseFloat(element.price).toFixed(2)} <span>R$ {(parseFloat(element.price) + 10.90).toFixed(2)}</span></p>
                        <Buttons>
                            <div className="cart">
                                {userId !== element.userId ? <BsHandbag onClick={() => {
                                    if (token.length === 0) navigate("/signin"); else addBookToCart(element); 
                                }}/> : ""}
                            </div>
                            <div className="heart">
                                <IoIosHeartEmpty />
                            </div>
                        </Buttons>
                        <Sale>
                            <p>SALE</p>
                        </Sale>
                    </BookInfo>
                </BookElement>              
        </Container>
    )
}

export default Book;

const Container = styled.div`
    font-family: "Inter",Helvetica,Arial,sans-serif;
    color: #161619;
    display: inline-block;
    margin-bottom: 10px;
`;

const Cover = styled.img`
    width: 115px;
    height: 165px;
    margin: auto;
    margin-top: 15px;
`;

const BookElement = styled.div`
    height: 380px;
    width: 375px;
    border: 1px;
    border-style: solid;
    border-color: #F1F1F1;
    
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    margin-right: 15px;

    button {
        :hover {
            cursor: pointer;
        }
    }
`;

const Status = styled.p`
    margin-top: 15px;
    margin-bottom: 10px;
    margin-left: 15px;
    font-size: 11px;
    color: ${(props) => props.color};
    font-weight: 500;
`;

const BookInfo = styled.div`
    width: 375px;
    height: 170px;
    position: relative;

    .title {
        margin-bottom: 28px;
        margin-left: 15px;
        font-weight: 500;
        font-size: 17px;
    }

    .author {
        color: #7C6E65;
        font-size: 15px;
        margin-bottom: 10px;
        margin-left: 15px;
    }

    .price {
        margin-bottom: 15px;
        margin-left: 15px;
        font-weight: 700;
        font-size: 17px;
        color: #FF914C;

        span {
            text-decoration: line-through;
            font-size: 11px;
            margin-left: 5px;
            color: #161619;
            font-weight: 400;
        }
    }
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px;

    .heart {
        svg {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
    }

    .cart {
        svg {
            width: 18px;
            height: 18px;
            cursor: pointer;
        }
    }

`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const Sale = styled.div`
    width: 50px;
    height: 16px;
    color: #FFFFFF;
    background-color: #FF914C;
    padding-top: 5px;
    border-radius: 25px;
    position: absolute;
    right: 25px;
    top: -185px;

    p {
        font-size: 10px;
        text-align: center;
        font-weight: 500;
    }
`;