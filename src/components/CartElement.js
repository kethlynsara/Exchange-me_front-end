import styled from "styled-components";

function CartElement({element}) {
    
    return (
        <Container>
            <Cover src={element.image} />
            <Info>
                <div>{element.title}</div>
                <div>{element.author}</div>
                <div>{element.conservationState}</div>
                <div>{element.publisher}</div>
                <div>{element.price}</div>
                <div>{element.isbn}</div>
            </Info>  
    </Container>
    )
}

export default CartElement;

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