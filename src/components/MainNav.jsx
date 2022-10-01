import { useState, useEffect } from 'react';
import { getTopics } from '../utilities/api';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
export const MainNav = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopics(topics);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading Navigation Menu....</p>;
  return (
    <Navbar bg="secondary" expand="lg">
      <Container fluid>
        <Nav className="me-auto">
          <LinkContainer to="/articles">
            <Nav.Link className="text-light">All Articles</Nav.Link>
          </LinkContainer>
          <NavDropdown
            title={<span className="text-light">Topics</span>}
            id="basic-nav-dropdown"
          >
            {topics.map((topic) => {
              return (
                <LinkContainer
                  key={topic.slug}
                  to={`/articles/topic/${topic.slug}`}
                >
                  <NavDropdown.Item>{topic.slug}</NavDropdown.Item>
                </LinkContainer>
              );
            })}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};
