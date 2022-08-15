import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

function ExchangeRequestBook({element, exchangeBookId}) {
    const navigate = useNavigate();
    console.log('ex', exchangeBookId)


    return (
        <Container>
            <BookElement>
                <StyledLink to={"/exchanges/requests/" + exchangeBookId}>
                    <Cover src={element.image} />
                </StyledLink>  
                <BookInfo>
                    <Status color={element.conservationState === "used" ? "#fc930a" : "#29de02"} >{element.conservationState === "used" ? "USADO" : "NOVO"}</Status>
                    <p className="title">{element.title}</p>
                    <p className="author">{element.author}</p>
                    <p className="price">R$ {parseFloat(element.price).toFixed(2)} <span>R$ {(parseFloat(element.price) + 10.90).toFixed(2)}</span></p>
                </BookInfo>
            </BookElement>              
        </Container>
    )
}

export default ExchangeRequestBook;

const Container = styled.div`
    font-family: "Inter",Helvetica,Arial,sans-serif;
    color: #161619;
    display: inline-block;
    margin-bottom: 10px;
`;

const Cover = styled.img`
    width: 115px;
    height: 165px;
    margin-top: 20px;
`;

const BookElement = styled.div`
    height: 320px;
    width: 180px;
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
    font-size: 10px;
    color: ${(props) => props.color};
`;

const BookInfo = styled.div`
    width: 100%;
    height: 170px;

    .title {
        margin-bottom: 15px;
        margin-left: 15px;
        font-weight: 500;
        font-size: 16px;
    }

    .author {
        color: #7C6E65;
        font-size: 13px;
        margin-bottom: 8px;
        margin-left: 15px;
    }

    .price {
        margin-bottom: 15px;
        margin-left: 15px;
        font-weight: 500;
        font-size: 15px;

        span {
            text-decoration: line-through;
            color: #fd724c;
            font-size: 9px;
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