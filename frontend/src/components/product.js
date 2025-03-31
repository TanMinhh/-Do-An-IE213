import React, {useState, useEffect} from "react";
import ProductDataService from "../services/products";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const Product = props => {
  const [product, setProduct] = useState({
    id: null,
    name: "",
    description: "",
    rating: Number,
    reviews: []
  });
  const getProduct = id => {
    ProductDataService.get(id)
      .then(response => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getProduct(props.match.params.id);
  }, [props.match.params.id]);
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={product.images} alt={product.name} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{product.name}</Card.Header>
              <Card.Body>
                <Card.Text>
                  {product.description}
                </Card.Text>
                {props.user &&
                <Link to={"/products/" + props.match.params.id + "/review"}>
                Add Review
                </Link>
                }
              </Card.Body>
            </Card>
            <br />
            <h2>Reviews</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Product;