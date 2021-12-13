import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

export const NotesList = () => {

      const [notes, setNotes] = useState([]);

      const getNotes = async () => {
            const res = await axios.get('https://mern-express-notes-app.herokuapp.com/api/notes');

            setNotes(res.data)
      }

      useEffect(() => {

            getNotes();

      }, []);

      const deleteNote = async id => {
            const res = await axios.delete(`https://mern-express-notes-app.herokuapp.com/api/notes/${id}`);

            console.log(res);

            getNotes();
      }

      return (
           <div className="row">
                 {
                       notes.map(note => (
                             <div className="col-md-4 p-2" key={note._id}>
                                   <div className="card">
                                         <div className="card-header d-flex justify-content-between">
                                                <h5>{note.title}</h5>
                                                <Link className="btn btn-info" to={`edit/${note._id}`}>
                                                      Edit
                                                </Link>
                                         </div>
                                         <div className="card-body">
                                                <p>{note.description}</p>
                                                <p>{note.author}</p>
                                                <p>{format(note.date)}</p>
                                         </div>
                                         <div className="card-footer">
                                               <button 
                                                      className="btn btn-danger"
                                                      onClick={() => deleteNote(note._id)}>
                                                     Delete
                                               </button>
                                         </div>
                                   </div>
                             </div>
                       ))
                 }
           </div>
      )
}
