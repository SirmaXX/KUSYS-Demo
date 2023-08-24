import React, { useState, useEffect } from 'react';
import axios from 'axios';




const UpdateCourse = ({ courseId, courseName }) => {
  const [selectedCourseName, setSelectedCourseName] = useState(courseName);
  const [isCourseSuccess, setIsCourseSuccess] = useState(false);
  const [courseErrorMessage, setCourseErrorMessage] = useState('');

  const updateCoursee = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/courses/${courseId}`, {
        CourseName: selectedCourseName,
      });

      if (response.status === 200) {
        setIsCourseSuccess(true);
        window.location.reload(true);
      } else {
        setCourseErrorMessage('An error occurred while updating the course');
      }
    } catch (error) {
      console.error('Update error:', error);
      setCourseErrorMessage('An error occurred while updating the course');
    }
  };

  const openModal = () => {
    setSelectedCourseName(courseName);
  };

  return (
    <span>
      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
        onClick={openModal}
      >
        Edit
      </button>
      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        {/* Modal content */}
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Edit Course</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Include your form or edit content here */}
              <input
                type="text"
                value={selectedCourseName}
                onChange={(e) => setSelectedCourseName(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={updateCoursee}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
};
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
        window.location.reload(true);
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


const ListCourse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseName, setSelectedCourseName] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  
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


  const DeleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/courses/${courseId}`);
      if (response.status === 201) {
        // Course successfully deleted, update the courses state
        setCourses(courses.filter((course) => course.CourseId !== courseId));
       
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };



  return (
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
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => DeleteCourse(course.CourseId)}
                >
                  Delete
                </button>
              </td>
              <td>
              <UpdateCourse courseId={course.CourseId} courseName={course.CourseName} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
  
    </div>
  );
};

const AdminCourse = () => {
  return (
    <div class="container bg-light">
      <h1 class="text-center">Course Panel</h1>
      <div class="row">
        <div class="col-md-6 col-sm-12 card">
          <CreateCourse />
        </div>
        <div class="col-md-6 col-sm-12">
         
          <ListCourse />


        </div>
      </div>
    </div>


  );
};

export default AdminCourse;