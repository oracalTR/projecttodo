const headerInput = document.querySelector('.header-input');
const headerButton = document.querySelector('.header-button');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const todoContainer = document.querySelector('.todo-container');

let todoData = [];


const appToDO = () => {
    
    const getStorage = () => {
        if(localStorage.getItem('todoItems')) {
            let data = localStorage.getItem('todoItems');
            data = JSON.parse(data);
            data.forEach(elem => {
                todoData.push(elem);
            });
            render(data);
        }
    };

    const setStorage = () => {
        if(localStorage.getItem('todoItems')) {
            localStorage.removeItem('todoItems');
        }
        localStorage.setItem('todoItems', `${JSON.stringify(todoData)}`);
        render(todoData);
    };

    const render = (data) => {
        todoList.innerHTML = '';
        todoCompleted.innerHTML = '';
        data.forEach((elem, index) => {
            if(!elem.completed) {
                todoList.insertAdjacentHTML('beforeend', `
                <li class="todo-item">
				<span class="text-todo">${elem.text}</span>
				<div class="todo-buttons">
					<button class="todo-remove" data-id="${index}"></button>
					<button class="todo-complete" data-id="${index}"></button>
				</div>
			    </li>`
                );
            } else {
                todoCompleted.insertAdjacentHTML('beforeend', `
                <li class="todo-item">
				<span class="text-todo">${elem.text}</span>
				<div class="todo-buttons">
					<button class="todo-remove" data-id="${index}"></button>
					<button class="todo-complete" data-id="${index}"></button>
				</div>
			    </li>`
                );
            }
        });
    };
    
    const init = () => {
        getStorage();
    };

    headerButton.addEventListener('click', event => {
        event.preventDefault();
        if(headerInput.value.trim()) {
            todoData.push(
                {
                    text: headerInput.value,
                    completed: false,
                }
            );
            setStorage();
            headerInput.value = '';
        }
    });

    todoContainer.addEventListener('click', event => {
        event.preventDefault();
        const target = event.target;
        let targetId = event.target.getAttribute('data-id');
        if(target.classList.contains('todo-complete')) {
            if(todoData[targetId].completed) {
                todoData[targetId].completed = false;
            } else {
                todoData[targetId].completed = true;
            }
            setStorage();
        }
        if(target.classList.contains('todo-remove')) {
            todoData.splice(targetId, 1);
            if(todoData.length < 1) {
                localStorage.removeItem('todoItems');
                render(todoData);
            } else {
                setStorage();
            }
        }

        
        // console.log(todoData[targetId].completed);
        // console.log(event.target.getAttribute('data-id'));
    });

    init();
};

// console.log('Данные в массиве', todoData);
appToDO();