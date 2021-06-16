import React, { useEffect, useState } from "react";
import { Col, Row, Image, Button, ListGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../components/Message";
import CheckOutSteps from "./../components/CheckOutSteps";
import { Link } from "react-router-dom";
import { orderDetailsAction, payOrderAction } from "./../actions/orderActions";
import Loader from "./../components/Loader";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = ({ match }) => {
	const [sdkReady, setSdkReady] = useState(false);
	const orderId = match.params.id;
	const dispatch = useDispatch();
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay);
	const { success: successPay, loading: loadingPay } = orderPay;

	const style = {
		"text-transform": "uppercase",
		fontFamily: "sans-serif",
		fontWeight: "bold",
	};
	if (!loading) {
		const addDecimal = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};

		order.itemsPrice = addDecimal(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		);
	}

	useEffect(() => {
		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get("/api/config/paypal");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};

		if (!order || successPay || order._id !== orderId) {
			dispatch({ type: ORDER_PAY_RESET });

			dispatch(orderDetailsAction(orderId));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [dispatch, orderId, successPay, order]);

	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult);
		dispatch(payOrderAction(orderId, paymentResult));
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			<h4>Order - {order._id}</h4>
			<Row style={{ fontFamily: "sans-serif" }}>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h4>Shipping</h4>
							<p>
								<h6>Name :{order.user.name} </h6>
							</p>
							<p>
								<h6>
									Email :{" "}
									<a
										href={`mail to ${order.user.email}`}
										style={{
											fontFamily: "sans-serif",

											"text-transform": "lowercase",
										}}
									>
										{order.user.email}
									</a>
								</h6>
							</p>
							<h6>
								Address :{order.shippingAddress.address},
								{order.shippingAddress.city},{order.shippingAddress.postalCode},
								{order.shippingAddress.country}{" "}
							</h6>

							{order.isDelivered ? (
								<Message variant="success">
									Delivered on {order.deliveredAt}
								</Message>
							) : (
								<Message variant="danger">Not Delivered</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h4>Payment Method</h4>
							<strong> Method : </strong>
							{order.paymentMethod}
							{order.isPaid ? (
								<Message variant="success">Paid on {order.paidAt}</Message>
							) : (
								<Message variant="danger">Not Paid</Message>
							)}
						</ListGroup.Item>
					</ListGroup>

					{order.orderItems.length === 0 ? (
						<Message>Order is Empty</Message>
					) : (
						<ListGroup variant="flush" style={{ fontFamily: "sans-serif" }}>
							{order.orderItems.map((item, index) => (
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
					<Card style={{ fontFamily: "sans-serif" }}>
						<ListGroup>
							<ListGroup.Item>
								<h4>Order Summary</h4>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${order.itemsPrice}</Col>
								</Row>
								<Row>
									<Col>Shipping</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
								<Row>
									<Col>Tax</Col>
									<Col>${order.taxPrice}</Col>
								</Row>
								<Row>
									<Col>Total Price</Col>
									<Col>${order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{!sdkReady ? (
										<Loader />
									) : (
										<PayPalButton
											amount={order.totalPrice}
											onSuccess={successPaymentHandler}
										/>
									)}
								</ListGroup.Item>
							)}

							{error && <Message variant="danger">{error} </Message>}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
