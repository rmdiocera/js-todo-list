var input = document.getElementById('todo-form');
var items = document.getElementById('todo-list');
var filter = document.getElementById('todo-filter');

input.addEventListener('submit', addItem);
items.addEventListener('click', modifyItem);
items.addEventListener('click', saveItem);
filter.addEventListener('keyup', filterItems);

function addItem(e) {
    e.preventDefault();

    var todoTextBox = document.getElementById('item'); 
    var todoInput = document.getElementById('item').value;
    var inputForm = document.getElementById('input-form'); 
    
    // var todoList = e.target.parentElement;
    // items.removeChild(todoList);

    var newToDoItem = document.createElement('li');
    newToDoItem.className = 'list-group-item';
    newToDoItem.appendChild(document.createTextNode(todoInput));
    items.insertBefore(newToDoItem, inputForm);    

    var btnGroup = document.createElement('div');
    btnGroup.className = "float-right";
    newToDoItem.appendChild(btnGroup);

    var mod = document.createElement('button');
    mod.className = 'btn btn-success btn-sm mr-2 change';
    mod.appendChild(document.createTextNode('Change'));

    var del = document.createElement('button');
    del.className = 'btn btn-danger btn-sm delete';
    del.appendChild(document.createTextNode('Remove'));

    btnGroup.append(mod, del);

    todoTextBox.value = '';
}


function modifyItem(e) {
    if (e.target.classList.contains('delete')) {
        var newListItem = e.target.parentElement.parentElement;
        items.removeChild(newListItem);
    } else if (e.target.classList.contains('change')) {
        var listText = e.target.parentElement.parentElement;
        var btnGroup = e.target.parentElement;
        btnGroup.remove();

        localStorage.setItem('oldValue', listText.innerText);
        console.log(localStorage.getItem('oldValue'));

        var changeText = document.createElement('input');
        var toNewText = listText.innerText;
        changeText.id = "change"
        changeText.type = "text";
        changeText.className = 'form-control float-left col-4';
        changeText.setAttribute('value', toNewText);
        listText.innerText = "";
        listText.appendChild(changeText);

        var btnGroup = document.createElement('div');
        btnGroup.className = "float-right";
        listText.appendChild(btnGroup);

        var mod = document.createElement('button');
        mod.className = 'btn btn-success btn-sm mr-2 save';
        mod.appendChild(document.createTextNode('Save'));

        var del = document.createElement('button');
        del.className = 'btn btn-danger btn-sm discard';
        del.appendChild(document.createTextNode('Discard'));

        btnGroup.append(mod, del);
    
    } 
}


function saveItem(e) {

    if (e.target.classList.contains('save')) {
        var changeValue = document.getElementById('change').value;
        var changeElem = document.getElementById('change');
        var listText = e.target.parentElement.parentElement;
        var btnGroup = e.target.parentElement;

        listText.removeChild(changeElem);
        listText.innerText = changeValue;

        var btnGroup = document.createElement('div');
        btnGroup.className = "float-right";
        listText.appendChild(btnGroup);

        var mod = document.createElement('button');
        mod.className = 'btn btn-success btn-sm mr-2 change';
        mod.appendChild(document.createTextNode('Change'));

        var del = document.createElement('button');
        del.className = 'btn btn-danger btn-sm delete';
        del.appendChild(document.createTextNode('Remove'));

        btnGroup.append(mod, del);

    } else if (e.target.classList.contains('discard')) {
        var listText = e.target.parentElement.parentElement;
        var btnGroup = e.target.parentElement;

        listText.innerText = localStorage.getItem('oldValue');

        var btnGroup = document.createElement('div');
        btnGroup.className = "float-right";
        listText.appendChild(btnGroup);

        var mod = document.createElement('button');
        mod.className = 'btn btn-success btn-sm mr-2 change';
        mod.appendChild(document.createTextNode('Change'));

        var del = document.createElement('button');
        del.className = 'btn btn-danger btn-sm delete';
        del.appendChild(document.createTextNode('Remove'));

        btnGroup.append(mod, del);
        
    }
}

function filterItems(e) {
    var searchText = e.target.value.toLowerCase();
    var itemList = items.getElementsByTagName('li');
    Array.from(itemList).forEach(function (item) {
        var itemToDo = item.firstChild.textContent;
        if (itemToDo.toLowerCase().indexOf(searchText) != -1) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}