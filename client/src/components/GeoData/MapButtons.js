import React from 'react'
import { Container, Button, ButtonToolbar } from 'react-bootstrap'
import './MapButtons.css'

/**
 * MapButtons - creates component to display buttons on the map page.
 * @param {Object} - props - an object with call back functions to use by buttons.
                   - plus showDataTableButton props which helps
                   - hide or show data table on the GeoData page.
 * @return {any} - a React component with Bootstrap buttons.
 */
const MapButtons = ({
  showDataTableButton,
  onClickImpressions,
  onClickRevenue,
  onClickClicks,
  onClickEvents,
  onClickTable
}) => {

  return (
    <Container className='buttonContainer align-items-center'>
      <h5 className='title'>Click to show data / tabel</h5>
      <ButtonToolbar className='justify-content-center button align-items-center'>
        <Button
          className='button buttonImpressionsMap size="sm"'
          onClick={onClickImpressions}
        >Impressions</Button>
        <Button
          className='button buttonRevenueMap size="sm"'
          onClick={onClickRevenue}
        >Revenue</Button>
        <Button
          className='button buttonClicksMap size="sm"'
          onClick={onClickClicks}
        >Clicks</Button>
        <Button
          className='button buttonEventsMap size="sm"'
          onClick={onClickEvents}
        >Events</Button>
        { showDataTableButton &&
          <Button
            className='button buttonMapTable size="sm"'
            onClick={onClickTable}
          >Data Table</Button>
        }
      </ButtonToolbar>
    </Container>
  )
}

export default MapButtons
