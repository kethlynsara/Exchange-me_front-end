import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    font-family: "Inter",Helvetica,Arial,sans-serif;
    color: #161619;
    
    button {
        cursor: pointer;
    }

    svg {
        :hover {
            cursor: pointer;
        }
    }
`;
