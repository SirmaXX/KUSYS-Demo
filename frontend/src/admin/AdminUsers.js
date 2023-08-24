import React, { useState, useEffect } from 'react';
import axios from 'axios';





const UpdateUser = ({ userId, userName ,Password,Email}) => {
    const [username, setSelectedUserName] = useState(userName);
    const [password, setSelectedpassword] = useState(Password);
    const [email, setSelectedemail] = useState(Email);
    const updateUserr = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/users/${userId}`, {
                id:null,
                username: username,
                password: password,
                email: email

            });

            if (response.status === 200) {
                window.location.reload(true);
            }
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    const openModal = () => {
        setSelectedUserName(userName);
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
                                value={username}
                                onChange={(e) => setSelectedUserName(e.target.value)}
                            />
                             <input
                                type="email"
                                value={email}
                                onChange={(e) => setSelectedemail(e.target.value)}
                            />
                             <input
                                type="text"
                                value={password}
                                onChange={(e) => setSelectedpassword(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={updateUserr}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </span>
    );
};
const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isUserSuccess, setIsUserSuccess] = useState(false);
    const [userErrorMessage, setUserErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/users/', {
                id: null,
                username: username,
                password: password,
                email: email
            });

            if (response.status === 201) {
                setIsUserSuccess(true);
                setUserErrorMessage('');
                setUsername('');
                setPassword('');
                setEmail('');
                window.location.reload(true);
                // Optionally, you can update your user list here
            } else {
                setIsUserSuccess(false);
                setUserErrorMessage('An error occurred while creating the user');
            }
        } catch (error) {
            console.error('User creation error:', error);
            setIsUserSuccess(false);
            setUserErrorMessage('An error occurred while creating the user');
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                        User Name:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password" className="form-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Create User
                </button>
            </form>

            {isUserSuccess && <p>User created successfully!</p>}
            {userErrorMessage && <p>{userErrorMessage}</p>}
        </div>
    );
};

const ListUser = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:8000/users/?skip=0&limit=10');
                if (response.status === 200) {
                    setUsers(response.data);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }

        fetchUsers();
    }, []);


    const DeleteUser = async (userId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/users/${userId}`);
            if (response.status === 201 && response.data !== null) {
                // User successfully deleted, update the users state
                setUsers(users.filter((user) => user.id !== userId));
              
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    return (
        <div>
            
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>transactions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>

                            <td>{user.password.substring(0, 5)}</td>
                            <td>
                            <button
                                    className="btn btn-danger"
                                    onClick={() => DeleteUser(user.id)}
                                >
                                    Delete
                                </button>
                          

                                <UpdateUser  userId={user.id} userName={user.username} Password={user.password} Email={user.email} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal */}

        </div>
    );
};

const AdminUser = () => {
    return (
        <div className="container bg-light">
            <h1 className="text-center">Users Panel</h1>
            <div className="row">
                <div className="col-md-6 col-sm-12 card">
                    <CreateUser />
                </div>
                <div className="col-md-6 col-sm-12">

                    <ListUser />


                </div>
            </div>
        </div>


    );
};

export default AdminUser;