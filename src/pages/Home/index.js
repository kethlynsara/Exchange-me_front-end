import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

import Book from "../../components/Book";

function Home() {
    const URL = "http://localhost:5000";
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function getBooks() {
            try {
                const { data } = await axios.get(`${URL}/books`);
                setBooks([...data]);
            } catch (e) {
                console.log(e.response.data.error);
            }
        }
        getBooks();
    }, []);

    console.log(books)
    return books.length > 0 ? (
        <Container>
            <List>
                {books.map((element) => <Book element={element}/>)}
            </List>
        </Container>
    )
    : <p>Loading</p>
}

export default Home;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

// const StyledLink = styled(Link)`
//     /* text-decoration: none; */
// `;