import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

function ExchangeRequestBook({element, exchangeBookId}) {
    const navigate = useNavigate();
    console.log('ex', exchangeBookId)


    return (
        <Container>
            <StyledLink to={"/exchanges/requests/" + exchangeBookId}>
                <Cover src={element.image} />
                <Info>
                    <div>{element.title}</div>
                    <div>{element.author}</div>
                </Info>  
            </StyledLink>              
        </Container>
    )
}

export default ExchangeRequestBook;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const Cover = styled.img`
    width: 72px;
    height: 105px;
    margin-top: 15px;
`;

const Info = styled.div`
    margin-top: 5px;

    button {
        :hover {
            cursor: pointer;
        }
    }
`;

const StyledLink = styled(Link)`
     text-decoration: none;
     /* display: flex;
     flex-wrap: wrap;
     flex-direction: column;  */
`;