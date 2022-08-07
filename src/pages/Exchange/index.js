import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Book from "../../components/Book";
// import MultipleSelectChip from "../../components/PixOptions";

function Exchange() {
    const [books, setBooks] = useState([]);
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

    useEffect(() => {
        async function getUserBooks() {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/exchanges`, config);
            setBooks(response.data);
            setcashbackAmount(parseFloat(response.data[0].user.cashback).toFixed(2));
        }
        getUserBooks();
    }, [])

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
        alert("Dados coletados com sucesso! Dentro de 24h a transferência será concluída");
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/exchanges/user/update`, {cashback: updatedCashback.toString()}, config);            
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <Container>
            <Link to="/exchanges/register">
                <Button>Register Book</Button>
            </Link>

            <List>
                <h1>Livros disponibilizados para troca</h1>
                {books.length > 0 ? books.map((element, index) =>  <Book element={element} key={index}/>)
                :
                <p>Não há livros disponíveis</p>}
            </List>

            <Cashback>
                <p>Cashback: R$ {getCashback()}</p>
                {getWithdraw()}
            </Cashback>

            {visibleWithdrawForm ? 
            <Withdraw onSubmit={updateUserCashback}>
                <p>Digite o valor do saque</p>
                <input type="text" placeholder="R$ 0.00" required value={withdraw} onChange={(e) => setWithdraw(e.target.value)}/>

                <p>Digite os dados da conta</p>
                <input type="text" placeholder="Código do banco" required value={account.bankCode} onBlur={checkBankCode} onChange={(e) => setAccount({...account, bankCode: e.target.value})}/>
                <input type="text" placeholder="Banco" required value={account.bank} onChange={(e) => setAccount({...account, bank: e.target.value})}/>
                <input type="text" placeholder="Agência" required value={account.agency} onChange={(e) => setAccount({...account, agency: e.target.value})}/>
                <input type="text" placeholder="Conta" required value={account.accountNumber} onChange={(e) => setAccount({...account, accountNumber: e.target.value})}/>
                <input type="text" placeholder="CPF" required value={account.cpf} onChange={(e) => setAccount({...account, cpf: e.target.value})}/>
                <button type="submit">Ok</button>
            </Withdraw>
            : ""
            }
        </Container>
    )
}

export default Exchange;

const Container = styled.div`

`;

const Button = styled.button`
    border: none;
    border-radius: 2px;
    color: white;
    background-color: salmon;
    margin: 15px 0 0 15px;
    
    &:hover {
        cursor: pointer;
    }
`;

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Cashback = styled.div`
    display: flex;
    justify-content: space-between;

    button {
        border: none;
        border-radius: 2px;
        margin: 15px 0 0 15px;
    
        &:hover {
            cursor: pointer;
        }
    }
`;

const Withdraw = styled.form`

`;