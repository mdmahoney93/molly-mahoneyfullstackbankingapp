import React, { useContext, useState } from "react";
import {
  Container,
  Button,
  Table,
  Card,
  Row,
  ListGroup,
} from "react-bootstrap";

import { AllUsersContext } from "../UsersContext";

const AllData = () => {
  const [updateList, setUpdateList] = useContext(AllUsersContext);

  console.log(updateList);
  //const [userList, setUserList] = React.useState(users);
  //console.log(userList);

  return (
    <div>
      <Card style={{ width: "80%" }}>
        <Card.Body>
          <Card.Title>All User Data</Card.Title>
          <Card.Text>
            <Table responsive striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Balance</th>
                  <th>Logged In</th>
                </tr>
              </thead>
              <tbody>
                {updateList.map((user, i) => (
                  <tr>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>$ {user.balance}</td>
                    <td>{user.token ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
      <Container>
        <Row>
          {updateList.map((user, i) => (
            <Card style={{ width: "30%", "margin-bottom": "20px" }}>
              <Card.Body>
                <Card.Title>
                  {
                    <h3>
                      {user.firstName} {user.lastName}
                    </h3>
                  }
                </Card.Title>
                <Card.Text>
                  {
                    <div>
                      Current Balance $ {user.balance}
                      <br />
                      <br />
                      <li className="list-group-item">Transaction History</li>
                      {user.transactions.map((trans, i) => (
                        <li className="list-group-item">{trans}</li>
                      ))}
                    </div>
                  }
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
          <br />
          <br />
        </Row>
        <br />
        <br />
      </Container>
    </div>
  );
};

export default AllData;
