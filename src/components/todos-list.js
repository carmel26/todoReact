import React, {useState, useEffect} from 'react';
import TodoDataServices from '../services/todos';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import moment from 'moment';
// import Toast from './toast';


const TodosList = props => {
    console.log("Token ");
    console.log(props.token);
    const [todos, setTodos] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        retrieveTodos();
    }, [props.token]);

    // get todoList
    const retrieveTodos = () => {
        TodoDataServices.getAll(props.token)
        .then(response => {
            setTodos(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    // delete a todo
    const deleteTodo = (todoId) => {
        TodoDataServices.deleteTodo(todoId, props.token)
            .then(response => {
                retrieveTodos();
            }).catch(e => {
                console.log(e);
            })
    }

    // complete a todo
    const completeTodo = (todoId) => {
        TodoDataServices.completeTodo(todoId, props.token)
          .then(response => {
            retrieveTodos();
            console.log("CompleteTodo ", todoId);
          }).catch(e => {
            console.log(e);
          })
    }

    const showToast = () => {
        setShow(true);
      };
    
      const hideToast = () => {
        setShow(false);
      };

    return (
        <Container>
            {props.token == null || props.token === "" ? (
                <Alert variant='warning'>
                    You are not logged in please: <Link to={"/login"}>Login</Link> to see your todos.
                </Alert>
            ): (
                <div>
                    {/* <Toast  show={show} hideToast={hideToast} variant="success">
                        Check it
                    </Toast> */}
                    <Link to = {"/todos/create"}>
                        <Button variant='outline-info' className='mb-3'>
                            Add To-Do
                        </Button>
                    </Link>
                    {todos.map((todo) => {
                        var classValue = "";
                        var nameComplete = "Complete";
                        var buttonCompleteClass = "outline-success";
                        if (todo.completed) {
                            classValue = "text-decoration-line-through";
                            nameComplete = "Revert back";
                            buttonCompleteClass = "outline-warning";
                        }
                        return(
                            <Card key={todo.id} className='mb-3'>
                                <Card.Body>
                                    <div className={classValue}>
                                        <Card.Title>{todo.title}</Card.Title>
                                        <Card.Text><b>Memo: </b> {todo.memo}</Card.Text>
                                        <Card.Text><b>Date created: </b> {moment(todo.created).format("Do MMMM YYYY")}</Card.Text>
                                    </div>
                                    {!todo.completed && 
                                    <Link to={{
                                        pathname: "/todos/"+todo.id,
                                        state: {
                                            currentTodo: todo
                                        }
                                    }}>
                                        <Button variant ="outline-info" className="me-2">
                                            Edit
                                        </Button>
                                    </Link>}
                                    <Button variant ="outline-danger" 
                                        onClick={() => {
                                            deleteTodo(todo.id)
                                        }} className='me-2'>
                                            Delete
                                    </Button>
                                    <Button variant={buttonCompleteClass} onClick={() => completeTodo(todo.id)} >
                                        {nameComplete}
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
               </div>
            )}
        </Container>
    );
}

export default TodosList;