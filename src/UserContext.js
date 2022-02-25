import React from "react";

const userTemplate =   {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  balance: 0,
  transactions: [],
  token: null,
}
export const UserContext = React.createContext(userTemplate);
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(UserContext);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
