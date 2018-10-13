import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";

// keeping track of the each input form fields with state
//start with an empty object(empty event)
const emptyEvent = {
  title: "",
  date: "",
  city: "",
  venue: "",
  hostedBy: ""
};

class EventForm extends Component {
  //set the state initially to emptyEvent
  state = {
    event: emptyEvent
  };

  //1. set the state to the passed selectedEvent the event state
  componentDidMount() {
    //check weather selectedEvent present then set the state
    if (this.props.selectedEvent) {
      this.setState({
        event: this.props.selectedEvent
      });
    }
  }

  //2. re-render form everytime props changes in the component
  componentWillReceiveProps(nextProps) {
    //check weather props is actually changed
    if (nextProps.selectedEvent !== this.props.selectedEvent) {
      //if changed change the state to changed props
      //and fallback to emptyEvent(or-else when we click (Create Form) state will set to Null and we can't access any property from those)
      this.setState({
        event: nextProps.selectedEvent || emptyEvent
      });
    }
  }

  handleFormSubmit = e => {
    e.preventDefault();
    //only the already created forms have an id and newly creating forms doesn't so
    //1. if id exists call UpdateEvent with that event passed
    if (this.state.event.id) {
      this.props.handleUpdateEvent(this.state.event);
    }
    //2. if id not der means its a new form being created so call createEvent
    else {
      this.props.handleCreateEvent(this.state.event);
    }
    e.currentTarget.reset()
  };
  // On input changes update the state with taking a copy of state
  onInputChange = e => {
    //1. take a copy of the state
    const newEvent = this.state.event;
    //2. update the state with current element using name property of the input
    newEvent[e.target.name] = e.target.value;
    //3. update the state
    this.setState({
      event: newEvent
    });
  };
  render() {
    const { handleCancel } = this.props;
    const { event } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              onChange={this.onInputChange} /* change the state with onChange */
              value={event.title} /*add the value */
              name="title" /* add the name to keep track of input */
              placeholder="Event Title"
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              onChange={this.onInputChange}
              value={event.date}
              name="date"
              type="date"
              placeholder="Event Date"
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              onChange={this.onInputChange}
              value={event.city}
              name="city"
              placeholder="City event is taking place"
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              onChange={this.onInputChange}
              value={event.venue}
              name="venue"
              placeholder="Enter the Venue of the event"
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              onChange={this.onInputChange}
              value={event.hostedBy}
              name="hostedBy"
              placeholder="Enter the name of person hosting"
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}
export default EventForm;
