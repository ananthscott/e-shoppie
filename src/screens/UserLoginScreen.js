import React from "react";
import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "./../components/Message";
import Loader from "./../components/Loader";
import { userLoginAction } from "../actions/userAction";
import FormContainer from "./FormContainer";

const UserLoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => {
		return state.userLogin;
	});

	const { loading, error, userInfo } = userLogin;
	const redirect = location.search ? location.search.split("=")[1] : "/";
	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, redirect, userInfo]);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(userLoginAction(email, password));
	};
	return (
		<FormContainer>
			<h1>SIGN IN</h1>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="email">
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
				</Form.Group>
				<Button type="submit" variant="primary">
					Sign In
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					New User ?{" "}
					<Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default UserLoginScreen;
