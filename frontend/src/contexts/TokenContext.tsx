import { useState, createContext } from "react";

interface TokenContextInterface {
    token: string|null,
    userId: string|null,
    setToken: React.Dispatch<React.SetStateAction<string|null>>
    setUserId: React.Dispatch<React.SetStateAction<string|null>>
}

const TokenContext = createContext<TokenContextInterface>({
    token: "",
    userId:"",
    setToken: () => { },
    setUserId: () => { },
});

const ContextToken = (props: any) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    return (
        <TokenContext value={{ token, setToken,userId, setUserId }}>
            {props.children}
        </TokenContext>
    );
}

export { ContextToken };
export default TokenContext;