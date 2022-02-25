import React from 'react';
import { AllUsersContext } from "../UsersContext";
const useUpdateUserList = (newUser)=>{
    const [allUsers, setAllUsers] = React.useContext(AllUsersContext);
    setAllUsers(newUser);
    return;
}

export default useUpdateUserList;