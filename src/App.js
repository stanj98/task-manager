import React, {useState} from 'react';
import { Container, Button, Row, Col, Form, InputGroup, ListGroup } from 'react-bootstrap';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import './App.css';


function App() {

  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [doTasks, setDoTasks] = useState([]);
  const [scheduleTasks, setScheduleTasks] = useState([]);
  const [delegateTasks, setDelegateTasks] = useState([]);
  const [deleteTasks, setDeleteTasks] = useState([]);

  const addToDo = (todo) => {

    if (todo.trim() === '') {
      setError('Name is required');
      return;
    }
    //reset the error to empty string if test case passed
    setError("");
    const newToDo = {
      id: Math.random(),
      todo: todo,
      important: false,
      urgent: false
    }

    setList([...list, newToDo])

    setInput("");
  }

  const editToDo = (id) => {
    //bring text to input field
    let item = list.find(item => item.id === id);
    //delete current list and update list with new input from user
    deleteToDo(id);
    setInput(item.todo);
  }

  const deleteToDo = (id) => {
    const newList = list.filter((todo) => todo.id !== id);
    setList(newList);
  }

  const updateImportant = (e, id) => {
    const updatedTasks = list.map((todo) => {
      if (todo.id === id) {
        return { ...todo, important: e.target.checked };
      }
      return todo;
    });
    setList(updatedTasks);
  }

  const updateUrgent = (e, id) => {
    const updatedTasks = list.map((todo) => {
      if (todo.id === id) {
        return { ...todo, urgent: e.target.checked };
      }
      return todo;
    });
    setList(updatedTasks);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //empty current lists and accomodate new task priorities
    setDoTasks([]);
    setScheduleTasks([]);
    setDelegateTasks([]);
    setDeleteTasks([]);

    const newDoTasks = list.filter((todo) => todo.important && todo.urgent);
    setDoTasks(newDoTasks);

    const newScheduleTasks = list.filter((todo) => todo.important && !todo.urgent);
    setScheduleTasks(newScheduleTasks);

    const newDelegateTasks = list.filter((todo) => !todo.important && todo.urgent);
    setDelegateTasks(newDelegateTasks);

    const newDeleteTasks = list.filter((todo) => !todo.important && !todo.urgent);
    setDeleteTasks(newDeleteTasks);
  }

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Container className="mt-3 mx-auto" fluid>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>Task Manager</h1>
          </Col>
        </Row>
      </Container>
      <Container className="mt-3" fluid>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Form>
              <Form.Group>
                <Form.Label>Enter your task:</Form.Label>
                <InputGroup>
                  <Form.Control size="lg" type="text" value={input} onChange = {(e) => setInput(e.target.value)} placeholder="Clean room" />
                  <Button onClick={() => addToDo(input)} variant="success">Add</Button>
                </InputGroup>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container className='mt-3'>
        {/* Split row into 2 cols -> left side handles task list and right side displays matrix */}
        <Row>
          {/* Tasks come below */}
          <Col md="7">
            <Form method='POST' id='task-list' onSubmit={handleSubmit}>
              <Row className="justify-content-md-center">
                <Col md="12">
                  <div style={{ height: '400px', overflow: 'auto' }}>
                      <Form.Group>
                        {list.map((task) => (
                          <ListGroup>
                              <ListGroup.Item key = {task.id} className="d-flex justify-content-between align-items-center">
                                {task.todo}
                                <div>
                                  <Form.Check inline type='checkbox' checked={task.important} onChange={(event) => updateImportant(event, task.id)} label="Important" className="mr-3" />
                                  <Form.Check inline type='checkbox' checked={task.urgent} onChange={(event) => updateUrgent(event, task.id)} label="Urgent" className="mr-3" />
                                  <Button className="mr-2" onClick={() => editToDo(task.id)} variant="warning">&#128393;</Button>
                                  <Button style={{marginLeft: '2px'}} onClick={() => deleteToDo(task.id)} variant="danger">&times;</Button>
                                </div>
                              </ListGroup.Item>
                          </ListGroup>
                        ))}
                      </Form.Group>
                  </div>
                </Col>
              </Row>
              {error && <p>{error}</p>}
              {list.length > 0 ? <Button size="md" variant="primary" type="submit" value={input} onChange = {(e) => setInput(e.target.value)}>Prioritize</Button> : null}
            </Form>
          </Col>
          {/* Matrix comes below */}
          <Col>
            <div style={{ height: '400px', overflow: 'auto' }}>
              <Row>
                <Col xs={6}>
                  {doTasks.length ? (
                    <div>
                      <h3>Do them</h3>
                      {doTasks.map((task) => (
                        <ListGroup>
                          <ListGroup.Item>
                            {task.todo}
                          </ListGroup.Item>
                        </ListGroup>
                      ))}
                    </div>
                  ) : null}
                </Col>
                <Col xs={6}>
                  {scheduleTasks.length ? (
                    <div>
                      <h3>Schedule them</h3>
                      {scheduleTasks.map((task) => (
                        <ListGroup>
                          <ListGroup.Item>
                            {task.todo}
                          </ListGroup.Item>
                        </ListGroup>
                      ))}
                    </div>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  {delegateTasks.length ? (
                    <div>
                      <h3>Delegate them</h3>
                      {delegateTasks.map((task) => (
                        <ListGroup>
                          <ListGroup.Item>
                            {task.todo}
                          </ListGroup.Item>
                        </ListGroup>
                      ))}
                    </div>
                  ) : null}
                </Col>
                <Col xs={6}>
                  {deleteTasks.length ? (
                    <div>
                      <h3>Delete them</h3>
                      {deleteTasks.map((task) => (
                        <ListGroup>
                          <ListGroup.Item>
                            {task.todo}
                          </ListGroup.Item>
                        </ListGroup>
                      ))}
                    </div>
                  ) : null}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  )
}

export default App