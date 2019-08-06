//to select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");


//Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST, id;

//get item from lcl strg
let data = localStorage.getItem("TODO");

//check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length   //set the id to the last one in the list
    loadList(LIST); //load the list to the user interface

}else{
    //if data isn't empty
    LIST = []
    id = 0;
}


/*setInterval(function() {

    console.log(list.children)
    var allLists = list.children;
    var relist = []
    for(var i = 0; i <= allLists.length; i++) {
        const toDo = allLists[i].textContent;   //gets value of input
        
        if(toDo){   //check if input isn't empty
            // addToDo(toDo, id, false, false);   //addTodo

            relist.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            })

            //add item to lcl strg, this code must be added where the LIST array is updated

            id++;
        }

        localStorage.setItem("TODO", JSON.stringify(relist));
        input.value="";
    }
}, 1000) */

//load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash)
    });
}


//Show today's date
const options = {weekday: "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do function
function addToDo(toDo, id, done, trash){

    if (trash){return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH: "";

    const item = `<li class="item" draggable="true">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
                `;


    const position = "beforeend";
  
    list.insertAdjacentHTML(position, item);
    const li = document.querySelector('li');
    
}

//add an item when the user clicks enter
document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        const toDo = input.value;   //gets value of input
        
        if(toDo){   //check if input isn't empty
            addToDo(toDo, id, false, false);   //addTodo

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            //add item to lcl strg, this code must be added where the LIST array is updated
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value="";
        
    }
});

//compLete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST [element.id].trash = true;
}

//target the items created dynamically
list.addEventListener("click", function(event){
    // console.log(/);
   // console.log(list.children)
     const element = event.target;  //return the clicked element inside list
     const elementJob = element.attributes.job.value;  //complete or delete
     if(elementJob == "complete"){
         completeToDo(element);

     }else if(elementJob == "delete"){
        
        ConfirmDelete(element);
   
     }

    //add item to lcl strg, this code must be added where the LIST array is updated
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

function ConfirmDelete(element)
{
  var x = confirm("Are you sure you want to delete?");
  if (x)
      return removeToDo(element);
  else
    return false;
}

function ConfirmClear(element)
{
  var x = confirm("Are you sure you want to clear all?");
  if (x)
      return thisFunction(element);
  else
    return false;
}

function thisFunction(element){
    localStorage.clear();
    location.reload();
}


if(localStorage.getItem('sort')){
    var array = localStorage.getItem('sort').split(',');
      map = {},
      el = $('ul');
  alert(array);
  $('ul > li').each(function() { 
      var el = $(this);
      map[el.data('arrange')] = el;
  });
  $('ul').html('');
  for (var i = 0; i <= array.length; i++) {
    if (array[i]) {
        $('ul').append(map[array[i]]);
    }
  }
}; //to get.


/*
$("#sortable").sortable({
    cancel: ".fixed",
    update: function (event, ui) {
        var data = [];
        $('#sortable').find('li').each(function(i) {
            data.push($(this).data('arrange'));
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
        }
        
});
$("#sortable").disableSelection();

   console.log('sorting')

*/
    function myFunction() {
        const toDo = input.value;   //gets value of input
        
        if(toDo){   //check if input isn't empty
            addToDo(toDo, id, false, false);   //addTodo

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            //add item to lcl strg, this code must be added where the LIST array is updated
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value="";
    }