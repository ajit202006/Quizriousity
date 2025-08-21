import ListWrapper from "./ListWrapper";

interface UserInterface {
    _id: string,
    name: string,
    email: string,
    createdQuizCount: number,
    attemptedQuizCount: number,
    passedCount: number
}

interface UserListProps{
    users:Array<any>;
}
const UserList = (props:UserListProps) => {
    const userList = props.users.map((user: UserInterface) => {
        return (
            <li id={user._id}>
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