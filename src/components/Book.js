import styled from "styled-components";
// import { Link } from "react-router-dom";

function Book({element}) {

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
    background-color: salmon;
`;

const Cover = styled.img`
    width: 72px;
    height: 105px;
    margin-top: 15px;
`;

const Info = styled.div`
    /* width: 100%;

    display: flex;
    flex-direction: column;
    background-color: salmon; */
    margin-top: 15px;
`;

// const StyledLink = styled(Link)`
//     /* text-decoration: none; */
//     display: flex;
//     flex-wrap: wrap; 
//     background-color: salmon;
// `;