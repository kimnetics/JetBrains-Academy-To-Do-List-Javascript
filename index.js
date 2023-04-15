// Load task list from local storage.
function loadTaskList () {
  const taskList = JSON.parse(localStorage.getItem('tasks')) || []

  for (let i = 0; i < taskList.length; i++) {
    let listEntry = taskList[i]
    addListElement(listEntry.text, listEntry.done)
  }
}

// Save task list to local storage.
function saveTaskList () {
  const taskList = getTaskList()

  localStorage.setItem('tasks', JSON.stringify(taskList))
}

// Get task list from elements.
function getTaskList () {
  const taskList = []

  const ulElement = document.getElementById('task-list')
  const liElements = ulElement.children
  for (let i = 0; i < liElements.length; i++) {
    const checkboxInputElement = liElements[i].querySelector('.checkbox')
    const spanElement = liElements[i].querySelector('.task')
    const listEntry = {}
    listEntry.text = spanElement.textContent
    listEntry.done = checkboxInputElement.checked
    taskList.push(listEntry)
  }

  return taskList
}

// Add task to bottom of list.
function addTask () {
  const taskInputElement = document.getElementById('input-task')
  addListElement(taskInputElement.value, false)
  taskInputElement.value = ''

  saveTaskList()
}

// Add list element.
function addListElement (text, done) {
  const listItemElement = document.createElement('li')

  const checkboxInputElement = document.createElement('input')
  checkboxInputElement.setAttribute('type', 'checkbox')
  checkboxInputElement.setAttribute('class', 'checkbox')
  checkboxInputElement.checked = done
  checkboxInputElement.addEventListener('click', toggleDone)
  listItemElement.append(checkboxInputElement)

  const spanElement = document.createElement('span')
  spanElement.setAttribute('class', 'task')
  spanElement.textContent = text
  listItemElement.append(spanElement)

  const buttonElement = document.createElement('button')
  buttonElement.setAttribute('type', 'button')
  buttonElement.setAttribute('class', 'delete-btn')
  buttonElement.addEventListener('click', deleteTask)
  listItemElement.append(buttonElement)

  const ulElement = document.getElementById('task-list')
  ulElement.append(listItemElement)
}

// Delete task from list.
function deleteTask (event) {
  const listItemElement = event.target.parentElement
  listItemElement.remove()

  saveTaskList()
}

// Toggle task done class.
function toggleDone (event) {
  const listItemElement = event.target.parentElement
  const spanElement = listItemElement.querySelector('.task')
  spanElement.classList.toggle('done')

  saveTaskList()
}

// Add event listeners.
document.getElementById('add-task-button').addEventListener('click', addTask)

// Load task list.
loadTaskList()
