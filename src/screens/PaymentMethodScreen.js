import React from "react";
import { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import Loader from "./../components/Loader";
import FormContainer from "./FormContainer";
import CheckOutSteps from "./../components/CheckOutSteps";

const PaymentMethodScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	if (!shippingAddress) {
		history.push("/shipping");
	}
	const [paymentMethod, setPaymentMethod] = useState("PayPal");

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push("/placeorder");
	};
	return (
		<FormContainer>
			<CheckOutSteps step1 step2 step3></CheckOutSteps>

			<h4>Paymet Method</h4>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label
						as="legend"
						style={{ fontSize: "20px", fontWeight: "bold" }}
					>
						Select Payment Method
					</Form.Label>
					<Form.Check
						type="radio"
						label="PayPal or Credit Card"
						id="PayPal"
						name="paymentMethod"
						value="PayPal"
						onChange={(e) => setPaymentMethod(e.target.value)}
					></Form.Check>

					<Form.Check
						type="radio"
						label="Stripe"
						id="Stripe"
						name="paymentMethod"
						value="Stripe"
						onChange={(e) => setPaymentMethod(e.target.value)}
					></Form.Check>
				</Form.Group>
				<Button
					type="submit"
					variant="primary"
					style={{ margin: "30px", marginLeft: "0px", alignSelf: "-30px" }}
				>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentMethodScreen;
