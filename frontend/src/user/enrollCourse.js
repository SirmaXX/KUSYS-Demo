import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar  from "./UserComponents.js";

  
    
const RecordCourse = async (courseId,id) => {
    const [isEnrollSuccess, setIsEnrollSuccess] = useState(false);
    const [EnrollErrorMessage, setEnrollErrorMessage] = useState('');
    try {
        const response = await axios.post('http://localhost:8000/enrollments/', {
            "StudentId": id,
          "CourseId": courseId
          });
    
      if (response.status === 201) {
        // Course successfully deleted, update the courses state
        setIsEnrollSuccess(true);
        setEnrollErrorMessage('');
        window.location.reload(true);
       
      }
      else {
          alert('You have enrolled a course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      setIsEnrollSuccess(false);
      setEnrollErrorMessage('An error occurred while creating the course');
    }
  };




const ListCourse = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourseName, setSelectedCourseName] = useState(null);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    

  
    const id= localStorage.getItem('userId');
    

    useEffect(() => {
      async function fetchCourses() {
        try {
          const response = await axios.get('http://localhost:8000/courses/?skip=0&limit=10');
          if (response.status === 200) {
            setCourses(response.data);
          }
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      }
  
      fetchCourses();
    }, []);
  
  

  
  
    return (
        <>
       
      <div>
       
        <h2>List of Courses</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course ID</th>
              <th>transactions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.CourseId}>
                <td>{course.CourseName}</td>
                <td>{course.CourseId}</td>
              <button
                  className="btn btn-danger"
                  onClick={() => RecordCourse (course.CourseId,id)}
                >
                  Enroll
                </button>
               
              </tr>
            ))}
          </tbody>
        </table>
        {/* Modal */}
    
      </div>
      </>
    );
  };

  const EnrollCourse = () => {
    return (
        <>
        <Navbar/>
      <div class="container bg-light">
        <h1 class="text-center">Course Panel</h1>
        <div class="row">
          <div class="col-md-12 col-sm-12 card">
           
           
            <ListCourse />
          
          </div>
        </div>
      </div>
      </>
  
    );
  };
  
  export default EnrollCourse;