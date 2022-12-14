import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Book from "../../components/Book";
import ExchangeRequestBook from "../../components/ExchangeRequestBook";
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from "react-toastify";
toast.configure();

function Exchange() {
    const [books, setBooks] = useState([]);
    const [exchangeBooks, setExchangeBooks] = useState([]);
    const [withdraw, setWithdraw] = useState(0);
    const [account, setAccount] = useState({
        bank: "",
        bankCode: "",
        agency: "",
        accountNumber: "",
        cpf: ""
    });
    const [cashbackAmount, setcashbackAmount] = useState(0);
    const [visibleWithdrawForm, setVisibleWithdrawForm] = useState(false);

    const userData = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userData);
    const { token } = userInfo;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      } 
    }
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserBooks() {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/exchanges`, config);
            setBooks(response.data);
            if (response.data.length > 0) {
                setcashbackAmount(parseFloat(response.data[0].user.cashback).toFixed(2));                
            }
        }
        getUserBooks();
    }, []);

    useEffect(() => {
        async function getExchangeRequests() {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/exchanges/requests`, config);
            setExchangeBooks(response.data);
        }
        getExchangeRequests();
    }, []);

    function getCashback() {
        if (books.length > 0) {
            return cashbackAmount;
        }
    }

    function getWithdraw() {
        if (books.length > 0) {
            return <button disabled={cashbackAmount >= 2 ? false : true} onClick={() => {
                setVisibleWithdrawForm(true);
            }}>Solicitar saque</button>
        }
    }

    async function checkBankCode() {
        try {
            const { data } = await axios.get(`https://brasilapi.com.br/api/banks/v1/${account.bankCode}`);
            setAccount({...account, bank: data.fullName})
        }catch(error) {
            console.log(error.response);
        }
    }

    async function updateUserCashback(e) {
        e.preventDefault();
        const updatedCashback = cashbackAmount - withdraw;
        setcashbackAmount(updatedCashback);
        setVisibleWithdrawForm(false);
        setAccount({
            bank: "",
            bankCode: "",
            agency: "",
            accountNumber: "",
            cpf: ""
        });
        setWithdraw(0)
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/exchanges/user/update`, {cashback: updatedCashback.toString()}, config);  
            toast("Dados coletados com sucesso! Dentro de 24h a transfer??ncia ser?? conclu??da");          
        } catch (error) {
            console.log(error.response)
        }
    }

    console.log(exchangeBooks)

    function checkAvailableBooks() {
        if (exchangeBooks.length > 0) {
            const availableBooks = exchangeBooks.filter((element) => element.orderBook.book.available)
            console.log(availableBooks)
            if (availableBooks.length === 0) return <P>Nenhuma solicita????o encontrada!</P>
        }
    }


    return (
        <Container>
            <Button onClick={() => navigate("/exchanges/register")}>Adicionar Livro</Button>

            <ExchangeList>
                <h1>Livros disponibilizados para troca</h1>
                <Books>
                    {books.length > 0 ? books.map((element, index) =>  <Book element={element} key={index}/>)
                    :
                    <P>N??o h?? livros dispon??veis</P>}
                </Books>
            </ExchangeList>

            <ExchangeRequestList>
                <h1>Solicita????es de troca</h1>
                <Books>
                    {exchangeBooks.length > 0 ? exchangeBooks.map((element, index) =>  {
                        if (element.orderBook.book.available) {
                            return <ExchangeRequestBook element={element.orderBook.book} key={index} exchangeBookId={element.id} />
                        }})
                    :
                    <P>N??o h?? solicita????es dispon??veis</P>}
                    {checkAvailableBooks()}
                </Books>
            </ExchangeRequestList>

            <Cashback>
                <p>Cashback: <span>R$ {getCashback()} </span></p>
                {getWithdraw()}
            </Cashback>

            <Box background={visibleWithdrawForm ? "#F3F3F3" : "#FFFFFF"}>
                {visibleWithdrawForm ? 
                <Withdraw onSubmit={updateUserCashback}>
                    <p>Digite o valor do saque</p>
                    <input type="text" placeholder="R$ 0.00" required value={withdraw} onChange={(e) => setWithdraw(e.target.value)}/>

                    <p>Digite os dados da conta</p>
                    <input type="text" placeholder="C??digo do banco" required value={account.bankCode} onBlur={checkBankCode} onChange={(e) => setAccount({...account, bankCode: e.target.value})}/>
                    <input type="text" placeholder="Banco" required value={account.bank} onChange={(e) => setAccount({...account, bank: e.target.value})}/>
                    <input type="text" placeholder="Ag??ncia" required value={account.agency} onChange={(e) => setAccount({...account, agency: e.target.value})}/>
                    <input type="text" placeholder="Conta" required value={account.accountNumber} onChange={(e) => setAccount({...account, accountNumber: e.target.value})}/>
                    <input type="text" placeholder="CPF" required value={account.cpf} onChange={(e) => setAccount({...account, cpf: e.target.value})}/>
                    <button type="submit">Confirmar</button>
                </Withdraw>
                : ""
                }
            </Box>
        </Container>
    )
}

export default Exchange;

const Container = styled.div`
    margin-top: 130px;
    font-family: "Inter",Helvetica,Arial,sans-serif;
    color: #161619; 
    padding-left: 22px;
    overflow-y: hidden;
    overflow-x: hidden;
`;

const Button = styled.button`
    height: 35px;
    width: 110px;
    border: none;
    border-radius: 2px;
    color: white;
    font-weight: 600;
    margin-bottom: 20px;
    background-color: #FF914C;
    
    &:hover {
        cursor: pointer;
    }
`;

const ExchangeList = styled.div`
    display: flex;
    flex-direction: column;
    
    h1 {
        font-size: 21px;
        font-weight: 500;
        margin-bottom: 15px;
        margin-top: 30px;
    }
    `;

const ExchangeRequestList = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 100px;

    h1 {
        font-size: 21px;
        font-weight: 500;
        margin-bottom: 15px;
        margin-top: 30px;
    }
`;

const Cashback = styled.div`
    width: 100%;
    height: 90px;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F8F8F8;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    padding: 0 25px;

    button {
        width: 120px;
        height: 30px; 
        border: none;
        border-radius: 2px;
        margin: 0 40px 0 15px;
        background-color: #FF914C;
        color: #FFFFFF;
        font-weight: 600;
    
        &:hover {
            cursor: pointer;
        }
    }

    span {
        font-weight: 500;
    }

`;

const Withdraw = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    input {        
        width: 326px;
        height: 40px;
        background: #FFFFFF;
        border: none;
        margin-bottom: 13px;
        padding-left: 15px;

        :focus {
            outline: none !important;
            border:1px solid #575759;
        }
    }

    p {
        margin-top: 15px;
        margin-bottom: 15px;
    }

    button {
        border: none;
        border-radius: 2px;
        background-color: #FF914C;
        color: #FFFFFF;
        height: 30px;
        width: 120px;
        font-weight: 600;

        :hover {
            cursor: pointer;
        }

        :focus {
            outline: none !important;
            border:1px solid #575759;
        }
    }
`;

const Box = styled.div`
    background-color: ${(props) => props.background};
    text-align: center;
    margin-right: 30px;
    margin-bottom: 120px;
    padding-top: 20px;
    padding-bottom: 20px;
    
    h1 {
        font-size: 19px;
        font-weight: 600;
        margin-top: 30px;
    }
`;


const Books = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const P = styled.p`
    opacity: 0.5;
    font-size: 15px;
    margin: 0 auto;
    margin-top: 20px;

`;