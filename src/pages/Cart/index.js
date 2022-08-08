import axios from "axios";
import { useEffect, useState } from "react";

function Cart() {
    const [books, setBooks] = useState([]);

    const userData = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userData);
    const { token, userId } = userInfo;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      } 
    }
    useEffect(() => {
        async function getUserCart() {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/cart`, config);
                setBooks([...books, data]);
            } catch (error) {
                console.log(error.response);
            }
        }
        getUserCart();
    }, []);

    console.log(books)
    return <h1>I'm cart page</h1>
}

export default Cart;