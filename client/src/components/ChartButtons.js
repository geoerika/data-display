import React from 'react';
import { Container, Button, ButtonToolbar } from 'react-bootstrap';
import './ChartButtons.css';

function ChartButtons(props) {

  return (
    <Container className="buttonContainer align-items-center">
      <h5 className="title">Click to remove/add data</h5>
      <ButtonToolbar className="justify-content-center button align-items-center">
        <Button
          className="buttonImpressions"
          onClick={props.onClickImpressions}
        >Impressions</Button>
        <Button
          className="buttonRevenue"
          onClick={props.onClickRevenue}
        >Revenue</Button>
        <Button
          className="buttonClicks"
          onClick={props.onClickClicks}
        >Clicks</Button>
        <Button
          className="buttonEvents"
          onClick={props.onClickEvents}
        >Events</Button>
      </ButtonToolbar>
    </Container>
  )
}

export default ChartButtons;