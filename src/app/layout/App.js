import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";

class App extends Component {
  render() {
    return (
      <div>
        {/*App Component Structure*/}
        {/* NavBar */}
        <NavBar />
        <Container className="main">
          {/* Main Dash Board */}
          <EventDashboard />
        </Container>
      </div>
    );
  }
}

export default App;
