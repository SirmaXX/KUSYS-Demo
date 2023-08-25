import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar  from "./UserComponents.js";

  
    
const CourseEnrollButton = ({ courseId, id }) => {
  const [isEnrollSuccess, setIsEnrollSuccess] = useState(false);
  const [enrollErrorMessage, setEnrollErrorMessage] = useState('');

  const recordCourse = async () => {
    try {
      const response = await axios.post('http://localhost:8000/enrollments/', {
        StudentId: id,
        CourseId: courseId
      });

      if (response.status === 201) {
        setIsEnrollSuccess(true);
        setEnrollErrorMessage('');
        window.location.reload(true);
      } else {
        alert('You have already enrolled in this course.');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setIsEnrollSuccess(false);
      setEnrollErrorMessage('An error occurred while enrolling in the course.');
    }
  };

  return (
    <td>
      <button className="btn btn-danger" onClick={recordCourse}>
        Enroll
      </button>
    </td>
  );
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
              
                <CourseEnrollButton courseId={course.CourseId} id={id} />
             
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
      <div className="container bg-light">
        <h1 className="text-center">Course Panel</h1>
        <div className="row">
          <div className="col-md-12 col-sm-12 card">
           
           
            <ListCourse />
          
          </div>
        </div>
      </div>
      </>
  
    );
  };
  
  export default EnrollCourse;