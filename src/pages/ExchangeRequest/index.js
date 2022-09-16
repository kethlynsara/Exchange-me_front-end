import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from "react-toastify";
toast.configure();

function ExchangeRequest() {
    const { exchangeId } = useParams();
    const [exchanges, setExchanges] = useState({})
    const [code, setCode] = useState("");
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();

    const userData = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userData);
    const { token } = userInfo;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      } 
    }

    useEffect(() => {
        async function getExchangeRequests() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/exchanges/requests/${exchangeId}`, config);
                setExchanges({...response.data});

            } catch (error) {
                console.log(error);
            }
        }

        getExchangeRequests();
    }, []);

    async function updateCashback() {
        console.log(code, 'id', exchanges.orderBook.book.id)
        if (code !== "") {
            try {
                const cashback = 0.20 * parseFloat(exchanges.orderBook.book.price);            
                await axios.post(`${process.env.REACT_APP_API_URL}/user/cashback`, {cashback}, config);
                setDisable(true);
                
                console.log('req')
                await axios.post(`${process.env.REACT_APP_API_URL}/books/update`, {
                    id: exchanges.orderBook.book.id,
                    available: false
                }, config);

                toast("Operação realizada com sucesso!");
                navigate("/exchanges");
            } catch (error) {
                console.log(error.response);
            }
        } else {
            toast("Preencha o código de  rastreio!");  
        } 
    }

 

    console.log('exchanges', exchanges, disable)
    console.log(exchanges.orderBook)

    if (Object.keys(exchanges).length === 0) {
        return <p>loading...</p>
    } else {
        if (exchanges.orderBook.book.available === true) {
                return (
                    <Container>
                        <BookCover>
                            <Cover src={exchanges.orderBook.book.image} />
                        </BookCover>
                        <BookInfo>
                            <p className="title">{exchanges.orderBook.book.title}</p>
                            <Status color={exchanges.orderBook.book.conservationState === "used" ? "#fc930a" : "#29de02"} >{exchanges.orderBook.book.conservationState === "used" ? "USADO" : "NOVO"}</Status>
                            <p className="price">R$ {exchanges.orderBook.book.price}</p>
                        </BookInfo>
                        <Info>
                            <h1>Você recebeu uma solicitação de troca pelo livro "<span>{exchanges.orderBook.book.title}</span>". </h1>
                            <Address>
                                <h2>Endereço de entrega:</h2>
                                <p>{exchanges.orderBook.order.address.street}, {exchanges.orderBook.order.address.number} - {exchanges.orderBook.order.address.cep}</p>
                                <p>{exchanges.orderBook.order.address.district} - {exchanges.orderBook.order.address.uf}</p>
                            </Address>
                            <ShippingDetails>
                                <p className="info1">Envie o livro para o endereço indicado, digite o código de ratreio fornecido pelos correios e receba seu cashback</p>
                                <div>
                                    <input type="text" placeholder="Código de rastreio" required value={code} onChange={(e) => setCode(e.target.value)}/>
                                    <button disabled={disable} onClick={updateCashback}>Confirmar</button>
                                </div>
                                <p className="info2">Mais informações à respeito da entrega foram enviadas ao seu email de registro</p>
                            </ShippingDetails>
                        </Info>                        
                    </Container>
                )
        } else {
                return (
                    <Container>
                        <P>Troca já realizada!</P>
                    </Container>
                )
        }
    }
}

export default ExchangeRequest;

const Container = styled.div`
    margin-top: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    font-family: "Inter",Helvetica,Arial,sans-serif;
    color: #161619;
`;

const BookCover = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 0 50px 0;
    border: 1px;
    border-style: solid;
    border-color: #F1F1F1;
`;

const Cover = styled.img`
    width: 250px;
`;

const BookInfo = styled.div`
    width: 100%;
    margin-top: 50px;

    .title {
        font-size: 30px;
        font-weight: 500;
    }

    .price {
        font-size: 20px;
        font-weight: 500;
    }

    button {
        width: 100%;
        height: 50px;
        background-color: #161619;
        border: none;
        color: #FFFFFF;
        text-align: center;
        margin-top: 20px;
        font-size: 15px;

        :hover {
            cursor: pointer;
            background-color: #000000;
        }
    }
`;

const Info = styled.div`
    width: 100%;
    border: 1px;
    border-style: solid;
    border-color: #F1F1F1;
    margin-top: 20px;

    h1 {
        margin: 15px;

        span {
            font-weight: 500;
        }
    }
 `;

const Status = styled.p`
    margin-top: 15px;
    margin-bottom: 20px;
    font-size: 15px;
    color: ${(props) => props.color};
`;

const Address = styled.div`
    margin: 15px;

    h2 {
        margin-bottom: 10px;
        font-weight: 600;
    }
`;

const ShippingDetails = styled.div`
    margin: 15px;

    .info1 {
        margin-bottom: 15px;
    }

    input {
        height: 20px;
    }

    button {
        border: none;
        border-radius: 2px;
        background-color: #161619;
        height: 25px;
        color: #FFFFFF;
    }

    .info2 {
        margin-top: 15px;
    }

    div {
        display: flex;
        justify-content: space-around;
    }
`;

const P = styled.p`
    font-weight: 500;
    opacity: 0.5;
`;