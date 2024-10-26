function getTaskFromStorage(){
    retrivedTasks=JSON.parse(localStorage.getItem('Tasks'));
    Tasks=retrivedTasks??[]//to give tasks empty array if the tasks are null
}
function storeTasks(){
    let tasksString=JSON.stringify(Tasks);
    localStorage.setItem('Tasks',tasksString);
}
function CheckIsDone(isDone){
    if (isDone==true){
        return "rgb(49, 147, 52)"
    }else if(isDone==false){
        return "silver"
    }
}
function updateTasks(){
    document.getElementById("tasks").innerHTML=''
    let index=0
    let context=''
    for (task of Tasks){
        context=`<div class="task">
                <div class="task-info" style="padding: 0;line-height: 0;">
                    <h2>${task.title}</h2>
                    <span class="material-symbols-outlined" style="display: inline-block;">
                    event
                    </span>
                    <span style="padding-bottom: 2px;">
                        ${task.date}
                    </span>
                </div>
                <div class="buttons">
                    <button class="round-btn" style="background-color:${CheckIsDone(task.isDone)};" onClick="done(${index})">
                        <span class="material-symbols-outlined">
                            ${task.isDone ?`check`:`close`}
                        </span>
                    </button>
                    <button class="round-btn" style="background-color: lightblue;" onClick="editTask(${index})">
                        <span class="material-symbols-outlined">
                            edit
                        </span>
                    </button>
                    <button class="round-btn" style="background-color: crimson;" onClick="deletTask(${index})">
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </button>
                </div>
            </div>`
            index++
            document.getElementById("tasks").innerHTML+=context
        }
    }
function done(index){
    Tasks[index].isDone=!Tasks[index].isDone;
    storeTasks()
    updateTasks();
    console.log(Tasks)
}
function editTask(index){
    let newTaskTitle=prompt("Enter new task title:",Tasks[index].title);
    let newTaskDate=prompt("Enter new task date:",Tasks[index].date);
    if(newTaskTitle!=null && newTaskDate!=null){
        Tasks[index].title=newTaskTitle;
        Tasks[index].date=newTaskDate;
        storeTasks()
        updateTasks();
    }
}
function deletTask(index){
    let isConfirm=confirm('Are you sure you want to delete this task [ '+Tasks[index].title+' ]?')
    if (isConfirm==true){
        Tasks.splice(index, 1);
        alert("Task deleted.")
        storeTasks()
        updateTasks();
    }
}
function addTask(){
    taskOBJ=prompt("Enter your task:");
    taskDate=new Date()
    if(taskOBJ!=null){
    newTask={"title":taskOBJ,"date":taskDate.getDate()+"-"+(taskDate.getMonth()+1)+"-"+taskDate.getFullYear(),"isDone":false};
    Tasks.push(newTask);
    storeTasks()
}
    updateTasks();
};