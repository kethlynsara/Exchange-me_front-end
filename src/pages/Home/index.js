import axios from "axios";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Book from "../../components/Book";
import UserContext from "../../contexts/UserContext";

function Home() {
    const { setBookStatus } = useContext(UserContext);
    const navigate = useNavigate();
    const URL = "http://localhost:5000";
    const [books, setBooks] = useState({
        new: [],
        used: [],
        all: []
    });

    useEffect(() => {
        async function getBooks() {
            try {
                const { data } = await axios.get(`${URL}/books`);
                console.log('data', data)
                setBooks({...books, new: data.new, used: data.used, all: data.all});
            } catch (e) {
                console.log(e.response.data.error);
            }
        }
        getBooks();
    }, []);

    function getBooksSection(array) {
        const booksSection = array.slice(0,6);
        console.log("slice", booksSection)
        return booksSection.map((element, index) => <Book element={element} key={index}/>) 
    }
    

    console.log('books', books)
    if (books.all.length > 0) {
        console.log("tam", books.all.length)
    }
    
    return books.all.length > 0 ? (
        <Container>
            <List>
                <h1>New</h1>
                {books.new.length <= 5 ? books.new.map((element, index) => <Book element={element} key={index}/>)
                : getBooksSection(books.new)                              
                }
            </List>

            <List>
                <h1>Used</h1>
                {books.used.length <= 5 ? books.used.map((element, index) => <Book element={element} key={index}/>)
                : getBooksSection(books.used)                              
                }
            </List>

            <List>
                <h1>Newest</h1>
                {books.all.length <= 5 ? books.all.map((element, index) => <Book element={element} key={index}/>)
                : getBooksSection(books.all)                              
                }
                
            </List>

            <Button onClick={() => {
                setBookStatus("allBooks");
                navigate("/books");
            }}>Todos os livros</Button>
        </Container>
    )
    : <p>Loading</p>
}

export default Home;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
`;

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Button = styled.button`
    border: none;
    background-color: #fff;

    :hover {
        cursor: pointer;
    }
`;

// const StyledLink = styled(Link)`
//     /* text-decoration: none; */
// `;