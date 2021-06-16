import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../components/Message";
import { Link } from "react-router-dom";
import {
	Row,
	Button,
	Col,
	Image,
	Form,
	ListGroup,
	Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "./../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split("=")[1]) : 1;
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.cartItems);
	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, qty]);

	const removeCartHAndler = (id) => {
		dispatch(removeFromCart(id));
	};
	const checkOutHandler = () => {
		history.push("/login?redirect=shipping");
	};
	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<>
						<Message>
							Your Cart is Empty <Link to="/">Go Back</Link>
						</Message>
					</>
				) : (
					<ListGroup variant="flush">
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>

									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>{item.price}</Col>
									<Col md={2}>
										<Form.Control
											as="select"
											value={item.qty}
											onChange={(e) =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}
										>
											{[...Array(item.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type="button"
											variant="light"
											onClick={() => removeCartHAndler(item.product)}
										>
											<i className="fas fa-trash" />
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={3}>
				<Card>
					<h5>
						Sub total ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
						items
					</h5>

					<h2>
						&#8377;{" "}
						{cartItems
							.reduce((acc, item) => acc + item.qty * item.price, 0)
							.toFixed(2)}
					</h2>
					<Button
						type="button"
						className="btn-block"
						onClick={checkOutHandler}
						disabled={cartItems.length === 0}
					>
						Proceed to check Out
					</Button>
				</Card>
			</Col>
			<Col md={2}></Col>
			<Col md={2}></Col>
		</Row>
	);
};

export default CartScreen;
