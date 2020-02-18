import React from 'react'
import { Container, Button, ButtonToolbar } from 'react-bootstrap'
import './Buttons.scss'

/**
 * Buttons - creates component to display buttons on the app pages.
 * @param {Object} - props - an object with call back functions to use by buttons.
                   - plus showDataTableButton props which helps
                   - hide or show data table on the GeoData page.
 * @return {any} - a React component with Bootstrap buttons.
 */
const Buttons = ({
  onClickImpressions,
  onClickRevenue,
  onClickClicks,
  onClickEvents,
  onClickTable
}) => {

  return (
    <Container className='buttonContainer align-items-center'>
      <h5 className='title'>Click to remove / add data</h5>
      <ButtonToolbar className='justify-content-center button align-items-center'>
        <Button
          className="button buttonImpressions size='sm'"
          onClick={ onClickImpressions }
        >Impressions</Button>
        <Button
          className="button buttonRevenue size='sm'"
          onClick={ onClickRevenue }
        >Revenue</Button>
        <Button
          className="button buttonClicks size='sm'"
          onClick={ onClickClicks }
        >Clicks</Button>
        <Button
          className="button buttonEvents size='sm'"
          onClick={ onClickEvents }
        >Events</Button>
      </ButtonToolbar>
    </Container>
  )
}

export default Buttons
