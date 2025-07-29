import React, { useState } from 'react';
import { Header } from '../header_footer/header';
import { Button, Container, Row, Col } from 'react-bootstrap';
import cancel from '../../images/Done.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Backend_url } from '../../constant';

const formatOrderId = (id) => {
  // Format the ID into groups of 4 digits
  return id.match(/.{1,4}/g).join(' ');
};

const CancelOrder = () => {
  const [orderCancelled, setOrderCancelled] = useState(false);
  const orderId = '3354654654526';
  const formattedOrderId = formatOrderId(orderId);
const {id} = useParams()
  const handleCancelOrder = () => {
    // Set orderCancelled to true to display the success message
    const CancelOrder = () => {
      const data = { orderStatus: 'Canceled' }
      axios.put(`${Backend_url}/api/admin/update/order/${id}`, data)
    }
    setOrderCancelled(true);
  };

  return (
    <div>
      <Header label={'Cancel Order'} />
      <Container className="mt-5">
        {orderCancelled ? (
          <Row className="text-center mt-5">
            <Col>
              <img src={cancel} alt="Order Cancelled" className="img-fluid mb-4" style={{ maxWidth: '80%' }} />
              <h2 className="mt-4">Your Order has been cancelled successfully</h2>
              <Link to='/customer'>
                <button className="btn btn-dark w-50 text-white" style={{ backgroundColor: '#501924', borderRadius: '5px', marginTop: '20%', width: '40%' }}>
                    Done
                </button>
            </Link>
            </Col>
          </Row>
        ) : (
          <>
            <Row>
              <Col>
                <h5>Order ID: {formattedOrderId}</h5>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
              <textarea data-type="text" className="border border-dark" style={{ height: '300px', width: '100%' }}></textarea>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="text-center">
                <Button variant="danger" className="mt-3" onClick={handleCancelOrder}>
                  Cancel Order
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default CancelOrder;