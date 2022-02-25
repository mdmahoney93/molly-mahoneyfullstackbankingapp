import React from "react";
import userList from "./users.json"
export const AllUsersContext = React.createContext([userList]);

const AllUsers = ({children}) => {

const [allUsers, setAllUsers] = React.useState(userList)

  return (
    <AllUsersContext.Provider value={[allUsers, setAllUsers]}>
      {children}
    </AllUsersContext.Provider>
  );
};

export default AllUsers;
