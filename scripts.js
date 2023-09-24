// Defining elements
let taskName = document.getElementById("addT");
let addTaskButton = document.getElementById("add");
let searchBox = document.getElementById("search");
let list = document.getElementById("list");
let clearButton = document.getElementById("clear");

// Adding Event Listeners
addTaskButton.addEventListener("click", addTask);
searchBox.addEventListener("keyup", searchIt);
list.addEventListener("click", deleteIt);
clearButton.addEventListener("click", clearAll);
document.addEventListener("DOMContentLoaded", getTasks);

// Define Functions
// Adding
function addTask(e) {
	if (taskName.value === "") {
		alert("Add a Task!");
	} else {
		// Create a li element
		let li = document.createElement("li");
		li.appendChild(document.createTextNode(taskName.value + " "));
		list.appendChild(li);
		// Cross Button
		let link = document.createElement("button");
		link.setAttribute("closeBtn", "Delete the Task");
		link.classList.add("mx-1");
		link.classList.add("hover:underline");
		link.classList.add("text-blue-600");
		link.innerText = "x";
		li.appendChild(link);
        storeTaskinLocalStorage(taskName.value);
		taskName.value = "";
	}
	e.preventDefault();
}

// Deleting
function deleteIt(e) {
	if (e.target.hasAttribute("closeBtn")) {
		if (confirm("Are you sure?")) {
			let ele = e.target.parentElement;
			ele.remove();
            removefromLS(ele);
		}
	}
}

// Searching
function searchIt(e) {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        }
        else {
            task.style.display = "none";
        }
    });
}

// Clearing
function clearAll() {
	if (confirm("Are you Sure?")) {
		// list.innerHTML = "";
		// Faster
		while (list.firstChild) {
			list.removeChild(list.firstChild);
		}
        localStorage.clear();
	}
}

// Store in Local Storage
function storeTaskinLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get from local storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(task => {
        // Create a li element
		let li = document.createElement("li");
		li.appendChild(document.createTextNode(task+ " "));
		list.appendChild(li);
		// Cross Button
		let link = document.createElement("button");
		link.setAttribute("closeBtn", "Delete the Task");
		link.classList.add("mx-1");
		link.classList.add("hover:underline");
		link.classList.add("text-blue-600");
		link.innerText = "x";
		li.appendChild(link);
    });
}

// Remove from Local Storage

function removefromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    let li = taskItem;
    li.removeChild(li.lastChild);
    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}