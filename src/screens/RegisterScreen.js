import React from "react";
import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "./../components/Message";
import Loader from "./../components/Loader";
import { userRegisterAction } from "../actions/userAction";
import FormContainer from "./FormContainer";

const RegisterScreen = ({ location, history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
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
		if (password !== confirmPassword) {
			setMessage("Passwords Dont match");
		} else {
			dispatch(userRegisterAction(name, email, password));
		}
	};
	return (
		<FormContainer>
			<h1>REGISTER</h1>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
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
					Register
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					Have an Account ?{" "}
					<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
						Login
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
