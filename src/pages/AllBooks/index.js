import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

function AllBooks() {
    const { bookStatus } = useContext(UserContext);
    console.log("all books page useState", bookStatus)
    return <h1>All books page</h1>
}

export default AllBooks;