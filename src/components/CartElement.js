import styled from "styled-components";
import { CgTrash } from "react-icons/cg";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from "react-toastify";
toast.configure();

function CartElement({element}) {
    const userData = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userData);
    const { token } = userInfo;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      } 
    }

    async function removeBookFromCart(bookId) {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/cart/${bookId}`, config);
            toast("Livro removido do carrinho com sucesso!");
            window.location.reload();
        } catch (error) {
            console.log(error.response);
        }
    }
    
    return (
        <Container>
            <Cover src={element.image} />
            <Info>
                <p className="title">{element.title}</p>
                <p className="author">{element.author}</p>
                <p className="price">R$ {element.price}</p>
                <CgTrash onClick={() => removeBookFromCart(element.id)} />
            </Info>  
        </Container>
    )
}

export default CartElement;

const Container = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    margin-bottom: 14px;
    background-color: #F8F8F8;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

const Cover = styled.img`
    width: 120px;
    height: 157px;
    border-radius: 2px;
    margin: 24px 14px 24px 18px;
`;

const Info = styled.div`
    margin-top: 26px;

    button {
        :hover {
            cursor: pointer;
        }

        :focus {
            outline: none !important;
            border:1px solid #575759;
        }
    }

    .title {
        font-weight: 600;
        margin-bottom: 10px;
    }

    .author {
        margin-bottom: 25px;
        color: #7C6E65;
        opacity: 0.5;
        font-weight: 500;
        font-size: 13px;
    }

    .price {
        font-weight: 600;
        font-size: 17px;
    }

    svg {
        position: absolute;
        right: 18px;
        bottom: 24px;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
`;