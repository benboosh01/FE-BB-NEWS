import { useState, useEffect } from 'react';
import { getTopics } from '../utilities/api';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import '../stylesheets/App.css';
export const MainNav = ({ setSort, setOrder }) => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopics(topics);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading Navigation Menu....</p>;
  return (
    <Navbar bg="info" expand="lg" className="py-2" expanded={expanded}>
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>News</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          onClick={() => {
            setExpanded(expanded ? false : 'expanded');
          }}
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <LinkContainer to="/articles">
              <Nav.Link
                onClick={() => {
                  setExpanded(false);
                }}
              >
                All Articles
              </Nav.Link>
            </LinkContainer>
            <NavDropdown title={<span>Topics</span>} id="basic-nav-dropdown">
              {topics.map((topic) => {
                return (
                  <LinkContainer
                    key={topic.slug}
                    to={`/articles/topic/${topic.slug}`}
                  >
                    <NavDropdown.Item
                      onClick={() => {
                        setExpanded(false);
                      }}
                    >
                      {topic.slug.slice(0, 1).toUpperCase() +
                        topic.slug.slice(1)}
                    </NavDropdown.Item>
                  </LinkContainer>
                );
              })}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
