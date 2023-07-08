import './Error.css'
import PropTypes from 'prop-types'

const Error = ({ error }) => {
    return (
        <p className='message'>{error}</p>
    )
}


export default Error

Error.propTypes = {
    error: PropTypes.string.isRequired
}