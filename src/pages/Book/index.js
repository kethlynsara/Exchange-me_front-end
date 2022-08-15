import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

function Book() {
    const { bookId } = useParams();
    const [book, setBook] = useState({});
    const [bookData, setBookData] = useState(true);
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
        <Container>
            <BookCover>
                <Cover src={book.image} />
            </BookCover>
            <BookInfo>
                <p className="title">{book.title}</p>
                <Status color={book.conservationState === "used" ? "#fc930a" : "#29de02"} >{book.conservationState === "used" ? "USADO" : "NOVO"}</Status>
                <p className="price">R$ {book.price}</p>
                {userId !== book.userId ? <button onClick={() => addBookToCart(book)}>Adicionar ao carrinho</button> : ""}
            </BookInfo>
            <BookDetails>
                <Titles >
                    <DescriptionTitle onClick={() => setBookData(true)} color={bookData ? "#161619" : "#7C6E65"} >Descrição</DescriptionTitle>
                    <DetailsTitle onClick={() => setBookData(false)} color={!bookData ? "#161619" : "#7C6E65"} >Detalhes</DetailsTitle>
                </Titles>
                {bookData ? <Text>{book.description}</Text>
                 : 
                 <Details>
                    <p><span>Título:</span> {book.title}</p>    
                    <p><span>Autor:</span> {book.author}</p>  
                    <p><span>Editora:</span> {book.publisher}</p>  
                    <p><span>ISBN:</span> {book.isbn}</p>  
                    <p><span>Estado de conservação:</span> {book.conservationState === "new" ? "Novo" : "Usado"}</p>  
                    <p><span>Descrição do estado de conservação:</span> {book.conservationStateDescription}</p>  
                 </Details>}                
            </BookDetails>
        </Container>
    ) : <p>Loading...</p>
}

export default Book;

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

const BookDetails = styled.div`
    width: 100%;
    min-height: 200px;
    border: 1px;
    border-style: solid;
    border-color: #F1F1F1;
    margin-top: 50px;
    padding-top: 15px;
    font-weight: 500;
`;

const Titles = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`; 

const DetailsTitle = styled.p`
    cursor: pointer;
    color: ${(props) => props.color};
`; 

const DescriptionTitle = styled.p`
    cursor: pointer;
    color: ${(props) => props.color};
`; 

const Details = styled.div`
    margin: 30px 15px 30px 15px;
    font-weight: 400;

    span {
        font-weight: 600;
    }

    p {
        margin-top: 15px;
    }
`; 

const Text = styled.p`
    margin: 30px 15px 30px 15px;
    font-weight: 400;
`;


const Status = styled.p`
    margin-top: 15px;
    margin-bottom: 20px;
    font-size: 15px;
    color: ${(props) => props.color};
`;