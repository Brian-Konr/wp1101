var itemCount = 0,
    completeCount = 0;

class TODO_ITEM {
    constructor(item_detail) {
        this.item = document.createElement("li");
        this.item.className = "todo-app__item";

        var checkbox = document.createElement("div");
        checkbox.className = "todo-app__checkbox";

        var input = document.createElement("input");
        input.type = "checkbox";
        input.id = itemCount;
        input.addEventListener('change', function() {
            var index = Number(this.id);
            let text = document.getElementsByClassName("todo-app__item-detail")[index];
            if(this.checked) {
                text.classList.add("complete");
                completeCount++;
            }
            else if(!this.checked) {
                text.classList.remove("complete");
                completeCount--;
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
}

let footer = document.getElementById("todo-footer"),
    inputField = document.getElementById("todo-input"),
    list = document.getElementById("todo-list");


inputField.addEventListener('keypress', handleEnter);

//initialize
footer.classList.add("hide");

function handleEnter(e) {
    if(e.key === 'Enter' && inputField.value !== "") {
        console.log(inputField.value);
        list.appendChild(new TODO_ITEM(inputField.value).getItem);
        inputField.value = '';
        itemCount++;
        footer.classList.remove("hide");
        setUnCompleted();
    }
}

function setUnCompleted() {
    footer.children[0].textContent = `${itemCount - completeCount} left`;
}