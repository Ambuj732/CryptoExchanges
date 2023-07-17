import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination } from 'react-bootstrap';
import { BsFilterLeft } from 'react-icons/bs';

const App = () => {
  const [exchanges, setExchanges] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchExchanges = async (page) => {
    try {
      const response = await axios.get(`/exchange-list?page=${page}`);
      setExchanges(response.data.exchanges);
      console.log(response.data.exchanges);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExchanges(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
    <h1>Top crypto exchange</h1>
    <p>compare all 190 top crypto exchanges. The list is ranked by trading volume.</p>
      <h1>Exchange List</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {exchanges.map((exchange, index) => (
            <tr key={exchange.exchangeId}>
              <td>{index + 1}</td>
              <td>{exchange.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default App;
