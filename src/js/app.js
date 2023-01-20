const btn = document.querySelector('form button');
var list = document.querySelector('#mylist');


btn.addEventListener('click',event=>{
    event.preventDefault();
     const input = document.querySelector('.todoInput');

    
    const text = input.value;
    
    if(text.trim()!==''){
        addToDo(text);
        input.value = '';
    }
   
    
});

const addToDo = (text) => {
    let ref = localStorage.getItem('todoRef');
    let toDos = JSON.parse(ref);
    var dup = 0
    toDos.forEach(todo=>{
        if(todo.name===text)
        {
            dup = 1
        }
    })
    if(dup===1)
    {   
        alert("alredy exists")
        showTodo(toDos)
        return
    }
    const todo = {
        name: text,
        checked: false,
        id: Date.now()
    };
    

    toDos.push(todo);

    localStorage.setItem('todoRef', JSON.stringify(toDos));
    showTodo(toDos);
}



const showTodo = (array) => {
    
    //const div = document.getElementById('myTodo');
    const list = document.querySelector('#mylist');

    const h2 = document.getElementById('notfound');
    list.innerHTML='';

    array.forEach((todo, index) => {

        const isChecked = todo.checked ? 'done' : '';

        const li = document.createElement("li");
        li.setAttribute('class', `todoClass ${isChecked}`);

        li.setAttribute('data-key', todo.id);

        li.innerHTML = 
        `<div class="left">
            <input type="checkbox" id="${todo.id}" ${isChecked ? 'checked' : ''} name="checkbox" class="check" onclick="checkingCheckBox(${index})">
            <span id="nonactive${index}" style="${isChecked ? "display: none" : "display: flex"};" class="unchecked"> - </span>
            <span id="active${index}" style="${isChecked ? "display: flex" : "display: none"};" class="checked"> &#10003 </span>
            <label id="${todo.id}" class="task">${todo.name}</label>
        </div>
        <i class="fa fa-trash delete" onclick="deleteTodo(${todo.id})" style="color: red;"></i>
        `;

        list.append(li);
    });
    if(array.length==0){
        h2.style.display='flex';
        h2.style.justifyContent='center';
    }else{
        h2.style.display='none';
    }
}


const deleteTodo = (id) => {
    const input = document.querySelector('.todoInput');
    input.value = "";
    
    let ref = localStorage.getItem('todoRef');
    console.log(ref);
    let tempArr = JSON.parse(ref);
      
    tempArr = tempArr.filter(item => item.id !== Number(id));
    localStorage.setItem("todoRef", JSON.stringify(tempArr));
    showTodo(tempArr);
}

const todoInput = document.getElementById("todoInput");

todoInput.addEventListener('input',() => {
    let searchInput= todoInput.value;


    let ref = localStorage.getItem('todoRef');
    
    let toDos = JSON.parse(ref);
    let tempArr = [];

    toDos.forEach((task) => {
        let taskTxt = task.name;

        if(taskTxt.includes(searchInput)){
           
            tempArr.push(task);
        }
    })
    

    showTodo(tempArr);
})

const checkingCheckBox = (myIndex) => {
    const ref = localStorage.getItem('todoRef');
    let tempArr = JSON.parse(ref);
    tempArr.forEach((item, index) => {
        if(myIndex==index){
            item.checked=!item.checked;
        }
    })

    localStorage.setItem("todoRef", JSON.stringify(tempArr));
    showTodo(tempArr);
}

document.addEventListener('DOMContentLoaded', () => {
    
    const ref = localStorage.getItem('todoRef');
    let toDos = [];
    if (ref) {
        toDos = JSON.parse(ref);
        showTodo(toDos);
    }
    // else{
    //     localStorage.setItem("todoRef", JSON.stringify(toDos));
    // }
  });