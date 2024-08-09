const fs=require('fs')
const path=require('path')

const filepath=path.join(__dirname,'tasks.json');
const readTasks=()=>{
  if(!fs.existsSync(filepath)){
    fs.writeFileSync(filepath,JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(filepath));
}
const writeTask=(Tasks)=>{
    fs.writeFileSync(filepath,JSON.stringify(Tasks,2));

}

const addTask=(args)=>{
    const Tasks=readTasks();
    let id=Tasks.length ? Tasks[Tasks.length-1].id+1:1;
    const newTask={
        "id":id,
        "description":args,
        "status":"to-do",
        "createdAt":new Date().toDateString,
        "updatedAt":new Date().toDateString
    }
    Tasks.push(newTask);
    writeTask(Tasks);
    console.log(`succesfully added ${id}`);
}

const updateTask=(id,description)=>{
    const Tasks=readTasks();
    const Task=Tasks.find(task=>task.id===parseInt(id));
    if(Task){
        Task.description=description;
        Task.updatedAt=new Date().toDateString();
        writeTask(Tasks);
        console.log(`succesfullu update ${id}`);
    }
    else{
        console.log(`id ${id} not found `);
    }
}
const deleteTask=(id)=>{
    let tasks=readTasks();
    const before=tasks.length;
    tasks=tasks.filter(task=>task.id!==parseInt(id));
    const after=tasks.length;
    if(after!=before){
    writeTask(tasks);
    console.log(`task deleted succefully ${id}`);
    }
    else{
        console.log(`cant find ${id}`);
    }
}
const listAll=()=>{
    const tasks=readTasks();
    
    tasks.forEach(task =>  {
        console.log(`ID:${task.id},DESCRIPTION:${task.description}`);
    });
}
const[,,command,...arg]=process.argv;
console.log(command);
console.log(arg);
switch(command){
      case 'add':
        addTask(arg.join(' '));
        break;
      case 'update':
        updateTask(arg[0],arg.slice(1).join(' '));
        break;
      case 'delete':
            deleteTask(arg[0]);
            break;
       case 'listAll':
             listAll();
             break;
       default: 
              console.log(`your command is not valid. your command ${command}. Try listAll,changeStatus,delete,update,add`);           

}
//Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser