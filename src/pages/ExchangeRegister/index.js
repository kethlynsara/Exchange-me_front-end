import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from "react-toastify";
toast.configure();

function ExchangeRegister() {
    const [isbn, setIsbn] = useState("");
    const [element, setElement] = useState({
        title: "",
        author: "",
        publisher: "",
        isbn: "",
        image: "",
        description: "",
        conservationStateDescription: "",
        conservationState: "",
        price: ""
    });
    const navigate = useNavigate();

    async function getBookInfo(e) {
        e.preventDefault();

        try {
            const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
    
            if (data.items.length !== 1) {
                toast("Livro não encontrado!");

            } else {
                setElement({
                    title: data.items[0].volumeInfo.title ? data.items[0].volumeInfo.title : "",
                    author: data.items[0].volumeInfo.authors[0] ? data.items[0].volumeInfo.authors[0] : "",
                    publisher: data.items[0].volumeInfo.publisher ? data.items[0].volumeInfo.publisher : "",
                    isbn: data.items[0].volumeInfo.industryIdentifiers[0].identifier ? data.items[0].volumeInfo.industryIdentifiers[0].identifier : "",
                    image: data.items[0].volumeInfo.imageLinks ? `${data.items[0].volumeInfo.imageLinks.thumbnail}` : "",
                    description: data.items[0].volumeInfo.description ? data.items[0].volumeInfo.description : ""
                })
            }
        } catch (e) {
            console.log(e.response);
            toast("Não foi possível encontrar o livro!")
        }
    }

    async function addBook(e) {
        e.preventDefault();

        const data = localStorage.getItem("userInfo");
        const userInfo = JSON.parse(data)
        const { token, userId } = userInfo;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          } 
        }
        
        try {
            const book = {
                title: element.title,
                author: element.author,
                publisher: element.publisher,
                description: element.description,
                conservationState: element.conservationState,
                conservationStateDescription: element.conservationStateDescription,
                image: element.image,
                price: element.price,
                isbn: element.isbn,
                available: true,
                isFromExchange: true,
                userId
            }
            console.log("hey")
            await axios.post(`${process.env.REACT_APP_API_URL}/books/register`, book, config);
            navigate("/exchanges");
        }catch(error) {
            console.log(error.response);
        }
        
    }

    return (
        <Container>
            <Box>
                <SearchIsbn>
                    <input type="text" placeholder="Digite aqui p código isbn" value={isbn} required onChange={(e) => setIsbn(e.target.value)} />
                    <GoSearch onClick={getBookInfo} />
                </SearchIsbn>

                <form onSubmit={addBook}>
                    <input type="text" placeholder="Título" required value={element.title} onChange={(e) => setElement({...element, title: e.target.value})} />
                    <input type="text" placeholder="Autor" required value={element.author} onChange={(e) => setElement({...element, author: e.target.value})} />
                    <input type="text" placeholder="Editora" required value={element.publisher} onChange={(e) => setElement({...element, publisher: e.target.value})} />
                    <input type="text" placeholder="ISBN" required value={element.isbn} onChange={(e) => setElement({...element, isbn: e.target.value})} />
                    <input type="url" placeholder="Imagem" required value={element.image} onChange={(e) => setElement({...element, image: e.target.value})} />
                    <textarea type="text" placeholder="Description" required value={element.description} onChange={(e) => setElement({...element, description: e.target.value})} />
                    <select value={element.conservationState} onChange={(e) => setElement({...element, conservationState: e.target.value})} required>
                        <option>Selecione</option>
                        <option value="new">Novo</option>
                        <option value="used">Usado</option>
                    </select>
                    <textarea type="text" placeholder="Estado de conservação" required value={element.conservationStateDescription} onChange={(e) => setElement({...element, conservationStateDescription: e.target.value})} />
                    <input type="text" placeholder="Preço" required value={element.price} onChange={(e) => setElement({...element, price: e.target.value})} />

                    <button type="submit">Registrar livro</button>
                </form>
            </Box>
        </Container>
    )
}

export default ExchangeRegister;

const Container = styled.div`
    margin-top: 120px;
    padding: 30px;
    
    @media (min-width: 504px) {
        padding: 10%;
    }

    @media (min-width: 800px) {
        padding: 15%;
    }

    @media (min-width: 1000px) {
        padding: 20%;
    }

    @media (min-width: 1168px) {
        padding: 23%;
    }

    @media (min-width: 1280px) {
        padding: 25%;
    }
`;

const Box = styled.div`
    padding: 30px;
    background-color: #F3F3F3;
    display: flex;
    flex-direction: column;
    align-items: center;

    form {
        display: flex;
        flex-direction: column;
    }

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

    textarea {
        width: 326px;
        height: 40px;
        background: #FFFFFF;
        border: none;
        margin-bottom: 13px;
        padding-left: 15px;
        padding-top: 15px;

        :focus {
            outline: none !important;
            border:1px solid #575759;
        }
    }

    select {
        width: 80px;
        margin-bottom: 15px;
        border: none;
        background-color: #929292;
        color: #FFFFFF;
        border-radius: 2px;
        height: 25px;

        :hover {
            cursor: pointer;
            background-color: #FF914C;
        }

        :focus {
            outline: none !important;
            border:1px solid #575759;
        }
    }

    button {
        width: 60%;
        height: 40px;
        border: none;
        border-radius: 2px;
        background-color: #FF914C;
        color: #FFFFFF;
        font-size: 16px;
        font-weight: 600;
        margin: 0 auto;

        :hover {
            cursor: pointer;
        }

        :focus {
            outline: none !important;
            border:1px solid #575759;
        }

    }

    @media (min-width: 504px) {
        padding: 10%;
    }
`;

const SearchIsbn = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    
    input {
        width: 200px;
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

    svg {
        width: 20px;
        height: 20px;
        margin-top: 10px;
        cursor: pointer;
    }
`;