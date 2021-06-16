import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import products from "./../products";

const Product = ({ product }) => {
	return (
		<Card className="my-3 p-3 rounded">
			<Link to={`product/${product._id}`}>
				<Card.Img src={product.image} variant="top" />
			</Link>
			<Card.Body>
				<Link to={`product/${product._id}`}>
					<Card.Title as="div">
						{" "}
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>
			</Card.Body>
			<Card.Text as="div">
				<Rating
					rating={product.rating}
					text={`${product.numReviews} Reviews`}
				/>
			</Card.Text>
			<Card.Text as="strong">Rs {product.price}</Card.Text>
		</Card>
	);
};

Product.propTypes = {};

export default Product;
