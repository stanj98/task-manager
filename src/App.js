import React, {useState} from 'react'

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
    <div>
      <h1>Focalist</h1>
      <p>Priotize your tasks instantly</p>
      <input type='text' value={input} onChange = {(e) => setInput(e.target.value)} required />
      <button onClick={() => addToDo(input)}>Add</button>
      <ul>
        <form method='POST' id='task-list' onSubmit={handleSubmit}>
          {list.map((task) => (
            <li key = {task.id}>
              {task.todo}
              <label>Important</label>
              <input type='checkbox' checked={task.important} onChange={(event) => updateImportant(event, task.id)} />
              <label>Urgent</label>
              <input type='checkbox' checked={task.urgent} onChange={(event) => updateUrgent(event, task.id)} />
              <button onClick={() => editToDo(task.id)}>Edit</button>
              <button onClick={() => deleteToDo(task.id)}>Delete</button>
            </li>
          ))}
          {error && <p>{error}</p>}
          {list.length > 0 ? <input type="submit" placeholder="Prioritize" /> : null}
        </form>
      </ul>
      {/* create a clean way to display tasks, make UI */}
      <p>Do them</p>
      <ul>
      {doTasks.map((task) => (
            <li key = {task.id}>
              {task.todo}
            </li>
          ))}
      </ul>
      <p>Schedule them</p>
      <ul>
      {scheduleTasks.map((task) => (
            <li key = {task.id}>
              {task.todo}
            </li>
          ))}
      </ul>
      <p>Delegate them</p>
      <ul>
      {delegateTasks.map((task) => (
            <li key = {task.id}>
              {task.todo}
            </li>
          ))}
      </ul>
      <p>Delete them</p>
      <ul>
      {deleteTasks.map((task) => (
            <li key = {task.id}>
              {task.todo}
            </li>
          ))}
      </ul>

    </div>
  )
}

export default App