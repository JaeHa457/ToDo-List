import React, { useState } from 'react';
import './App.css';
import logo from './download.png';

// To Do List App
function ToDoList() {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);

  function handleTaskInput(event) {
    setTask(event.target.value);
  }

  function handleDescriptionInput(event) {
    setDescription(event.target.value);
  }

  function handleDateInput(event) {
    setDate(event.target.value);
  }

  function addTask() {
    if (task && !tasks.some(item => item.task === task)) {
      const newTask = {
        task,
        description,
        date
      };
      setTasks([...tasks, newTask]);
      setTask('');
      setDescription('');
      setDate('');
    } else {
      alert("Task already exists or task field is empty");
    }
  }

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = String(dateObj.getFullYear()); 
    if (dateString === '') {
      return '';
    }
    return `${day}/${month}/${year}`;
  };

  function removeTask(index) {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  function completeTask(index) {
    const taskToComplete = tasks[index];
    setCompleted([...completed, taskToComplete]);
    removeTask(index);
  }

  function deleteCompleted(index) {
    const newCompleted = [...completed];
    newCompleted.splice(index, 1);
    setCompleted(newCompleted);
  }

  return (
    <div>
      <h1 className="Title">ToDo List <img src={logo} alt="Logo" className="Logo" /></h1>
      <div className="Main">
        
    
        <h1 className="Completed-Title">Add a Task</h1>
        <div className="adding-tasks">
          <input type="text" value={task} onChange={handleTaskInput} className="Text" placeholder='Task'/>
          <input type="text" value={description} onChange={handleDescriptionInput} className="Description" placeholder='Description'/>
          <input type="date" value={date} onChange={handleDateInput} className="Date"/>
          <button onClick={addTask} className="Add">Add</button>
        </div>
        <br />
        <h1 className="Completed-Title">Tasks</h1>
        <table className="Table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          
          <tbody>
            {tasks.map((item, index) => (
              <tr key={index} style={{ 
                backgroundColor: index % 2 === 0 ? '#e7eef1' : '#ffffff'}}>
                <td>{item.task}</td>
                <td>{item.description}</td>
                <td>{formatDate(item.date)}</td>
                <td>
                  <button className="Delete" onClick={() => removeTask(index)}>Delete</button>
                  <button className="Complete" onClick={() => completeTask(index)}>Complete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <h1 className="Completed-Title">Completed Tasks</h1>
        <table className="Table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {completed.map((item, index) => (
              <tr key={index}  style={{ 
            backgroundColor: index % 2 === 0 ? '#e7eef1' : '#ffffff'}}>
                <td>{item.task}</td>
                <td>{item.description}</td>
                <td>{formatDate(item.date)}</td>
                <td>
                  <button className="Delete" onClick={() => deleteCompleted(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ToDoList;