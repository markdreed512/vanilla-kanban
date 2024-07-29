document.querySelector('#add_new_todo_btn').addEventListener('click', addNewTodo)
document.querySelector('.board').addEventListener('dragover', e => e.preventDefault())
document.getElementById('toggle-switch').addEventListener('change', handleToggle);
document.querySelectorAll('.tasks').forEach(column => {
    this.addEventListener('drop', handleDrop)
})
let todoTaskArr = JSON.parse(localStorage.getItem('kanbanTodoTaskArr')) || []
let inProgressTaskArr = JSON.parse(localStorage.getItem('kanbanInProgressTaskArr')) || []
let completeTaskArr = JSON.parse(localStorage.getItem('kanbanCompleteTaskArr')) || []
function saveTodoTasks(){
    todoTaskArr = []
    const todoTasks = document.querySelectorAll('#todo_column .task')
    todoTasks.forEach(todo => {
        const taskData = {
            uid: todo.id.split("_")[1],
            title: todo.childNodes[5].innerText,
            description: todo.childNodes[9].innerText,
            column: "todo_column"
        }
        todoTaskArr.push(taskData)
    })
    localStorage.setItem("kanbanTodoTaskArr", JSON.stringify(todoTaskArr))
}
function saveInProgressTasks(){
    inProgressTaskArr = []
    const inProgressTasks = document.querySelectorAll('#in_progress_column .task')
    inProgressTasks.forEach(task => {
        const taskData = {
            uid: task.id.split("_")[1],
            title: task.childNodes[5].innerText,
            description: task.childNodes[9].innerText,
            column: "in_progress_column"
        }
        inProgressTaskArr.push(taskData)
    })
    localStorage.setItem("kanbanInProgressTaskArr", JSON.stringify(inProgressTaskArr))
}
function saveCompleteTasks(){
    completeTaskArr = []
    const completeTasks = document.querySelectorAll('#complete_column .task')
    completeTasks.forEach(task => {
        const taskData = {
            uid: task.id.split("_")[1],
            title: task.childNodes[5].innerText,
            description: task.childNodes[9].innerText,
            column: "complete_column"
        }
        completeTaskArr.push(taskData)
    })
    localStorage.setItem("kanbanCompleteTaskArr", JSON.stringify(completeTaskArr))
}
function saveAllTasks(){
    saveTodoTasks()
    saveInProgressTasks()
    saveCompleteTasks()
}
function handleTitleBlur(e){
    if(e.target.value){
        const uid = e.target.id.split('_')[1]
        document.getElementById(`h2_${uid}`).innerText = e.target.value
        e.target.classList.add('hidden')
        document.getElementById(`h2_${uid}`).classList.remove('hidden')
        saveTodoTasks()
    }
}
function handleDescriptionBlur(e){
    if(e.target.value){
        const uid = e.target.id.split('_')[1]
        document.getElementById(`p_${uid}`).innerText = e.target.value
        e.target.classList.add('hidden')
        document.getElementById(`p_${uid}`).classList.remove('hidden')
        saveTodoTasks()
    }
}
function handleTitleClick(e){
    const uid = e.target.id.split('_')[1]
    const text = e.target.innerText
    const titleInput = document.getElementById(`title_${uid}`)
    titleInput.value = text
    titleInput.classList.remove('hidden')
    e.target.classList.add('hidden')
}
function handleDescriptionClick(e){
    const uid = e.target.id.split('_')[1]
    const text = e.target.innerText
    const textArea = document.getElementById(`description_${uid}`)
    textArea.value = text
    textArea.classList.remove('hidden')
    e.target.classList.add('hidden')
}
function handleDeleteClick(e){
    const uid = e.target.id.split('_')[1]
    console.log('delete ' + uid)
    todoTaskArr = todoTaskArr.filter(todo => {
        return todo.uid !== uid
    })
    inProgressTaskArr= inProgressTaskArr.filter(todo => {
        return todo.uid !== uid
    })
    completeTaskArr= completeTaskArr.filter(todo => {
        return todo.uid !== uid
    })
    document.querySelector(`#task_${uid}`).remove()
    saveAllTasks()
}
let draggedCard
function handleDragStart(e){
    draggedCard = e.target
}
function handleDrop(e){
    e.target.append(draggedCard)
    saveAllTasks()
}
function handleToggle(){
    if (this.checked) {
        document.body.classList.add('mark-mode');
    } else {
        document.body.classList.remove('mark-mode');
    }
}
function addTaskListeners(id){
    document.querySelector(`#title_${id}`).addEventListener('blur', handleTitleBlur)
    document.querySelector(`#h2_${id}`).addEventListener('click', handleTitleClick)
    document.querySelector(`#description_${id}`).addEventListener('blur', handleDescriptionBlur)
    document.querySelector(`#p_${id}`).addEventListener('click', handleDescriptionClick)
    document.querySelector(`#delete_${id}`).addEventListener('click', handleDeleteClick)
    document.querySelector(`#task_${id}`).addEventListener('dragstart', handleDragStart)
}
function addNewTodo(){
    const uid = Date.now()
    const newTask = `
        <div class="task" id="task_${uid}" draggable="true">
            <button id="delete_${uid}" class="delete-btn">X</button>
            <input id="title_${uid}" type="text" placeholder="title"/>
            <h2 id="h2_${uid}" class="hidden"></h2>
            <textarea id="description_${uid}" placeholder="description"/></textarea>
            <p id="p_${uid}" class="hidden"></p>
        </div>
    `
    document.querySelector('.todo.tasks').insertAdjacentHTML('beforeend', newTask)
    addTaskListeners(uid)
}
function displayTasks(tasks, selector){
    if(tasks){
        tasks.forEach(task => {
            const taskHtml = `
                <div class="task" id="task_${task.uid}" draggable="true">
                    <button id="delete_${task.uid}" class="delete-btn">X</button>
                    <input id="title_${task.uid}" type="text" placeholder="title" class="hidden"/>
                    <h2 id="h2_${task.uid}">${task.title}</h2>
                    <textarea id="description_${task.uid}" placeholder="description" class="hidden"/></textarea>
                    <p id="p_${task.uid}">${task.description}</p>
                </div>
            `
            document.querySelector(selector).insertAdjacentHTML('beforeend', taskHtml)
            addTaskListeners(task.uid)
        })
    }
    
}
function init(){
console.log('init.')
   displayTasks(JSON.parse(localStorage.getItem('kanbanTodoTaskArr')), '#todo_tasks') 
   displayTasks(JSON.parse(localStorage.getItem('kanbanInProgressTaskArr')), '#in_progress_tasks') 
   displayTasks(JSON.parse(localStorage.getItem('kanbanCompleteTaskArr')), '#complete_tasks') 
}

init()
