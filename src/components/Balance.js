import React, { useContext, useState } from "react";
import Card from "./Card";
import UserProvider, { UserContext } from "../UserContext";

const Balance = () => {
  const [user, setUser] = useContext(UserContext);
  let balance = user.balance;
  let transactions = user.transactions;
  const [prevTransactions, setPrevTransactions] = useState(transactions);
  const [totalState, setTotalState] = useState(balance);
  return (
    <Card
      bgcolor="dark"
      header="BadBank Balance"
      title="Snapshot of your balance"
      text={
        user.transactions.length == 0
          ? "No Transactions Yet"
          : user.transactions.length == 1
          ? "Initial Deposit"
          : "Total in your account"
      }
      body={"$" + user.balance}
    />
  );
};

export default Balance;
