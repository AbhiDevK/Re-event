import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import  cuid  from "cuid";

const eventsDashboard = [
  {
    id: "1",
    title: "Trip to Tower of London",
    date: "2018-03-27T11:00:00+00:00",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ]
  },
  {
    id: "2",
    title: "Trip to Punch and Judy Pub",
    date: "2018-03-28T14:00:00+00:00",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    hostedBy: "Tom",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    attendees: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      }
    ]
  }
];

class EventDashboard extends Component {
  state = {
    events: eventsDashboard,
    isOpen: false
  };

  handleFormOpen = () => {
    this.setState({
      isOpen: true
    });
  };
  handleCancel = () => {
    this.setState({
      isOpen: false
    });
  };

  //Create a new Event
  handleCreateEvent = newEvent => {
    //1. add an unique ID
    newEvent.id = cuid();
    //2. add default photo
    newEvent.hostPhotoURL = "/assets/user.png";
    //3. take the previous events and add the new event to it
    const updatedEvents = [...this.state.events, newEvent];
    //4. update the state with updated event
    this.setState({
      events: updatedEvents,
      isOpen: false
    });
  };

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          {/* Event List Block */}
          <EventList events={this.state.events} />{" "}
          {/*Passing the Dummy Events */}
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            positive
            content="create form"
            onClick={this.handleFormOpen}
          />
          {this.state.isOpen && (
            <EventForm
              handleCreateEvent={this.handleCreateEvent}
              handleCancel={this.handleCancel}
            />
          )}
          {/* Event List Form */}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;
