import React, { useEffect } from "react";
import { Col, Row, Image, Button, ListGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../components/Message";
import CheckOutSteps from "./../components/CheckOutSteps";
import { Link } from "react-router-dom";
import { createOrder } from "./../actions/orderActions";
const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const addDecimal = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	cart.itemsPrice = addDecimal(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);
	cart.shippingPrice = addDecimal(cart.itemsPrice > 100 ? 0 : 10);
	cart.taxPrice = addDecimal(Number((0.15 * cart.itemsPrice).toFixed(2)));
	cart.totalPrice =
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice);
	const placeOrderHandler = (e) => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};

	const { order, success, error } = useSelector((state) => state.orderCreate);

	useEffect(() => {
		if (success) {
			history.push(`/orders/${order._id}`);
		}
		// eslint-disable-next-line
	}, [history, success]);
	return (
		<>
			<CheckOutSteps step1 step2 step3 step4 active={4} />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h4>Shipping</h4>
							<ListGroup.Item style={{ border: "none", paddingLeft: "0px" }}>
								{shippingAddress.address},{shippingAddress.city},
								{shippingAddress.postalCode},{shippingAddress.country}
							</ListGroup.Item>

							<ListGroup.Item style={{ border: "none", paddingLeft: "0px" }}>
								<h4>Payment Method</h4>
								<strong> Method : </strong>
								{cart.paymentMethod}
							</ListGroup.Item>
						</ListGroup.Item>
					</ListGroup>

					{cart.cartItems.length === 0 ? (
						<Message>Cart is Empty</Message>
					) : (
						<ListGroup variant="flush">
							{cart.cartItems.map((item, index) => (
								<ListGroup.Item key={index}>
									<Row>
										<Col md={1}>
											<Image
												src={item.image}
												alt="Item Image"
												fluid
												rounded
											></Image>
										</Col>
										<Col>
											<Link src={item.name} to={`/product/${item.product}`}>
												{item.name}
											</Link>
										</Col>
										<Col md={4}>
											{item.qty} x {item.price} = ${item.qty * item.price}
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					)}
				</Col>
				<Col>
					<Card>
						<ListGroup>
							<ListGroup.Item>
								<h4>Order Summary</h4>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${cart.itemsPrice}</Col>
								</Row>
								<Row>
									<Col>Shipping</Col>
									<Col>${cart.shippingPrice}</Col>
								</Row>
								<Row>
									<Col>Tax</Col>
									<Col>${cart.taxPrice}</Col>
								</Row>
								<Row>
									<Col>Total Price</Col>
									<Col>${cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{error && <Message variant="danger">{error} </Message>}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cart.cartItems === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
