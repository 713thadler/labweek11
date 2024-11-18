// src/components/PersonList.js

import React, { Component } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';

class PersonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get('https://randomuser.me/api/?results=10')
      .then((res) => {
        console.log(res.data);
        const persons = res.data.results;
        this.setState({ persons, isLoading: false });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({ error, isLoading: false });
      });
  }

  render() {
    const { persons, isLoading, error } = this.state;

    if (isLoading) {
      return <Container><p>Loading...</p></Container>;
    }

    if (error) {
      return <Container><p>Error fetching data.</p></Container>;
    }

    return (
      <Container className="mt-4">
        <h2>Person List</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{`${person.name.title} ${person.name.first} ${person.name.last}`}</td>
                <td>{person.email}</td>
                <td>{person.phone}</td>
                <td>
                  <img
                    src={person.picture.thumbnail}
                    alt="Person Thumbnail"
                    className="rounded-circle"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default PersonList;
