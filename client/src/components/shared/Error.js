import React from 'react'
import { Alert } from 'react-bootstrap'

/**
 * RateError - creates React component to display message when rate limit exceeded.
 * @return {any} - a React alert component with error message.
 */
const Error = ({ errorMessage }) => {
  return (
      <Alert variant={ 'danger' }>
        { errorMessage }
      </Alert>
    )
}

export default Error
