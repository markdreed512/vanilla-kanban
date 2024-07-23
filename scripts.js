
document.querySelector('#add_new_todo_btn').addEventListener('click', addNewTodo)
document.querySelector('.board').addEventListener('dragover', e => e.preventDefault())
document.querySelectorAll('.tasks').forEach(column => {
    this.addEventListener('drop', handleDrop)
})
let todos = []
function saveTodoTasks(){
    todos = []
    const todoTasks = document.querySelectorAll('#todo_column .task')
    todoTasks.forEach(todo => {
        console.log(todo.childNodes)
        const taskData = {
            uid: todo.id.split("_")[1],
            title: todo.childNodes[5].innerText,
            description: todo.childNodes[9].innerText,
            column: "todo_column"
        }
        todos.push(taskData)
    })
    localStorage.setItem("kanbanTodos", JSON.stringify(todos))
}
function saveDateToLocalStorage(){
    saveTodoTasks()
}
function handleTitleBlur(e){
    if(e.target.value){
        const uid = e.target.id.split('_')[1]
        document.getElementById(`h2_${uid}`).innerText = e.target.value
        e.target.classList.add('hidden')
        document.getElementById(`h2_${uid}`).classList.remove('hidden')
        saveDateToLocalStorage()
    }
}
function handleDescriptionBlur(e){
    if(e.target.value){
        const uid = e.target.id.split('_')[1]
        document.getElementById(`p_${uid}`).innerText = e.target.value
        e.target.classList.add('hidden')
        document.getElementById(`p_${uid}`).classList.remove('hidden')
        saveDateToLocalStorage()
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
}
let draggedCard
function handleDragStart(e){
    draggedCard = e.target
}
function handleDrop(e){
    console.log("test123")
    e.target.append(draggedCard)
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
function displayStoredTasks(){
    const storedTasks = JSON.parse(localStorage.getItem('kanbanTodos'))
    storedTasks.forEach(task => {
        const taskHtml = `
            <div class="task" id="task_${task.uid}" draggable="true">
                <button id="delete_${task.uid}" class="delete-btn">X</button>
                <input id="title_${task.uid}" type="text" placeholder="title" class="hidden"/>
                <h2 id="h2_${task.uid}">${task.title}</h2>
                <textarea id="description_${task.uid}" placeholder="description" class="hidden"/></textarea>
                <p id="p_${task.uid}">${task.description}</p>
            </div>
        `
        document.querySelector('.todo.tasks').insertAdjacentHTML('beforeend', taskHtml)
        addTaskListeners(task.uid)
    })
}
displayStoredTasks()