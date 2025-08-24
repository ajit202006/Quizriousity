import { useNavigate } from "react-router-dom";
import ListWrapper from "./ListWrapper";

interface UserInterface {
    _id: string,
    name: string,
    email: string,
    createdQuizCount: number,
    attemptedQuizCount: number,
    passedCount: number
}

interface UserListProps {
    users: Array<any>;
}

const UserList = (props: UserListProps) => {
    const navigate = useNavigate();
    const userList = props.users.map((user: UserInterface) => {
        return (
            <li id={user._id} key={user._id} onClick={() =>navigate(`/users/${user._id}`)}>
                {user.name}
            </li>
        );
    });

    return (
        <ListWrapper>
            {userList.length ? userList : "No user found."}
        </ListWrapper>
    );
}

export default UserList;