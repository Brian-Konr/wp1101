var itemCount = 0;

class TODO_ITEM {
    constructor(item_detail) {
        this.item = document.createElement("li");
        this.item.className = "todo-app__item";

        var checkbox = document.createElement("div");
        checkbox.className = "todo-app__checkbox";

        var input = document.createElement("input");
        input.type = "checkbox";
        input.id = itemCount;
        
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
}

let inputField = document.getElementById("todo-input");
inputField.addEventListener('keypress', setItem);

function setItem(e) {
    if(e.key === 'Enter') {
        console.log(inputField.value);
        let listNode = document.getElementById("todo-list");
        listNode.appendChild(new TODO_ITEM(inputField.value).getItem);
        inputField.value = '';
        itemCount++;
    }
}