import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";

function Book({element}) {
    console.log('el', element)
    const userData = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userData);
    const { token, userId } = userInfo;
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
                        <Status color={element.conservationState === "used" ? "#fc930a" : "#29de02"} >{element.conservationState === "used" ? "USADO" : "NOVO"}</Status>
                        <p className="title">{element.title}</p>
                        <p className="author">{element.author}</p>
                        <p className="price">R$ {parseFloat(element.price).toFixed(2)} <span>R$ {(parseFloat(element.price) + 10.90).toFixed(2)}</span></p>
                        <Buttons>
                            <div className="cart">
                                {userId !== element.userId ? <BsHandbag onClick={() => addBookToCart(element)} /> : ""}
                            </div>
                            <div className="heart">
                                <IoIosHeartEmpty />
                            </div>
                        </Buttons>
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
`;

const Cover = styled.img`
    width: 115px;
    height: 165px;
    margin: auto;
`;

const BookElement = styled.div`
    height: 370px;
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
`;

const BookInfo = styled.div`
    width: 375px;
    height: 170px;

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
        font-weight: 500;
        font-size: 17px;

        span {
            text-decoration: line-through;
            color: #fd724c;
            font-size: 11px;
            margin-left: 5px;
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