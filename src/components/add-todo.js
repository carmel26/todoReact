import React, {useState} from 'react';
import TodoDataService from '../services/todos';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';


const AddToDo = props => {
 
    let editing = false;
    let initialTodoTitle = "";
    let initialTodoMemo = "";

    if(props.location.state && props.location.state.currentTodo){
        editing = true;
        initialTodoTitle = props.location.state.currentTodo.title;
        initialTodoMemo = props.location.state.currentTodo.memo;
    }
    
    const[title, setTitle] = useState(initialTodoTitle);
    const[memo, setMemo] = useState(initialTodoMemo);
    const[submitted, setSubmitted] = useState(false);

    const onChangeTitle = e => {
        const title = e.target.value;
        setTitle(title);
    }

    const onChangeMemo = e => {
        const memo = e.target.value;
        setMemo(memo);
    }

    const saveTodo = () => {
        var data = {
            title : title,
            memo : memo,
            complete : false,
        }

   

        if(editing){
            TodoDataService.updateTodo(
                props.location.state.currentTodo.id,
                data, props.token
            ).then( response => {
                setSubmitted(true);
                console.log(response.data);
            }).catch(e => {
                console.log("Error: ",e);
            })
        }else{
                   TodoDataService.createTodo(data, props.token)
            .then(response => {
                setSubmitted(true);
                  props.history.push('/');
            })
            .catch(e => {
                console.log(e);
            }) 
        }
        

    }

    return(
        <Container>
            {/* {submitted ? (
                <div>
                    <h4>To do submitted successfully</h4>
                    <Link to = {"/"} >
                        Back the list
                    </Link>
                </div>
            ):( */}
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label>{editing ? "Edit" : "Create"} Todo</Form.Label>
                        <Form.Control type='text' 
                         required 
                         placeholder='eg: By gift today' 
                         value={title}
                         onChange={onChangeTitle} />
                    </Form.Group>

                     <Form.Group className='mb-3'>
                            <Form.Label>Description: </Form.Label>
                            <Form.Control
                                as= "textarea"
                                row = {3}
                                value={memo}
                                onChange={onChangeMemo} /> 
                    </Form.Group>

                    <Button variant='info' onClick={saveTodo} >
                        {editing ? "Edit" : "Add"} Todo
                    </Button>
                </Form>
            {/* ) */}
          {/* } */}
        </Container>
    );
}


export default AddToDo;