import React from "react";
import Transaction from "./hooks/Transaction";
import { NavLink } from "react-router-dom";
import {Button} from 'react-bootstrap'

const Deposit = () => {


  
  return (
    <div>
    <Transaction mode="Deposit" isDeposit={true} />
  </div>
  );
};

export default Deposit;
