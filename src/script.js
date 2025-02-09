    document.addEventListener("DOMContentLoaded",()=>{

    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    //the array populates from local storage if there is anything there, else initialize an empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        renderTask(task);
    });


    addTaskButton.addEventListener("click", function(){
        const taskText = todoInput.value.trim();
        if(taskText === "") return;

        const taskObj = {
            "id" : Date.now(),
            "text": taskText,
            "completed": false
        }
        tasks.push(taskObj);
        renderTask(taskObj);
        /*
        //my experiment
        const listItem = document.createElement("li");
        listItem.textContent = taskText;
        todoList.append(listItem);
        listItem.classList.add("pl-2", "p-1","col-span-3","flex", "justify-between", "items-center");
        document.getElementById("todo-list").classList.add("col-span-4");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        listItem.append(deleteButton);
        deleteButton.classList.add("bg-red-600", "hover:bg-red-700","p-1", "rounded-sm");
        */

        saveTaskToLocal();
        todoInput.value = "";
    })

    //task is an object
    function renderTask(task){

        //creation of task
        const listItem = document.createElement("li");
        listItem.setAttribute("data-id",task.id);
        listItem.classList.add("grid", "grid-cols-2", "items-center", "gap-2", "p-1");
        listItem.innerHTML = `
            <span class="col-start-1 col-span-2"><p class="p-2">${task.text}</p></span>
            <button class="col-start-3 col-span-1 bg-red-600 hover:bg-red-700 p-1 rounded-sm">Delete</button>
            
        `;
        todoList.appendChild(listItem);

        //checking off of task
        listItem.addEventListener('click',(e)=>{
            if(e.target.tagName === 'BUTTON') return;
            task.completed = !(task.completed);
            listItem.querySelector('p').classList.toggle("bg-green-800");
            saveTaskToLocal();
        });

        //deletion of task
        listItem.querySelector("button").addEventListener("click",(e)=>{
            e.stopPropagation(); // prevents toggle deletion, so one delete at a time
            
            // the filter method is used to filter all the task that doesn't match with the id of the currently deleted task and then include that in original tasks array
            tasks = tasks.filter((t) => t.id !== tasks.id);
            listItem.remove();
            saveTaskToLocal();
        });

    
    }

    function saveTaskToLocal(){
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }
    })

