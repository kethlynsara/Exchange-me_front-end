import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from "react-toastify";
toast.configure();

function ReviewOrder({payment, address}) {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    let total = 0;
    let order = {};
    const userData = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userData);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      } 
    }

    useEffect(() => {
        async function getUserCart() {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/cart`, config);
                setBooks([...data]);
            } catch (error) {
                console.log(error.response);
                toast("Não foi possível buscar o carrinho");
            }
        }
        getUserCart();
    }, []);

    async function placeOrder() {
        order = {
            user: {
                name: address.nome,
                email: address.email,
                phone: address.telefone
            },
            order: books,
            total,
            address: {
                cep: address.cep,
                street: address.rua,
                number: parseInt(address.num),
                district: address.bairro,
                city: address.cidade,
                uf: address.uf
            }
        }
        try {
            console.log(order);
            await axios.post(`${process.env.REACT_APP_API_URL}/order`, order, config);
            navigate("/success");
        } catch (error) {
            console.log(error.response)
            toast("Não foi possível efetuar a compra");
        }
    }
    
    console.log(address)
    return (
        <Container>
            <OrderSumary>
                    <Title>Livros</Title>
                    {books.length > 0 ?
                    books.map((element, index) => {
                        total = total + parseFloat(element.book.price);
                        return <Product>
                                    <div>
                                        <BookIndex>Livro {index + 1}</BookIndex>
                                        <BookTitle>{element.book.title}</BookTitle>
                                    </div>
                                    <Price>R$ {element.book.price}</Price>
                               </Product> 
                    })
                    :
                    <p>Loading</p>}
                    <Total>
                        <p>Total:</p>
                        <span>R$ {total.toFixed(2)}</span>
                    </Total>
            </OrderSumary>            

            <Shipping>
                    <Title>Entrega</Title>
                    <div>
                        <span><p>{address.nome}</p></span>
                        <p>{address.rua}, {address.num}, {address.cidade}, {address.uf}</p>
                    </div>

            </Shipping>

            <PaymentDetails>
                <Title>Pagamento</Title>
                <div>
                    <p>Cartão de crédito</p>
                    <p>Nome: <span>{payment.name}</span></p>
                    <p>Número do cartão: <span>{payment.cardNumber}</span></p>
                    <p>Data de expiração: <span>{payment.expirationDate}</span></p>
                </div>
            </PaymentDetails>

            <Button onClick={placeOrder}>Finalizar pedido</Button>
        </Container>
    )
}

export default ReviewOrder;

const Container = styled.div`
    font-family: "Inter",Helvetica,Arial,sans-serif;
    color: #161619;
    padding: 10px;
    padding-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const OrderSumary = styled.div`
    /* display: flex;
    flex-direction: column; */
`;

const Title = styled.p`
    margin-top: 40px;
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 19px;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 25px;

    div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
`;

const Price = styled.div`
    font-size: 15px;
    margin-top: 23px;
`;

const BookIndex = styled.p`
    margin-bottom: 7px;

`;

const BookTitle = styled.p`
    font-size: 15px;
    opacity: 0.7;
`;

const Total = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    
    span {
        font-weight: 600;
    }
`;

const Shipping = styled.div`
    div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    span {
        p {
            margin-bottom: 10px;
        }
    }
`;

const PaymentDetails = styled.div`
    div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        
        p {
            margin-bottom: 10px;
            
            span {
                opacity: 0.7;
            }
        }
    }
`;

const Button = styled.button`
    border: none;
    background-color: #FF914C;
    color: #FFFFFF;
    width: 150px;
    height: 40px;
    border-radius: 2px;
    font-weight: 600;
    font-size: 16px;
    margin: 0 auto;
    margin-top: 20px;

    :hover {
        cursor: pointer;
    }

    :focus {
        outline: none !important;
        border:1px solid #575759;
    }
`;