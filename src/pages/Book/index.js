import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import styled from "styled-components";

function Book() {
    const { bookId } = useParams();
    const [book, setBook] = useState({});
    const navigate = useNavigate();

    const userData = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userData);
    const { token, userId } = userInfo;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      } 
    }

    useEffect(() => {
        async function getBook() {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/books/${bookId}`, config);
            setBook({...data});
        }
        getBook();
    }, []);

    async function addBookToCart(book) {
        const cartInfo = {
            userId,
            bookId: book.id,
            active: true
        }
        try {
            axios.post(`${process.env.REACT_APP_API_URL}/cart`, cartInfo, config);
            navigate("/cart");
        } catch (error) {
            console.log(error.response);
        }
    }

    console.log(book)
    return Object.keys(book).length > 0 ? (
        <div>
            <p>{book.title}</p>
            <Cover src={book.image} />
            {userId !== book.userId ? <button onClick={() => addBookToCart(book)}>Comprar</button> : ""}
        </div>
    ) : <p>Loading...</p>
}

export default Book;

const Cover = styled.img`
    width: 300px;
`;