import React, { useState } from 'react';
import './App.css';
import logo from './download.png';
import pic from './reverse-svgrepo-com.svg'

// To Do List App
function ToDoList() {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('');   
  const [reverseSort, setReverseSort] = useState(false); 
  const [activeTab, setActiveTab] = useState('Tasks');
  const [isOpen, setIsOpen] = useState(false);

  

  const togglePopup = () => {
    setIsOpen(!isOpen);                // If the button is clicked, then toggle the state of isOpen
  };

  function handleTaskInput(event) {
    setTask(event.target.value);      // If input from the user, then use event.target.value
  }

  function handleDescriptionInput(event) {
    setDescription(event.target.value);
  }

  function handleDateInput(event) {
    setDate(event.target.value);
  }

  function addTask() {            // Add a task to the list 
    if (task && !tasks.some(item => item.task === task)) {    // If the task is not empty and the task is not already in the list
      const newTask = {       // Create a new task object
        id: tasks.length,       // The id is the length of the tasks array
        task,
        description,
        date
      };
      setTasks([...tasks, newTask]);    // Add the new task to the tasks array
      setTask('');     // Reset the task field
      setDescription('');
      setDate('');
    } else {
      alert("Task already exists or task field is empty");
    }
    setIsOpen(!isOpen);         // Close the popup
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

  function removeTask(index) {    // Remove a task from the list
    const newTasks = [...tasks];      // Create a new array of tasks
    newTasks.splice(index, 1);      // Remove the task at the given index 
    setTasks(newTasks);             // Update the tasks array
  }

  function completeTask(index) {          // Complete a task
    const taskToComplete = tasks[index];      // Get the task to complete
    setCompleted([...completed, taskToComplete]);       // Add the task to the completed array
    removeTask(index);                      // Remove the task from the tasks array
  }

  function deleteCompleted(index) {     // Delete a completed task
    const newCompleted = [...completed];      // Create a new array of completed tasks
    newCompleted.splice(index, 1);      // Remove the completed task at the given index
    setCompleted(newCompleted);         // Update the completed array
  }

  function handleReverseSort() {      // Reverse the order of the sorted tasks
    setReverseSort(!reverseSort);   // Toggle the state of reverseSort
  }

  function handleSortChange(event) {
    setSortCriteria(event.target.value);      // Changes the sort criteria
    setReverseSort(false);                    // Reset the reverseSort state so that it is in ascending order
  }
  
  const sortedTasks = tasks.sort((a, b) => {    // Sort the tasks array
    if (sortCriteria === 'Task') {                // Sort based on the sortCriteria
      return a.task.localeCompare(b.task);        // Compare the task names
    } else if (sortCriteria === 'Date') {         // Compare the dates
      return a.date.localeCompare(b.date);        // Compare the dates
    } else if (sortCriteria === 'Description') {
      return a.description.localeCompare(b.description);
    } else if (sortCriteria === 'Index') {          // Compare the ids
      return a.id - b.id;                           // a.id - b.id will reverse the order of the ids
    }
    return 0;       // If the sortCriteria is empty, then return 0
  });

  if (reverseSort) {
    sortedTasks.reverse(); // Reverse the order of the sorted
  }






  return (
    <div>
      <h1 className="Title">ToDo List <img src={logo} alt="Logo" className="Logo" /></h1>
      <div className="Main">
        
    
        <h1 className="Completed-Title">Add a Task</h1>
        <div className="adding-tasks">
      
          <button onClick={togglePopup} className="Add">Add</button>

          {isOpen && (        // If isOpen is true, then display the popup
            <div className="modal">     
              <div className="overlay">         

                <button onClick={togglePopup} className="close">X</button>
                <h2>What Is The Task?</h2>
                <input type="text" value={task} onChange={handleTaskInput} className="Text" placeholder='Task'/>
                <br />

                <h2>Description?</h2>
                <input type="text" value={description} onChange={handleDescriptionInput} className="Description" placeholder='Description'/>
                <br />
                <h2>Date?</h2>
                <input type="date" value={date} onChange={handleDateInput} className="Date"/>
                <button onClick={addTask} className="pop-up-add">Add</button>

              </div>
            </div>
          )}
        </div>
        <br />
        <div className="Filter">              
        <button onClick={handleReverseSort} className="SortButton"><img src={pic} alt="Pic" className="Pic" /></button>     

  <select onChange={handleSortChange} className="SortSelect">     
    <option value="">Sort by</option>
    <option value="Task">Task Name</option>
    <option value="Date">Date</option>
    <option value="Description">Description</option>
    <option value="Index">Index</option>
  </select>
</div>
<div className="Tabs">
  <nav class="tab-nav">
    <ul class="tab-list">
      <li><button  className="tab" onClick={() => setActiveTab('tasks')}>Tasks</button></li>               {/* If the button is clicked, then set the activeTab to 'tasks'  so that
                                                                                                            it uses the Active section in IF Statement */}
      <li><button  className="tab" onClick={() => setActiveTab('completed')}>Completed Tasks</button></li>  {/* If the button is clicked, then set the activeTab to 'completed'  so that
                                                                                                            it uses the Completed section in IF Statement */}
    </ul>
  </nav>
  {activeTab === 'tasks' ? (              // If the activeTab is 'tasks', then display the tasks
            <div>
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
                  {sortedTasks.map((item, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#e7eef1' : '#ffffff' }}>
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
            </div>
          ) : (       // If the activeTab is 'completed', then display the completed tasks
            <div>
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
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#e7eef1' : '#ffffff' }}>
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
          )}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
