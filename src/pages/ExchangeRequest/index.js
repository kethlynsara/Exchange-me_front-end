import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ExchangeRequest() {
    const { exchangeId } = useParams();
    const [exchanges, setExchanges] = useState({})
    const [code, setCode] = useState("");
    const [disable, setDisable] = useState(false);

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
            } catch (error) {
                console.log(error.response);
            }
        } else {
            alert("Preencha o código de  rastreio!");  
        } 
    }

 

    console.log('exchanges', exchanges, disable)
    console.log(exchanges.orderBook)

    if (Object.keys(exchanges).length === 0) {
        return <p>loading...</p>
    } else {
        if (exchanges.orderBook.book.available === true) {
                return (
                    <>
                        <h1>vc recebeu uma solicitação de troca pelo livro... </h1>
                        <p>Envie o livro para o endereço indicado, digite o código de rastreio disponibilizado pelos correios e receba seu cashback</p>
                        <input type="text" placeholder="Digite o código de rastreio" required value={code} onChange={(e) => setCode(e.target.value)}/>
                        <button disabled={disable} onClick={updateCashback}>get cashback</button>
                    </>
                )
        } else {
                return <p>troca já realizada</p>
        }
    }
}

export default ExchangeRequest;