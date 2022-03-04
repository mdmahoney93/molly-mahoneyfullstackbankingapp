import React, { useContext } from "react";
import { Alert } from "react-bootstrap";

import UserProvider, { UserContext } from "./UserContext";

// Components
import Card from "./components/Card";

//Image
import BankImage from "./images/bank.png";

const Home = () => {
  const [user, setUser] = useContext(UserContext);
  return (
    <div>
      {user.firstName ? (
        <div>
          <Alert variant="info">Hello, {user.firstName}</Alert>
        </div>
      ) : (
        ""
      )}
      <Card
        bgcolor="dark"
        header="Welcome to MDM Banking!"
        title="Bank Smart not Hard"
        text="Create an account or login now to start banking with us!"
        body={<img src={BankImage} className="img-fluid" alt="bank logo" />}
      />
    </div>
  );
};

export default Home;
