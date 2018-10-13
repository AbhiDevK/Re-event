import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from "cuid";

const eventsDashboard = [
  {
    id: "1",
    title: "Trip to Tower of London",
    date: "2018-03-27",
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
    date: "2018-03-28",
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
    events: eventsDashboard /* all the events state */,
    isOpen: false /* To keep track of form state */,
    selectedEvent: null /*To keep track of the selected event which needs to be updated */
  };

  //To open the form
  handleFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedEvent: null /* set selected Event to Null when new form is created(using Create Form Button) */
    });
  };
  //To close the form
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

  //1. receive the event that needed to be updated
  handleOpenEvent = eventToOpen => () => {
    //2. change the state of selectedEvent from NULL to eventToOpen and open the form
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    });
  };

  // Handle the updated Events, pass the updated event from the form
  handleUpdateEvent = updatedEvent => {
    // Change the state
    this.setState({
      // Map over all the existing events
      // Check the each Event.Id with the passed updatedEvent.id
      events: this.state.events.map(event => {
        if (event.id === updatedEvent.id) {
          // if true, take a copy of the current event to updated(updatedEvent) and return it
          //ES6 Method
          // const updated = { ...updatedEvent };
          // return updated;
          // ES5 Method
          return Object.assign({}, updatedEvent);
        } else {
          //or-else id doesn't match so return the event
          return event;
        }
      }),
      isOpen: false,
      selectedEvent: null
    });
  };

  // Delete the individual events
  handleDeleteEvent = eventId => () => {
    //1. Take in the id of event to be deleted and filter it with comparing every event in the state
    //2. store the filtered/remaining events other than deleted event
    const updatedEvents = this.state.events.filter(
      event => event.id !== eventId
    );

    //3. Update the state with the filtered events
    this.setState({
      events: updatedEvents
    });
  };
  render() {
    const { selectedEvent } = this.state;
    /* take the selectedEvent from state */
    return (
      <Grid>
        <Grid.Column width={10}>
          {/* Event List Block */}
          <EventList
            events={this.state.events}
            handleOpenEvent={this.handleOpenEvent}
            handleDeleteEvent={this.handleDeleteEvent}
          />
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
              /* send the selected event to the form */
              selectedEvent={selectedEvent}
              handleUpdateEvent={this.handleUpdateEvent}
            />
          )}
          {/* Event List Form */}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;
