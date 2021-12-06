
// STYLES
import 'bootstrap/dist/css/bootstrap.min.css'

// COMPONENTS
import { CreateNote } from './components/CreateNote';
import { CreateUser } from './components/CreateUser';
import { Navigation } from './components/Navigation';
import { NotesList } from './components/NotesList';

import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
        <Router>
          <Navigation/>

          <div className="container p-4">
              <Route exact path='/' component={NotesList} />
              <Route path='/edit/:id' component={CreateNote} />
              <Route path='/create' component={CreateNote} />
              <Route path='/user' component={CreateUser} />
          </div>
        </Router>
    </div>
  )
}

export default App;
