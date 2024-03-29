import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Image, ListGroup, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { productDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({ match, history }) => {
	const [qty, setQty] = useState(1);
	const dispatch = useDispatch();
	const productDetail = useSelector((state) => {
		return state.productDetails;
	});
	console.log(`productDetail ===  ${productDetail.product}`);
	const { loading, product, error } = productDetail;

	useEffect(() => {
		dispatch(productDetails(match.params.id));
	}, [dispatch, match]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};
	return (
		<>
			<Link className="btn btn-light my-3" to="/">
				GO BACK
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danager">{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} fluid></Image>
					</Col>
					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									rating={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>{`Price : Rs ${product.price}`}</ListGroup.Item>
							<ListGroup.Item>{`Description : ${product.description}`}</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<ListGroup>
							<ListGroup.Item>
								<Row>
									<Col>Price: </Col>
									<Col>Rs {product.price}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Status: </Col>
									<Col>
										{product.countInStock === 0 ? "Out of Stock " : "In Stock"}
									</Col>
								</Row>
							</ListGroup.Item>
							{product.countInStock > 0 && (
								<ListGroup.Item>
									<Row>
										<Col>Qty </Col>
										<Col>
											<Form.Control
												as="select"
												value={qty}
												onChange={(e) => {
													setQty(e.target.value);
												}}
											>
												{[...Array(product.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</Form.Control>
										</Col>
									</Row>
								</ListGroup.Item>
							)}

							<ListGroup.Item>
								<Button
									className="btn-block"
									type="button"
									disabled={product.countInStock === 0}
									onClick={addToCartHandler}
								>
									Add to Cart
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductScreen;
