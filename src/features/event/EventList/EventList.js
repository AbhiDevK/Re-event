import React, { Component } from "react";
import EventListItem from "./EventListItem";
class EventList extends Component {
  render() {
    // Destructure the events from props
    const { events, handleOpenEvent, handleDeleteEvent } = this.props;
    return (
      <div>
        <h1>Event list</h1>
        {/* For each event passed creat an EventListItem */}
        {events.map(event => (
          <EventListItem
            key={event.id}
            /* pass each event data with it */
            event={event}
            handleOpenEvent={handleOpenEvent}
            handleDeleteEvent={handleDeleteEvent}
          />
        ))}
      </div>
    );
  }
}
export default EventList;
