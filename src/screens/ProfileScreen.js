import React from "react";
import { useEffect, useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "./../components/Message";
import Loader from "./../components/Loader";
import {
	getUserDetailsAction,
	userRegisterAction,
	updateProfileAction,
} from "../actions/userAction";

import { getListMyOrdersAction } from "../actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";

const ProfileScreen = ({ location, history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const dispatch = useDispatch();

	const userDetails = useSelector((state) => {
		return state.userDetails;
	});

	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => {
		return state.userLogin;
	});
	const { userInfo } = userLogin;

	const updatedProfileDetails = useSelector((state) => {
		return state.updatedProfileDetails;
	});
	const { success } = updatedProfileDetails;

	const myOrders = useSelector((state) => {
		return state.orderListMy;
	});
	const { loading: loadingOrdes, error: errorOrders, orders } = myOrders;

	const redirect = location.search ? location.search.split("=")[1] : "/";

	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		} else {
			if (!user.name) {
				dispatch(getUserDetailsAction("/profile"));
				dispatch(getListMyOrdersAction());
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords Dont match");
		} else {
			dispatch(updateProfileAction({ id: user._id, name, email, password }));
		}
	};
	return (
		<Row>
			<Col md={3}>
				<h4>USER PROFILE</h4>
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{success && <Message variant="success">Profile Updated</Message>}

				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="email">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="Name"
							value={name}
							placeholder="Name"
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							value={email}
							placeholder="Email Adress"
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							value={password}
							placeholder="Password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						></Form.Control>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							value={confirmPassword}
							placeholder="Confirm Password"
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
						></Form.Control>
					</Form.Group>
					<Button type="submit" variant="primary">
						Update
					</Button>
				</Form>
			</Col>
			<Col md={8}>
				<h4>My Orders</h4>
				{loadingOrdes ? (
					<Loader />
				) : errorOrders ? (
					<Message variant="danger">{errorOrders}</Message>
				) : (
					<Table striped responsive bordered hover className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										{order.isDelivered ? (
											order.deliveredAt.subString(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/orders/${order._id}`}>
											<Button className="btn-sm" variant="light">
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
