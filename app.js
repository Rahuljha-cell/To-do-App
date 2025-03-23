document.addEventListener("DOMContentLoaded", ()=> {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task))
        updateTasksList();
        updateStats();
    }
});
let editingIndex = null; //Tracks the index of the task being edited
let tasks = [];
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        if (editingIndex !== null) {
            //save the edited task
            tasks[editingIndex].text = text;
            editingIndex = null; //Reset the editing index
        } else {
            //Add a new task
            tasks.push( {text: text, completed: false} );
        }
    }
    updateTasksList();
    updateStats();
    taskInput.value = '';
    saveTasks();
   
};
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();

};
const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    editingIndex = index;//Set the editing index
    //tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();

};
const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks)*100 : 0;


    const progressBar = document.getElementById('progress');
    if (completedTasks > 0) {
        progressBar.style.display = 'block'; // Show the progress bar when a task is completed
        progressBar.style.width = `${progress}%`; // Update the progress bar width
    
    } else {
        progressBar.style.display = 'none'; // Hide the progress bar if no tasks are completed
    }
    //update the task count
    const taskCount = document.getElementById('numbers');
    taskCount.textContent = `${completedTasks} / ${totalTasks}`; //update the count dynamically

    if (tasks.length && completedTasks === totalTasks) {
        blastConfetti();
    } 
};
const updateTasksList = ()=> {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''
    

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
        <div class="task ${task.completed ? 'completed' : ''}">
            <input type="checkbox" class="checkbox" ${
                task.completed ? "checked" : ''
            }>
            <p>${task.text}</p>
        </div>
        <div class="icons">
            <img src="./edit icon image.png" alt="Edit Task">
            <img src="./delete icon image.png" alt="Delete Task">
        </div>
    </div>
        `;// onClick="editTask(${index})"
        
        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));
        listItem.querySelector('.icons img[alt="Edit Task"]').addEventListener('click', () => editTask(index));
        listItem.querySelector('.icons img[alt="Delete Task"]').addEventListener('click', () => deleteTask(index));
        taskList.appendChild(listItem);
      
    });
};
document.getElementById('newTask').addEventListener('click', function(e) {
    e.preventDefault();


    addTask();
});
const blastConfetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
};