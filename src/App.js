import React from 'react';
import { Component } from "react";
import logo from './logo.svg';
import './App.css';
import Myriorama from './Myriorama';
import { Button, Container, Row, Col } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);


    this.state = {
      inRoom: false,
    }

    // bind functions
    this.initRoom = this.initRoom.bind(this);
  }


  initRoom() {
    this.drone = new window.Scaledrone('pp6UqZjBbcWHW77o', {
      data: {
        datetime: new Date(),
      }
    });
    this.setState({ inRoom: true });
  }

  render() {
    if (this.state.inRoom) {
      return (
        <Myriorama
          drone={this.drone}
        />
      );
    }
    return (
      <div className="App">
        <Button
          onClick={this.initRoom}
        >
          Enter Room
        </Button>
      </div>
    );
  }
}

export default App;
