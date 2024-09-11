onerror=function(msg,url,l,col,err){
    console.log(`${msg} in line: ${l}`);
    
    return true;
}

if (localStorage['status']) {
    localStorage.setItem("status","new");
}

//------------------jquery---------------//
 // button to show and hidden task name field
$("#todolist").click(function () {
    $("#task").slideToggle(300);
    $("#task input").focus();
});

// add event to button footer
$("footer *").click(function() {
    $("footer *").each(function(index) {
        $(this).removeClass("active");
        switch (index) {
            case 0:
                localStorage.setItem("status","new");
                getTasks("new");
                break;
            case 1:
                localStorage.setItem("status","finish");
                getTasks("finish");
                break;
            case 2:
                localStorage.setItem("status","archive");
                getTasks("archive");
                break;
            default:
                break;
        }
    });
    this.className="active";
});

//----------------------js---------------//
taskInput=document.querySelector('input');

getTasks("new");

// define tasks
function addTask() {
    let addrequst=new XMLHttpRequest();
    
    addrequst.open("post","dataMange.php");
    addrequst.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    addrequst.send(`request=newTask&taskName=${taskInput.value}`);
    addrequst.onload=function(){
        if (this.responseText==1) {
            localStorage.setItem("status","new");
            getTasks("new");
            $("img").each(function() {
                $(this).removeClass("active");
                $("img[alt='new']").addClass("active");
            })
            
        }else{
            alert("added faild");
            console.log(this.responseText);
            
        }
    }
    taskInput.value="";
}

function getTasks(status) {
    let body=document.body.children[1];
    let getRequest=new XMLHttpRequest();
    getRequest.open("post","dataMange.php");
    getRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    getRequest.send(`request=getTasks&status=${status}`);
    getRequest.onload=function(){
        let tasks=JSON.parse(this.responseText);
        document.body.children[1].innerHTML="";
        if (tasks.length>0) {
            for(index in tasks){
                let hr=document.createElement("hr"),
                tasksDiv=document.createElement("div");
                timeDiv=document.createElement("div");
                tasksDiv.innerText=tasks[index]["name"];
                timeDiv.append(tasks[index]["date"]);
                tasksDiv.className="task";
                tasksDiv.appendChild(timeDiv);
                switch (status) {
                    case "new":
                        tasksDiv.innerHTML+=`<div><button onclick=editTask('editTask','finish','${tasks[index]["id"]}')>finish</button><button onclick=editTask('editTask','archive','${tasks[index]["id"]}')>archive</button><button onclick=deleteTask('deleteTask','${tasks[index]["id"]}')>delete</button></div>`;
                            break;
                    case "finish":
                        tasksDiv.innerHTML+=`<div><button onclick=editTask('editTask','archive','${tasks[index]["id"]}')>archive</button><button onclick=deleteTask('deleteTask','${tasks[index]["id"]}')>delete</button></div>`;
                        break;
                    case "archive":
                        tasksDiv.innerHTML+=`<div><button onclick=editTask('editTask','finish','${tasks[index]["id"]}')>finish</button><button onclick=deleteTask('deleteTask','${tasks[index]["id"]}')>delete</button></div>`;
                        break;
                    default:
                        break;
                }
                
                document.body.children[1].appendChild(tasksDiv);
                document.body.children[1].appendChild(hr);
        }
        }else{
            body.innerText="no task in "+status+" tasks";
        }
        
    }
}

function editTask(request,status,id) {
    let editRequest=new XMLHttpRequest();
    editRequest.open("post","dataMange.php");
    editRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    editRequest.send(`request=${request}&status=${status}&id=${id}`);
    editRequest.onload=function(){
        if (this.responseText==1) {
            alert("edit succseful");
            getTasks(localStorage.getItem("status"));
        }else{
            alert("edit faild");
        }
    }
    
}

function deleteTask(request,id) {
    let deleteRequest=new XMLHttpRequest();
    deleteRequest.open("post","dataMange.php");
    deleteRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    deleteRequest.send(`request=${request}&id=${id}`);
    deleteRequest.onload=function(){
        if (this.responseText==1) {
            alert("delete succseful");
            getTasks(localStorage.getItem("status"));
        }else{
            alert("delete faild");
            console.log(this.responseText);
            
        }
    }
}
