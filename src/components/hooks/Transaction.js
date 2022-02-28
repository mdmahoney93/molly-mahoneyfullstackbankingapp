import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

import Card from "../Card";

import UserProvider, { UserContext } from "../../UserContext";

const Transaction = (props) => {
  // let deposit = 0; // state of this transaction
  //console.log("UserProvider: " + transactionContext;
  const [user, setUser] = useContext(UserContext);
  let balance = user.balance;
  let transactions = user.transactions;
  let firstName = user.firstName;
  console.log(user.firstName);
  console.log(firstName);

  const [deposit, setDeposit] = useState(0);

  const [isDeposit, setIsDeposit] = useState(props.isDeposit);
  const [atmMode, setAtmMode] = useState(props.mode);
  const [error, setError] = useState("");
  const [validTransaction, setValidTransaction] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const allDeposits = [];

  const toggleShowAllTransactions = () => {
    setShowAllTransactions(showAllTransactions ? false : true);
  };

  let status = `Account Balance $ ${user.balance} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  console.log(`pre ATMDeposit atmMode: ${atmMode}`);

  const handleChange = (event) => {
    console.log(event.target.value);

    if (!event.target.value) {
      return setValidTransaction(false);
    }
    if (!Number(event.target.value)) {
      setError("Enter numbers only");
      setTimeout(() => setError(""), 3000);

      return setValidTransaction(false);
    }
    if (Number(event.target.value < 0)) {
      setError("Enter a positive number");
      setTimeout(() => setError(""), 3000);

      return setValidTransaction(false);
    }

    if (atmMode === "Withdraw" && Number(event.target.value) > balance) {
      setError("You don't have enough money for this withdrawal");
      setTimeout(() => setError(""), 3000);
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event, allDeposits, isDeposit) => {
    let newTotal = isDeposit ? user.balance + deposit : user.balance - deposit;
    let thisTransaction = isDeposit
      ? `Deposit $${deposit}`
      : `Withdrawal $${deposit}`;
    allDeposits = transactions;
    allDeposits.unshift(thisTransaction); //allDeposits is pulled from the user context balaence
    let currentUser = user;
    currentUser.transactions = transactions;
    currentUser.balance = newTotal;
    setError("Transaction was successful!");
    setTimeout(() => setError(""), 3000);
    setUser(currentUser);
    setValidTransaction(false);
    event.target.value = "";
    event.preventDefault();
    return allDeposits;
  };

  function ATMDeposit(onChange, atmMode, isValid) {
    console.log(`ATMDeposit atmMode: ${atmMode}`);
    return (
      <div className="mb-3">
        <label className="form-label"> </label>
        <input
          id="number-input"
          type="text"
          value=""
          width="80"
          onChange={onChange}
        ></input>
        <input
          type="submit"
          disabled={!isValid}
          width="80"
          value={`Make A ${atmMode === "Deposit" ? atmMode : `${atmMode}al`}`}
          id="submit-input"
        ></input>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 col-md-4">
          <Card
            id="transaction-card"
            key="transaction-card"
            bgcolor="light"
            header={status}
            title={atmMode === "Deposit" ? atmMode : `${atmMode}al`}
            status={error}
            text=""
            body={
              <form
                onSubmit={(e) => {
                  handleSubmit(e, allDeposits, isDeposit);
                }}
              >
                <div className="mb-3">
                  <label className="form-label"> </label>
                  <input
                    id="number-input"
                    type="text"
                    onChange={handleChange}
                  ></input>
                  <br />
                  <br />
                  <Button
                    variant="light"
                    type="submit"
                    disabled={!validTransaction}
                    id="submit-input"
                  >{`Make A ${
                    atmMode === "Deposit" ? atmMode : `${atmMode}al`
                  }`}</Button>
                </div>
              </form>
            }
          />
          <NavLink to={atmMode === "Deposit" ? "/withdraw" : "/deposit"}>
            <Button className="btn-info col-lg-11 choice-btn" variant="primary">
              Need to make a {atmMode === "Deposit" ? "Withdrawal" : "Deposit"}{" "}
              instead?
            </Button>
          </NavLink>
        </div>
        <div className="col-12 col-md-8">
          <ul className="list-group list-group-flush transaction-log">
            <li className="list-group-item" key="title">
              {console.log(transactions.length)}
              {transactions.length === 0 ? (
                <Alert variant="light">
                  No transactions to show yet. Try depositing some money!
                </Alert>
              ) : !showAllTransactions && transactions.length > 7 ? (
                "Showing last 7 Transactions"
              ) : (
                "Showing All Transactions"
              )}

              <Button
                className="show-all-button"
                hidden={transactions.length < 8}
                variant="light"
                onClick={toggleShowAllTransactions}
              >
                {showAllTransactions && transactions.length > 7
                  ? "Show less"
                  : "Show more"}
              </Button>
            </li>

            {showAllTransactions
              ? transactions.map((trans, i) => (
                  <li className="list-group-item" key={i}>
                    {trans}
                  </li>
                ))
              : transactions.map(
                  (trans, i) =>
                    i < 7 && (
                      <li className="list-group-item" key={i}>
                        {trans}
                      </li>
                    )
                )}
          </ul>
        </div>

        <div className="notification-container"></div>

        <div>
          <div
            id="balance-warning"
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto">OOPS!!!</strong>
              <small>now</small>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">
              You don't have enough funds for that Withdrawal.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
