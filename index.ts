 interface todotype{
     id?:number,
     title?:string,
     text?:string,
     complete?:boolean,
     date?:any
 }

class Controller{
    constructor(){
       
    }
 Todo=new Model();
 todostateobject=new State();
 input=document.getElementById("inputs") as HTMLInputElement;
private todocontainer=document.getElementById("todos") as HTMLDivElement;
private  Compltedtodocontainer=document.getElementById("complte-todo") as HTMLDivElement;
private textarea=document.getElementById('textarea') as HTMLTextAreaElement;
private dateinput=document.getElementById("dateinput") as HTMLElement;
private form= (document.getElementById("addform") as HTMLFormElement ).addEventListener('submit',(e)=>{
    e.preventDefault();
    if(this.input.value==="" ||this.textarea.value===""){
        alert("ENTER A TODO"); 
    }else{
        this.UpdateView();
    }
 this.input.value='';
this.textarea.value=""
});

public  UpdateView=()=>{
    let lastelm=this.todocontainer.lastChild;
    while(lastelm){
        this.todocontainer.removeChild(lastelm);
        lastelm=this.todocontainer.lastChild;
    }
    this.todostateobject.CreateTodo(this.input.value).map(item=>{
        if(item.complete){
            this.Compltedtodocontainer.appendChild(this.Todo.displayView(item));
        }else{
            this.todocontainer.appendChild(this.Todo.displayView(item));
        }
    });
    
}
public HandleDelete(id:string):void{
    let lastelm=this.todocontainer.lastChild;
    let lastcompl=this.Compltedtodocontainer.lastChild

    while(lastelm){
        this.todocontainer.removeChild(lastelm);
        lastelm=this.todocontainer.lastChild;
    }
    while(lastcompl){
        this.Compltedtodocontainer.removeChild(lastcompl);
        lastcompl=this.Compltedtodocontainer.lastChild;1

    }
this.todostateobject.DeleteTodo(parseInt(id)).map(item=>{
    if(item.complete){
        this.Compltedtodocontainer.appendChild(this.Todo.displayView(item));
    }else{
        this.todocontainer.appendChild(this.Todo.displayView(item));
    }
})
}
public HandleUpdate(id:number){
    let lastelm=this.todocontainer.lastChild;
    let updatedTodo=window.prompt("Updat...") as string;
    let lastcompl=this.Compltedtodocontainer.lastChild

    
    while(lastelm){
        this.todocontainer.removeChild(lastelm);
        lastelm=this.todocontainer.lastChild;
    }
    while(lastcompl){
        this.Compltedtodocontainer.removeChild(lastcompl);
        lastcompl=this.Compltedtodocontainer.lastChild;

    }
this.todostateobject.updateTodos(id,updatedTodo).map(item=>{
    if(item.complete){
        this.Compltedtodocontainer.appendChild(this.Todo.displayView(item));
    }else{
        this.todocontainer.appendChild(this.Todo.displayView(item));
    }
})
}
public HandleCheckBox(id:number):void{
    let lastelm=this.todocontainer.lastChild;
    let lastcompl=this.Compltedtodocontainer.lastChild
    while(lastelm){
        this.todocontainer.removeChild(lastelm);
        lastelm=this.todocontainer.lastChild;
    }
    while(lastcompl){
        this.Compltedtodocontainer.removeChild(lastcompl);
        lastcompl=this.Compltedtodocontainer.lastChild;

    }
this.todostateobject.ChangeChecker(id).map(item=>{
    if(item.complete){
        this.Compltedtodocontainer.appendChild(this.Todo.displayView(item));
    }else{
        this.todocontainer.appendChild(this.Todo.displayView(item));
    }
})
}



}




class State{
  static  todoState:todotype[]=[];
  constructor( ){
        
    }
 

  public updateTodos=(id:number,text?:string,complete?:boolean):todotype[]=>{
   return State.todoState.map(item=>{
        if(item.id===id){
            if(typeof complete !=='undefined'){
            item.complete=complete;
            }
            if(typeof text!=='undefined'){
            item.text=text
            }
        }
        return item;
    })
  }
  public DeleteTodo=(id:number):todotype[]=>{
    State.todoState= State.todoState.filter(item=>{
          if(item.id!==id){
              console.log(item.text);
              
              return item;
          }
      })
      return State.todoState;
  }
  public ChangeChecker=(id:number):todotype[]=>{
      return State.todoState.map(item=>{
            if(item.id===id){
                item.complete=!item.complete;
            }
            return item;
      });
  }
  public CreateTodo=(text?:string,complete?:boolean):todotype[]=>{
    let id:number=State.todoState.length+1;
    let todo:todotype={
        id,
        text,
        complete
    }
    State.todoState.push(todo);
      return State.todoState;
  }
}




class Model {
    constructor(private id?:number,private description?:string,private done?:boolean){
    
    }
    public displayView(todo:todotype):HTMLElement
    {
        //the div container
        let div=document.createElement('div');
        let btnDiv=document.createElement('div');
        let time=document.createElement('p');
        time.innerText=`${todo.date}`;
        btnDiv.className='container-fluid flex-r btn-div';
        let descp=document.createElement('h3');
        descp.innerText=`${todo.text}`;
        div.className="card container flex-r todo";
        div.id=`${todo.id}`;
        let btndel=document.createElement('button');
        btndel.innerText="Delete";
        btndel.className='btn btn-delete';
        let btnupdate=document.createElement('button');
        btnupdate.innerText="Edit"
        btnupdate.className='btn btn-update';
        
        btndel.addEventListener('click',()=> {
            let con=new Controller;
            con.HandleDelete(div.id)
        });
        btnupdate.addEventListener('click',()=>{
            let con=new Controller;
        console.log("check box changed :"+div.id);
        con.HandleUpdate(parseInt(div.id));
    });
        let checkbox=document.createElement('input');
        checkbox.type='checkbox';
        checkbox.checked=false;
        checkbox.addEventListener('change',()=>{
            let con=new Controller;
            con.HandleCheckBox(parseInt(div.id));
            checkbox.checked =!checkbox.checked;
            console.log(checkbox.checked);
            
            
        })
        div.appendChild(checkbox);
        div.appendChild(descp);
        btnDiv.appendChild(btnupdate);
        btnDiv.appendChild(btndel);
        div.appendChild(btnDiv);
        div.appendChild(time);
        
        return div;
    }
}

let col=new Controller();