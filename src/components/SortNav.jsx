import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../stylesheets/App.css';
export const SortNav = ({ setSort, setOrder }) => {
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

  return (
    <Navbar bg="light">
      <Container fluid>
        <Nav className="m-auto">
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
      </Container>
    </Navbar>
  );
};
