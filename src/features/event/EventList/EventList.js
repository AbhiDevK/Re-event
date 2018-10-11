import React, { Component } from "react";
import EventListItem from "./EventListItem";
class EventList extends Component {
  render() {
    // Destructure the events from props
    const { events } = this.props;
    return (
      <div>
        <h1>Event list</h1>
        {/* For each event passed creat an EventListItem */}
        {events.map(event => (
          <EventListItem
            key={event.id}
            /* pass each event data with it */
            event={event}
          />
        ))}
      </div>
    );
  }
}
export default EventList;
