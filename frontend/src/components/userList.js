
import React, { useState, useEffect } from 'react';
import './userList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // fetch user data from backend
    const fetchUsers = async () => {
      const response = await fetch(`/api/users?page=${page}&perPage=${perPage}&status=${statusFilter}&q=${searchQuery}`);
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
    };

    fetchUsers();
  }, [page, perPage, statusFilter, searchQuery]);

  // pagination
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container">
      <h1>User List</h1>
      <div className="filter-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={statusFilter}
          className="status-select"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Completed">Completed</option>
          <option value="InCompleted">InCompleted</option>
        </select>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Tasks</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.task}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage}>Previous Page</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
};

export default UserList;
