import Form from 'react-bootstrap/Form';
import '../stylesheets/App.css';
export const SortNav = ({ setSort, setOrder, sortOptions, orderOptions }) => {
  const handleSort = (event) => {
    setSort(event.target.value);
  };

  const handleOrder = (event) => {
    setOrder(event.target.value);
  };

  return (
    <section className="d-flex align-items-center justify-content-center text-end pt-3">
      <div className="d-flex justify-content-end">
        <label
          htmlFor="selectSort"
          style={{ width: '100px' }}
          className="pe-2 pt-1"
        >
          Sort By:
        </label>
        <Form.Select
          onChange={handleSort}
          size="sm"
          id="selectSort"
          style={{ width: '100px' }}
        >
          {sortOptions.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </Form.Select>
      </div>
      <div className="d-flex justify-content-start">
        <label
          htmlFor="selectOrder"
          style={{ width: '100px' }}
          className="pe-2 pt-1"
        >
          Order By:
        </label>
        <Form.Select
          onChange={handleOrder}
          size="sm"
          id="selectOrder"
          style={{ width: '100px' }}
        >
          {orderOptions.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </Form.Select>
      </div>
    </section>
  );
};
