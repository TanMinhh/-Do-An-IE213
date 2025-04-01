import React, {useState, useEffect} from "react";
import ProductDataService from "../services/products";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";

const ProductsList = props => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    retrieveProducts();
  }, []);

  const retrieveProducts = () => {
    ProductDataService.getAll()
      .then(response => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="App">
      <Container>
        <Row>
        {products && products.length > 0 ? (
          products.map((product) => (
            <Col key={product.index}>
              <Card style={{ width: '18rem', height: '25rem' }}>
                <Card.Img src={product.images}/>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {product.description}
                  </Card.Text>
                  <Link to={"/products/" + product._id}>View Reviews</Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No products available.</p>
        )}
        </Row>
      </Container>
    </div>
  );
}

export default ProductsList;