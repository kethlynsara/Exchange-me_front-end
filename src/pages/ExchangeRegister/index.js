import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";

function ExchangeRegister() {
    const [isbn, setIsbn] = useState("");
    const [showBook, setShowBook] = useState(null);
    const [element, setElement] = useState(null);

    async function getBookInfo(e) {
        e.preventDefault();

        try {
            const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=AIzaSyCVZXkCXtsrUFR95ny8Z4SGV44z9dNdKbE`);
    
            if (data.items.length !== 1) {
                console.log("book not found")
            } else {
                setElement({
                    title: data.items[0].volumeInfo.title ? data.items[0].volumeInfo.title : "",
                    author: data.items[0].volumeInfo.authors[0] ? data.items[0].volumeInfo.authors[0] : "",
                    publisher: data.items[0].volumeInfo.publisher ? data.items[0].volumeInfo.publisher : "none",
                    isbn: data.items[0].volumeInfo.industryIdentifiers[0].identifier ? data.items[0].volumeInfo.industryIdentifiers[0].identifier : "none",
                    image: data.items[0].volumeInfo.imageLinks ? `${data.items[0].volumeInfo.imageLinks.thumbnail}` : "none",
                    description: data.items[0].volumeInfo.description ? data.items[0].volumeInfo.description : "none"
                })
            }
        } catch (e) {
            console.log(e.response.data);
        }
    }

    console.log(element)
    
    return (
        <div>
            <Input type="text" placeholder="Digite aqui p código isbn" value={isbn} required onChange={(e) => setIsbn(e.target.value)} />
            <GoSearch onClick={getBookInfo} />
            {element ? 
                <>
                    <p>{element.title}</p>
                    <p>{element.author}</p>
                    <p>{element.publisher}</p>
                    <p>{element.isbn}</p>
                    <p>{element.description}</p>
                    <p>{element.image}</p>
                </>
            :
            ""}
        </div>
    )
}

export default ExchangeRegister;

const Input = styled.input`

`;