 import React from 'react';
 import {Route, useNavigate,cd} from "react-router-dom";
 import 'bootstrap/dist/css/bootstrap.min.css';


// #Nav bar Imports
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
 

 import AddToDo from './components/add-todo';
 import TodoList from './components/todos-list';
 import Login from './components/login';
 import Signup from './components/signup';

 import TodoDataService from './services/todos';


function App() { 
  const[user, setUser] = React.useState(null);
  const[token, setToken] = React.useState(null);
  const[error, setError] = React.useState("");

  async function login(user){
     TodoDataService.login(user)
     .then(response => {
      setToken(response.data.token);
      setUser(user.username);
      localStorage.setItem('token', response.data.token); 
      localStorage.setItem('user', user.username);
      setError('');
     })
     .catch(e => { 
      console.log('login', e);
      setError(e.toString());
     });
  }

  async function logout(){
     setToken("");
     setUser("");
     localStorage.setItem('token','');
     localStorage.setItem('user', '');
  }

  async function signup(user){
    console.log("test ...");
    TodoDataService.signup(user)
    .then(response => {
      setToken(response.data.token);
      setUser(user.username);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', user.username);
    })
    .catch(e => {
      console.log(e);
      setError(e.toString());
    })
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">ToDo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link className="nav-link" to={"/"}>Todos</Link>
            { user ? (
            <Link className="nav-link" to="/login" onClick={logout}>Logout ({user})</Link>
            ):(
            <>
            <Link className="nav-link" to="/login" >Login</Link>
            <Link className="nav-link" to={"/signup"}>Sign Up</Link>
            </>
            )} 
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


    <div className='container mt-4'>
      <Switch>
        <Route exact path={'/'} render={
          (props) => <TodoList {...props} token = {token} />
        }>
        </Route>

        <Route exact path="/todos/create" render={
          (props) => <AddToDo {...props} token = {token} />
        }></Route>

        <Route exact path="/todos/:id/" render={
          (props) => <AddToDo {...props} token = {token} />
        }></Route>


        <Route exact path="/login" render={
          (props) => <Login {...props} login = {login} />
        }></Route>

        <Route exact path="/signup" render={
          (props) => <Signup {...props} signup = {signup} />
        }></Route>
      </Switch>        
    </div>

    <footer className='text-center text-lg-start bg-light text-muted mt-4'>
        <div className='text-center p-4'>
        &copy; Copyright - <a target='_blank' className='text-rest fw-bold text-decoration-none' href='https://twitter.com/NKESHIMANACarm3'>
            Carmel1 Nkeshimana
          </a> - <a target='_blank' className='text-reset fw-bold text-decoration-none' href='https://twitter.com/IUCEA'>
            IUCEA
          </a>
        </div>
    </footer>

  </div>
  );
}

export default App;






// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import TodoList from './components/todos-list';
// import Login from './components/login';
// import Signup from './components/signup'; 
// import Navbar from './components/navigation';
// import Home from './components/home';

// function App() {
//   console.log(window.location.pathname);
  
//   return (
//   <div className='App'>
//     <Navbar />
//     <div className='container'>
//         <Routes>
//           <Route path='/'  element={<Home />}/>
//           <Route path='/login'  element={<Login />}/>
//           <Route path='/signup'  element={<Signup />}/>
//         </Routes>
//     </div>
//   </div>
//   );
// }

// export default App;