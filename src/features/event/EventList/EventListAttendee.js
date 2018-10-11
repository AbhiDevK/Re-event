import React, { Component } from "react";
import { List, Image } from "semantic-ui-react";

class EventListAttendee extends Component {
  render() {
    // Destructure attendee from props
    const { attendee } = this.props;
    return (
      <List.Item>
        {/* Use the attendee values */}
        <Image as="a" size="mini" circular src={attendee.photoURL} />
      </List.Item>
    );
  }
}
export default EventListAttendee;
