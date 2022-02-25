import React from "react";
import Transaction from "./hooks/Transaction";
const Withdraw = () => {
  return <Transaction mode="Withdraw" isDeposit={false}/>;
};

export default Withdraw;
