import React, { useState } from 'react';
import axios from 'axios';

const CreateCourse = () => {
    const [course, setCourse] = useState('');
    const [isCourseSuccess, setIsCourseSuccess] = useState(false);
    const [courseErrorMessage, setCourseErrorMessage] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8000/courses/', {
          CourseName: course, // Make sure the key matches the expected server key
        });
  
        if (response.status === 201) {
          setIsCourseSuccess(true);
          setCourseErrorMessage('');
        } else {
          setIsCourseSuccess(false);
          setCourseErrorMessage('An error occurred while creating the course');
        }
      } catch (error) {
        console.error('Course creation error:', error);
        setIsCourseSuccess(false);
        setCourseErrorMessage('An error occurred while creating the course');
      }
    };
  
    return (
      <div>
        <h2>Create Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="courseName" className="form-label">
              Course Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="courseName"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />
          </div>
  
          <button type="submit" className="btn btn-primary">
            Create Course
          </button>
        </form>
  
        {isCourseSuccess && <p>Course created successfully!</p>}
        {courseErrorMessage && <p>{courseErrorMessage}</p>}
      </div>
    );
  };
  

  class ListCourse extends React.Component {
    render() {
      return (   
         <table class="table table-striped">
      <thead>
          <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>John</td>
              <td>Doe</td>
              <td>john@example.com</td>
          </tr>
          <tr>
              <td>Mary</td>
              <td>Moe</td>
              <td>mary@example.com</td>
          </tr>
          <tr>
              <td>July</td>
              <td>Dooley</td>
              <td>july@example.com</td>
          </tr>
      </tbody>
      <br/>
      <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
  </table>
  );
    }
  }

const AdminCourse= () => {
  return (
    <div class="container bg-light">
        <h1 class="text-center">Course</h1>
        <div class="row">
            <div class="col-md-6 col-sm-12 card">
            <CreateCourse/>
            </div>
            <div class="col-md-6 col-sm-12">
                  <h2 class="text-center">Login</h2>
                <ListCourse/>

              
            </div>
        </div>
    </div>

    
  );
};

export default AdminCourse;