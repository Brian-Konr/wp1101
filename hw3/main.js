var itemCount = 0,
    incrementId = 0,
    allTodos = [],
    uncompletedTodos = [],
    completedTodos = [];

let footer = document.getElementById("todo-footer"),
    inputField = document.getElementById("todo-input"),
    list = document.getElementById("todo-list"),
    curType = "all";
class TODO_ITEM {
    constructor(item_detail) {
        this.item = document.createElement("li");
        this.item.className = "todo-app__item";
        this.item.addEventListener('mouseenter', function () {
            var x = document.createElement("img");
            x.src = "./img/x.png";
            x.className = "todo-app__item-x";
            x.addEventListener('click', () => {
                var id = this.children[0].children[0].id; //get the id of the input checkbox of the item we click its x

                var indexToDelete = allTodos.findIndex(todo => todo.getId === id);
                if(indexToDelete !== -1) allTodos.splice(indexToDelete, 1);

                indexToDelete = uncompletedTodos.findIndex(todo => todo.getId === id);
                if(indexToDelete !== -1) uncompletedTodos.splice(indexToDelete, 1);

                indexToDelete = completedTodos.findIndex(todo => todo.getId === id);
                if(indexToDelete !== -1) completedTodos.splice(indexToDelete, 1);

                list.innerHTML = '';
                for(let i = 0; i < allTodos.length; i++){
                    list.appendChild(allTodos[i].getItem);
                }
                setUnCompleted();
                if(allTodos.length === 0) {
                    footer.classList.add("hide");
                }
            });
            this.appendChild(x);
        })

        var checkbox = document.createElement("div");
        checkbox.className = "todo-app__checkbox";

        var input = document.createElement("input");
        input.type = "checkbox";
        input.id = incrementId;
        input.addEventListener('change', () => {
            var index = this.getId;
            var indexOnList = this.getIndexOnList;
            var h1 = document.getElementsByClassName("todo-app__item-detail")[indexOnList];

            if(this.item.children[0].children[0].checked) {
                var completedTodo = allTodos.find(todo => todo.getId === index);
                var find = completedTodos.find(todo => todo.getId === completedTodo.getId);
                if(find === undefined) completedTodos.push(completedTodo);
                h1.classList.add("complete");
                var completeIndex = uncompletedTodos.findIndex(todo => todo.getId === index);
                uncompletedTodos.splice(completeIndex, 1);
            }
            else {
                h1.classList.remove("complete");
                var uncomplete = allTodos.find(todo => todo.getId === index);
                var find = uncompletedTodos.find(todo => todo.getId === uncomplete.getId);
                if(find === undefined) uncompletedTodos.push(uncomplete);
                var unCompleteIndex = completedTodos.findIndex(todo => todo.getId === index);
                completedTodos.splice(unCompleteIndex, 1);
            }
            setUnCompleted();
        })
        
        var label = document.createElement("label");
        label.htmlFor = input.id;

        checkbox.appendChild(input);
        checkbox.appendChild(label);

        var h1 = document.createElement("h1");
        h1.className = "todo-app__item-detail";
        h1.textContent = item_detail;

        this.item.appendChild(checkbox);
        this.item.appendChild(h1);
    }
    get getItem() {return this.item;}
    get getId() {return this.item.children[0].children[0].id}
    get getIndexOnList() {
        var id = this.getId;
        for(let i = 0; i < list.children.length; i++) {
            if(list.children[i].children[0].children[0].id === id) return i;
        }
    }
}


inputField.addEventListener('keypress', handleEnter);

//initialize
footer.classList.add("hide");

function handleEnter(e) {
    if(e.key === 'Enter' && inputField.value !== "") {
        // console.log(inputField.value);
        var todo = new TODO_ITEM(inputField.value);
        list.appendChild(todo.getItem);
        allTodos.push(todo);
        uncompletedTodos.push(todo);
        inputField.value = '';
        incrementId++;
        footer.classList.remove("hide");
        setUnCompleted();
    }
}

function setUnCompleted() {
    var currentItemAmount = list.children.length;
    var currentComplete = 0;
    for(let i = 0; i < currentItemAmount; i++) {
        if(list.children[i].children[0].children[0].checked) currentComplete++;
    }
    footer.children[0].textContent = `${currentItemAmount - currentComplete} left`;
    if(completedTodos.length !== 0) footer.children[2].classList.remove("hide");
    else footer.children[2].classList.add("hide");
    // console.log("allArr", allTodos)
    // console.log("uncompletedArr", uncompletedTodos);
    // console.log("completedArr", completedTodos);
}

function switchList(type) {
    curType = type;
    var curArr = [];
    if(type === "all") curArr = allTodos;
    else if(type === "active") curArr = uncompletedTodos;
    else if(type === "complete") curArr = completedTodos;

    list.innerHTML = "";
    if(curArr.length !== 0) {
        for(let i = 0; i < curArr.length; i++) {
            list.appendChild(curArr[i].getItem);
        }
    }
}

function clearComplete() {
    completeIds = [];
    completedTodos.forEach(todo => {
        completeIds.push(todo.getId);
    })
    completedTodos = [];
    newAlls = [];
    allTodos.forEach(todo => {
        var allId = todo.getId;
        var flag = false;
        for(let i = 0; i < completeIds.length; i++) {
            if(allId === completeIds[i]) {
                flag = true;
                return;
            }
        }
        if(!flag) newAlls.push(todo);
    })
    allTodos = newAlls;
    switchList(curType);
    setUnCompleted();
}
