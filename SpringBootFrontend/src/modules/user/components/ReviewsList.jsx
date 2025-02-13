import { useState, useEffect } from 'react';
import { Container, Table, Form, InputGroup, Badge, Card, Row, Col } from 'react-bootstrap';
import { FaSearch, FaStar } from 'react-icons/fa';
import axios from 'axios';

function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    fiveStarReviews: 0,
    oneStarReviews: 0
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5205/api/Review');
      console.log('Reviews:', response.data);
      setReviews(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (reviewsData) => {
    const stats = reviewsData.reduce((acc, review) => {
      acc.totalReviews++;
      acc.totalRating += review.rating;
      if (review.rating === 5) acc.fiveStarReviews++;
      if (review.rating === 1) acc.oneStarReviews++;
      return acc;
    }, {
      totalReviews: 0,
      totalRating: 0,
      fiveStarReviews: 0,
      oneStarReviews: 0
    });

    setStats({
      ...stats,
      averageRating: stats.totalRating / stats.totalReviews || 0
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        color={index < rating ? "#ffc107" : "#e4e5e9"}
        size={16}
      />
    ));
  };

  const filteredReviews = reviews.filter(review =>
    // review.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // review.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Reviews Management</h2>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="bg-primary text-white">
            <Card.Body>
              <h6>Total Reviews</h6>
              <h3>{stats.totalReviews}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="bg-success text-white">
            <Card.Body>
              <h6>Average Rating</h6>
              <h3>{stats.averageRating.toFixed(1)} / 5</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="bg-warning text-white">
            <Card.Body>
              <h6>5 Star Reviews</h6>
              <h3>{stats.fiveStarReviews}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="bg-danger text-white">
            <Card.Body>
              <h6>1 Star Reviews</h6>
              <h3>{stats.oneStarReviews}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="mb-4">
        <InputGroup>
          <Form.Control
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
        </InputGroup>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Review ID</th>
            <th>Booking ID</th>
            <th>User</th>
            <th>Vendor</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredReviews.map(review => (
            <tr key={review.id}>
              <td>{review.reviewId}</td>
              <td>{review.bookingId}</td>
              <td>{review.userId}</td>
              <td>{review.vendorId}</td>
              <td>{renderStars(review.rating)}</td>
              <td>{review.comment}</td>
              <td>{new Date(review.reviewDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ReviewsList;