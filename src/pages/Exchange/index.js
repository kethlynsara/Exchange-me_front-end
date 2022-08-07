import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import Book from "../../components/Book";

function Exchange() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function getUserBooks() {
            const data = localStorage.getItem("userInfo");
            const userInfo = JSON.parse(data);
            const { token } = userInfo;
            console.log('t', token)
            const config = {
              headers: {
                Authorization: `Bearer ${token}`
              } 
            }
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/exchanges`, config)
            setBooks(response.data);
        }
        getUserBooks();
    }, [])
    console.log(books)
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

            {/* <p>Cashback: R$ {books.user.cashback}</p> */}
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