import { useState, useEffect } from 'react';
import { getTopics } from '../utilities/api';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
export const MainNav = ({ setSort, setOrder }) => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopics(topics);
      setIsLoading(false);
    });
  }, []);

  const sortOptions = [
    { value: 'created_at', text: 'Date' },
    { value: 'votes', text: 'Votes' },
    { value: 'comment_count', text: 'Comments' },
  ];

  const orderOptions = [
    { value: 'DESC', text: 'DESC' },
    { value: 'ASC', text: 'ASC' },
  ];

  const handleSort = (event) => {
    setSort(event);
  };

  const handleOrder = (event) => {
    setOrder(event);
  };

  if (isLoading) return <p>Loading Navigation Menu....</p>;
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>BB News</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <LinkContainer to="/articles">
              <Nav.Link>All Articles</Nav.Link>
            </LinkContainer>
            <NavDropdown title={<span>Topics</span>} id="basic-nav-dropdown">
              {topics.map((topic) => {
                return (
                  <LinkContainer
                    key={topic.slug}
                    to={`/articles/topic/${topic.slug}`}
                  >
                    <NavDropdown.Item>
                      {topic.slug.slice(0, 1).toUpperCase() +
                        topic.slug.slice(1)}
                    </NavDropdown.Item>
                  </LinkContainer>
                );
              })}
            </NavDropdown>
            <NavDropdown
              title={<span>Sort</span>}
              id="basic-nav-dropdown"
              onSelect={handleSort}
            >
              {sortOptions.map((option) => {
                return (
                  <NavDropdown.Item
                    key={option.value}
                    eventKey={option.value}
                    value={option.value}
                  >
                    {option.text}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <NavDropdown
              title={<span>Order</span>}
              id="basic-nav-dropdown"
              onSelect={handleOrder}
            >
              {orderOptions.map((option) => {
                return (
                  <NavDropdown.Item
                    key={option.value}
                    eventKey={option.value}
                    value={option.value}
                  >
                    {option.text}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
