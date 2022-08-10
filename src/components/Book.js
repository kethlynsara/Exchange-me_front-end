import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
            {/* <StyledLink> */}
                <Cover src={element.image} />
                <Info>
                    <div>{element.title}</div>
                    <div>{element.author}</div>
                    <div>{element.conservationState}</div>
                    <div>{element.publisher}</div>
                    <div>{element.price}</div>
                    <div>{element.isbn}</div>
                    {userId !== element.userId ? <button onClick={() => addBookToCart(element)}>Comprar</button> : ""}
                </Info>  
            {/* </StyledLink>               */}
        </Container>
    )
}

export default Book;

const Container = styled.div`
    width: 100%;

    display: flex;
    flex-wrap: wrap; 
    z-index: 1200;
`;

const Cover = styled.img`
    width: 72px;
    height: 105px;
    margin-top: 15px;
`;

const Info = styled.div`
    margin-top: 15px;

    button {
        :hover {
            cursor: pointer;
        }
    }
`;

// const StyledLink = styled(Link)`
//     /* text-decoration: none; */
//     display: flex;
//     flex-wrap: wrap; 
//     background-color: salmon;
// `;