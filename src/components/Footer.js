import React from 'react'
import PropTypes from 'prop-types'
import { Container , Row, Col} from 'react-bootstrap';

const Footer = props => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                    <b> Copyright &copy; E-Shop </b>
                    </Col>
                </Row>
            </Container>
            
        </footer>
    )
}


export default Footer
