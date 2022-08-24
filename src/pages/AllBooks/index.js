import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

import Book from "../../components/Book";

function AllBooks() {
    const { bookStatus } = useContext(UserContext);
    console.log("all books page useState", bookStatus)
    const [books, setBooks] = useState({
        new: [],
        used: [],
        all: []
    });

    useEffect(() => {
        async function getBooks() {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/books`);
                console.log('data', data)
                setBooks({...books, new: data.new, used: data.used, all: data.all});
            } catch (e) {
                console.log(e.response.data.error);
            }
        }
        getBooks();
    }, []);

    if (bookStatus === "allBooks" && Object.keys(books).length > 0) {
        if (books.all.length > 0) {
            const array = books.all.sort(() => Math.random() - 0.5)
            return (
                <Container>
                    <h1>Todos os livros</h1>
                    <Books>
                        {array.map((element, index) => {
                                if (element.available) {
                                    return <Book element={element} key={index}/>
                                }
                            })
                        }
                    </Books>
                </Container>
            )
        } else {
            return <p>Sem registro de livros!</p>
        }
    } else if (bookStatus === "newBooks" && Object.keys(books).length > 0) {
        if (books.new.length > 0) {
            return (
                <Container>
                    <h1>Livros novos</h1>
                    <Books>
                        {books.new.map((element, index) => {
                                if (element.available) {
                                    return <Book element={element} key={index}/>
                                }
                            }
                        )}
                    </Books>
                </Container>
            )
        } else {
            return <p>Sem registro de livros!</p>
        }

    } else if (bookStatus === "newestBooks" && Object.keys(books).length > 0) {
        if (books.all.length > 0) {
            return (
                <Container>
                    <h1>Livros recentes</h1>
                    <Books>
                        {books.all.map((element, index) => {
                                if (element.available) {
                                    return <Book element={element} key={index}/>
                                }
                            })
                        }
                    </Books>
                </Container>
            )                
        } else {
            return <p>Sem registro de livros!</p>
        }
    } else if (bookStatus === "usedBooks" && Object.keys(books).length > 0) {
        if (books.used.length > 0) {
            return (
                <Container>
                    <h1>Livros usados</h1>
                    <Books>
                        {books.used.map((element, index) => {
                                if (element.available) {
                                    return <Book element={element} key={index}/>
                                }
                            })
                        }
                    </Books>
                </Container>
            )            
        } else {
            return <p>Sem registro de livros!</p>
        }
    } else {
        return <p>Loading</p>
    }
}

export default AllBooks;

const Container = styled.div`
    margin-top: 120px;
    margin-bottom: 50px;
    font-family: "Inter",Helvetica,Arial,sans-serif;
    color: #161619; 

    h1 {
        text-align: center;
        margin-bottom: 30px;
        font-weight: 600;
        font-size: 22px;
    }
`;


const Books = styled.div`
    margin-left: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;