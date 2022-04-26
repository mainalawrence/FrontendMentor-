
interface todos{
    id?:number,
    description?:String,
    done?:boolean,
};

interface state extends todos{

}
// the state
 let TodoList:string[]=["wash the car","cook","eat"];
 let gname="kimani";
//---dom manipulation
let todocontainer=document.getElementById("todos") as HTMLDivElement;
let Compltedtodocontainer=document.getElementById("complte-todo") as HTMLDivElement;
let form=document.getElementById("addform") as HTMLFormElement;
let submitbtn=document.getElementById("submitbtn") as HTMLButtonElement;
let input=document.getElementById("inputs") as HTMLInputElement;
let deleteTodobtn=document.getElementById("deletetodo") as HTMLButtonElement;

let count=0;
TodoList.map(item=>{
    let div:HTMLDivElement|null;
  div=new TodoType(count,item,false).view();
  Compltedtodocontainer.appendChild(div);
  div=null;
    count++;
})
deleteTodobtn.addEventListener('click',(e)=>{
    console.log(TodoList[0]);
})


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let div=document.createElement('div');
    div.innerHTML=`
    <div class="card container flex-r todo" >
    <input type="checkbox" />
    <h3 class="tododetails">${input.value}</h3>
    <input class="btn btn-update" type="button" value="Update"/>
    <input class="btn btn-delete" type="button" value="Remove"/>
    </div>`;
    todocontainer.appendChild(div);
    input.value="";
});

let updateTodo=(id:number,data:string)=>{
    

}
let deleteTodo=(id:number)=>{

}



//problem analysis
/**
 * what i need
 * button edit and delete
 * text description
 * 
 * 
 */
/**
 * what i know 
 * dom manipulation
 * adding event 
 * handle event
 */
/**
 * what 
 */

//new impliementation

class TodoType{
    constructor(public id:number,public description:string,public complete:boolean){
        
    }   
    public view=():HTMLDivElement=>{
        let div=document.createElement('div');
        div.className="card container flex-r todo";
        div.id=`${this.id}`;
        let btndel=document.createElement('button');
        btndel.className='btn btn-delete';
        let btnupdate=document.createElement('button');
        btnupdate.className='btn btn-update';
        btndel.addEventListener('click',()=>console.log(`am clicked delete `));
        btnupdate.addEventListener('click',()=>console.log(`am clicked update`));
        div.appendChild(btnupdate);
        div.appendChild(btndel);
        return div;
    }
    private validation(value:string){
        value===null? '':alert("Enter a do to app");
    }
     
}




