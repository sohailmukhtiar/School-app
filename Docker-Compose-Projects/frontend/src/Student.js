// Student.js

import React, { useState, useEffect } from 'react';
import './Student.css';

function Student() {
  const [studentData, setStudentData] = useState({
    name: '',
    rollNo: '',
    class: '',
  });

  const [data, setData] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_URL;
  console.log("API:", API_BASE_URL);

  // Fetch students
  const getData = () => {
    fetch(`${API_BASE_URL}/student`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched Data:', data);
        setData(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    };

    fetch(`${API_BASE_URL}/addstudent`, requestOptions)
      .then((res) => res.json())
      .then(() => {
        getData();
        setStudentData({
          name: '',
          rollNo: '',
          class: '',
        });
      })
      .catch((err) => console.log(err));
  };

  // Delete student
  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/student/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        getData();
      })
      .catch((err) => console.error('Error deleting data:', err));
  };

  return (
    <div>
      <div className="student-container">
        <div className="content">
          <h2 className="store-student-details" style={{ marginLeft: '100px' }}>
            Student Details
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={studentData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Roll No (Must be Number):</label>
              <input
                type="text"
                name="rollNo"
                value={studentData.rollNo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Class:</label>
              <input
                type="text"
                name="class"
                value={studentData.class}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <p style={{ marginLeft: '50px' }}>
                <button type="submit">Submit</button>
              </p>
            </div>
          </form>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '50px 0' }}>
          <h2 className="student-details">Student details</h2>

          <table
            className="student-table gradient-bg"
            style={{
              border: '1px solid #ccc',
              borderCollapse: 'collapse',
              margin: '100px 0',
              marginLeft: '800px',
              marginTop: '200px',
              width: '40%',
              backgroundColor: '#f4f4f4',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#ddd' }}>
                <th>StudentID</th>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Class</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((d, i) => (
                <tr key={i}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.roll_number}</td>
                  <td>{d.class}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(d.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Student;
