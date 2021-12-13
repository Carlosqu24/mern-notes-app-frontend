import React, { useState, useEffect } from 'react'
import axios from 'axios'

// DatePicker
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


export const CreateNote = (props) => {

      const [users, setUsers] = useState([]);
      const [userSelected, setUserSelected] = useState("");
      const [inputValue, setInputValue] = useState("");
      const [textareaValue, setTextareaValue] = useState("");
      const [date, setDate] = useState(new Date());
      const [edit, setEdit] = useState(false);
      const [_id, set_id] = useState("");
      const [note, setNote] = useState({})

      const getUsers = async () => {
            const res = await axios.get('https://mern-express-notes-app.herokuapp.com/api/users');

            //const usersUsername = res.data.map(user => user.username)

            setUsers(res.data.map(user => user.username));
            setUserSelected(res.data[0].username)
      };

      const getNote = async (id) => {
            const res = await axios.get('https://mern-express-notes-app.herokuapp.com/api/users/' + id);

            setNote({
                  title: res.data.title,
                  description: res.data.description,
                  author: res.data.author,
                  date: new Date(res.data.date)
            });
      }

      useEffect(() => {
      
            getUsers();

            if(props.match.params.id) {

                  getNote(props.match.params.id);

                  setEdit(true)
                  set_id(props.match.params.id)
            }

      }, []);

      const handleSubmit = async (e) => {
            e.preventDefault();

            const newNote = {
                  title: inputValue,
                  description: textareaValue,
                  date,
                  author: userSelected
            };


            edit 
                  ? await axios.put(`https://mern-express-notes-app.herokuapp.com/api/notes/${_id}`, newNote)
                  : await axios.post('https://mern-express-notes-app.herokuapp.com/api/notes', newNote);


            window.location.href = "/"; // luego se tiene que cambiar
      };

      const handleOptionChange = (e) => setUserSelected(e.target.value);

      const handleInputChange = (e) => setInputValue(e.target.value);

      const handleTextareaChange = (e) => setTextareaValue(e.target.value);

      const handleDatePickerChange = date => setDate(date);



      return (
            <div className="col-md-6 offset-md-3">
                  <div className="card card-body">
                        <h4>Create a Note</h4>
                        <form onSubmit={handleSubmit}>

                              { /* SELECT USER */ }
                              <div className="form-group">
                                    <select 
                                          className="form-control mb-3"
                                          name="userSelected"
                                          // value={userSelected}
                                          onChange={handleOptionChange}   
                                          >
                                                {
                                                      users.map(user => <option key={user} value={user}>{user}</option>)
                                                }
                                    </select>
                              </div>

                              <div className="form-group">
                                    <input 
                                          type="text" 
                                          className="form-control mb-3" 
                                          placeholder="Title" 
                                          name="title"
                                          // value={note.title}
                                          onChange={handleInputChange}
                                          required
                                    />
                              </div>

                              <div className="form-group">
                                    <textarea 
                                          name="description"
                                          className="form-control mb-3"
                                          placeholder="Description"
                                          // value={note.description}
                                          onChange={handleTextareaChange}
                                          required
                                    ></textarea>
                              </div>

                              <div className="form-group">
                                    <DatePicker 
                                          className="form-control mb-4"
                                          selected={date}
                                          onChange={handleDatePickerChange}
                                    />
                              </div>

                              <button type="submit" className="btn btn-primary">
                                    Save
                              </button>
                        </form>
                  </div>
            </div>
      )
}
