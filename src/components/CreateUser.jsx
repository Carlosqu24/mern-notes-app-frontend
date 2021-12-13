import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const CreateUser = () => {

      const [data, setData] = useState([]);
      const [userName, setUserName] = useState(null);

      // USERS
      const getUsers = async () => {
            const res = await axios.get('https://mern-express-notes-app.herokuapp.com/api/users');

            setData(res.data);
      };

      // HANDLES
      const handleChangeUsername = (e) => {
            setUserName(e.target.value)
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            const res = await axios.post('https://mern-express-notes-app.herokuapp.com/api/users', {
                  username: userName
            });

            getUsers();
      };

      const handleDoubleClick = async (id) => {

            const res = await axios.delete(`https://mern-express-notes-app.herokuapp.com/api/users/${id}`, {
                  username: userName
            });

            getUsers();
      }

      useEffect(() => {
            getUsers();
      }, []);

      return (
            <div className="row">
                  <div className="col-md-4">
                        <div className="card card-body">
                              <h3>Create New User</h3>
                              <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                          <input 
                                                onChange={handleChangeUsername} 
                                                type="text" 
                                                className="form-control" />
                                    </div>
                                    <button type='submit' className="btn btn-primary">
                                          Save User
                                    </button>
                              </form>
                        </div>
                  </div>
                  <div className="col-md-8">
                        <ul className="list-group">
                              {
                                    data.map(user => (

                                          <li onDoubleClick={() => handleDoubleClick(user._id)} className="list-group-item list-group-item-action" key={user._id}>
                                                { user.username }
                                          </li>

                                    ))
                              }
                        </ul>
                  </div>
            </div>
      )
}
