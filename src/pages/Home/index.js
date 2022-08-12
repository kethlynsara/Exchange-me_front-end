import axios from "axios";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoMdArrowDropright } from 'react-icons/io';

import HomeSlider from "../../components/Slider";
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
        <Box>
            {/* <HomeSlider /> */}
            <Container>
                <List>
                    <ListHeader>
                        <h1>Novos</h1>
                        <div>
                            <ListAll to="/"> Todos</ListAll>
                            <IoMdArrowDropright />
                        </div>
                    </ListHeader>
                    <Scroll>
                        <Books>
                            {books.new.length <= 5 ? books.new.map((element, index) => <Book element={element} key={index}/>)
                            : getBooksSection(books.new)                              
                            }
                        </Books>
                    </Scroll> 
                </List>
                
                <List>
                    <ListHeader>
                        <h1>Recentes</h1>
                        <div>
                            <ListAll to="/"> Todos</ListAll>
                            <IoMdArrowDropright />
                        </div>
                    </ListHeader>
                    <Scroll>
                        <Books>
                            {books.all.length <= 5 ? books.all.map((element, index) => <Book element={element} key={index}/>)
                            : getBooksSection(books.all)                              
                            }
                        </Books>  
                    </Scroll>
                </List>


                <List>
                    <ListHeader>
                        <h1>Usados</h1>
                        <div>
                            <ListAll to="/"> Todos</ListAll>
                            <IoMdArrowDropright />
                        </div>
                    </ListHeader>                <Scroll>
                        <Books>
                            {books.used.length <= 5 ? books.used.map((element, index) => <Book element={element} key={index}/>)
                            : getBooksSection(books.used)                              
                            }
                        </Books>
                    </Scroll>
                </List>


                <Button onClick={() => {
                    setBookStatus("allBooks");
                    navigate("/books");
                }}>Todos os livros</Button>
            </Container>
        </Box>
    )
    : <p>Loading</p>
}

export default Home;

const Box = styled.div`
    margin-top: 66px;
    overflow-x: hidden; 
`;

const Container = styled.div`
    font-family: "Inter",Helvetica,Arial,sans-serif;
    color: #161619; 
    margin-top: 40px;
    padding: 20px 15px 20px 20px;
`;

const List = styled.div`
    margin-bottom: 30px;

    h1 {
        font-size: 24px;
        font-weight: 500;
    }
`;

const ListHeader = styled.header`
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    font-size: 13px;

    svg {
        color: #7C6E65;
        position: relative;
        top: 3px;
    }
`;

const ListAll = styled(Link)`
    text-decoration: none;
    color: #7C6E65;
`;

const Scroll = styled.div`
    display: block;
    width: 100%;
    scrollbar-width: none;
    overflow-x: scroll;
    overflow-y: hidden;

`;

const Books = styled.div`
    display: block;
    white-space: nowrap;
`;

const Button = styled.button`
    border: none;
    background-color: #fff;
    color: #7C6E65;

    :hover {
        cursor: pointer;
    }
`;