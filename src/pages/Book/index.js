import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { TbTruckDelivery } from "react-icons/tb";
import { FiHelpCircle } from "react-icons/fi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
toast.configure();

function Book() {
    const { bookId } = useParams();
    const [book, setBook] = useState({});
    const [bookData, setBookData] = useState(true);
    const navigate = useNavigate();

    const userData = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userData);
    
    let token = "";
    let userId;
    if (userInfo !== null) {
        token = userInfo.token;
        userId = userInfo.userId;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      } 
    }

    useEffect(() => {
        async function getBook() {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/books/${bookId}`);
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
            toast("Operação não realizada");
        }
    }

    console.log(book)
    return Object.keys(book).length > 0 ? (
        <Container>
            <Box>
                <BookCover>
                    <Cover src={book.image} />
                </BookCover>
                <BookInfo>
                    <p className="title">{book.title}</p>
                    <Status color={book.conservationState === "used" ? "#fc930a" : "#29de02"} >{book.conservationState === "used" ? "USADO" : "NOVO"}</Status>
                    <p className="price">R$ {book.price}</p>
                    {userId !== book.userId ? <button onClick={() => {
                        if (token.length === 0) navigate("/signin"); else addBookToCart(book); 
                    }}>Adicionar ao carrinho</button> : ""}
                    
                    <Wishlist>
                        <IoIosHeartEmpty />
                        <p>Adicionar aos favoritos</p>
                    </Wishlist>

                    <Info>
                        <div className="delivery">
                            <TbTruckDelivery />
                            <p>Frete grátis</p>
                        </div>
                        <div className="help">
                            <FiHelpCircle />
                            <p>Suporte 24 horas por dia</p>
                        </div>
                        <div className="safe">
                            <AiOutlineSafetyCertificate />
                            <p>Não ficou satisfeito com o produto? Devolva em até 30 dias </p>
                        </div>
                    </Info>
                </BookInfo>                
            </Box>
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
    ) : <DivLoading>
            <RotatingLines strokeColor="#FF914C" />
        </DivLoading>
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

    @media (min-width: 420px) {
        padding: 15%;
    }

    @media (min-width: 800px) {
        padding: 20%;
        margin-top: 70px;
    }

    @media (min-width: 948px) {
        padding: 10%;
        margin-top: 50px;
    }
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
    position: relative;

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
        background-color: #FF914C;
        border: none;
        border-radius: 2px;
        color: #FFFFFF;
        text-align: center;
        font-weight: 600;
        margin-top: 20px;
        font-size: 15px;

        :hover {
            cursor: pointer;
        }
    }

    @media (min-width: 948px) {
        display: flex;
        flex-direction: column;
        padding-top: 50px;
        padding-left: 20px;
        border: 1px;
        border-style: solid;
        border-color: #F1F1F1;
        margin-top: 0px;
        margin-left: 30px;

        button {
            width: 55%;
            margin-top: 50px;
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
    
    :hover {
        color: #FF914C;
    }
`; 

const DescriptionTitle = styled.p`
    cursor: pointer;
    color: ${(props) => props.color};

    :hover {
        color: #FF914C;
    }
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

const Box = styled.div`
    width: 100%;

    @media (min-width: 948px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Info = styled.div`
    margin-top: 35px;
    padding-right: 15px;

    div {
        display: flex;
    }

    p {
        margin-left: 15px;
        margin-top: 15px;
    }

    svg {
        color: #FF914C;
        width: 50px;
        height: 50px;
        margin-bottom: 20px;
    }

    @media (max-width: 947px) {
        border: 1px;
        border-style: solid;
        border-color: #F1F1F1;
        margin-top: 60px;
        padding: 15px;
    }
`;

const Wishlist = styled.div`
    display: flex;
    position: absolute;
    margin-top: 20px;
    
    :hover {
        color: #FF914C;
        cursor: pointer;
    }

    p {
        margin-left: 5px;
        font-weight: 500;
        font-size: 14px;
    }

    svg {
        color: #000;
        width: 14px;
        height: 14px;
    }

    @media (min-width: 948px) {
        right: 60px;
        top: 220px;

        p {
            margin-left: 5px;
            font-weight: 500;
            font-size: 12px;
        }

        svg {
            color: #000;
            width: 12px;
            height: 12px;
        }
    }
`;

const DivLoading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;   
    width: 100%;
    height: 100vh;
`;