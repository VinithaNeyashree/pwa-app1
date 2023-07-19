import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
const Users = () => {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("online");
  useEffect(() => {
    let url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((response) => {
        response.json().then((result) => {
          console.warn(result);
          setData(result);
          localStorage.setItem("users", JSON.stringify(result));
        });
      })
      .catch((error) => {
        setMode("offline");
        let collection = localStorage.getItem("users");
        setData(JSON.parse(collection));
      });
  }, []);
  return (
    <>
      <div>
        <div>
          {mode === "offline" ? (
            <div class="alert alert-warning" role="alert">
              You Are In Offline Mode or Some issue with connection
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address.street}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Users;
