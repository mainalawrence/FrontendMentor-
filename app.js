;
// the state
var TodoList = ["wash the car", "cook", "eat"];
var gname = "kimani";
//---dom manipulation
var todocontainer = document.getElementById("todos");
var Compltedtodocontainer = document.getElementById("complte-todo");
var form = document.getElementById("addform");
var submitbtn = document.getElementById("submitbtn");
var input = document.getElementById("inputs");
var deleteTodobtn = document.getElementById("deletetodo");
var count = 0;
TodoList.map(function (item) {
    var div;
    div = new TodoType(count, item, false).view();
    Compltedtodocontainer.appendChild(div);
    div = null;
    count++;
});
deleteTodobtn.addEventListener('click', function (e) {
    console.log(TodoList[0]);
});
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var div = document.createElement('div');
    div.innerHTML = "\n    <div class=\"card container flex-r todo\" >\n    <input type=\"checkbox\" />\n    <h3 class=\"tododetails\">".concat(input.value, "</h3>\n    <input class=\"btn btn-update\" type=\"button\" value=\"Update\"/>\n    <input class=\"btn btn-delete\" type=\"button\" value=\"Remove\"/>\n    </div>");
    todocontainer.appendChild(div);
    input.value = "";
});
var updateTodo = function (id, data) {
};
var deleteTodo = function (id) {
};
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
var TodoType = /** @class */ (function () {
    function TodoType(id, description, complete) {
        var _this = this;
        this.id = id;
        this.description = description;
        this.complete = complete;
        this.view = function () {
            var div = document.createElement('div');
            div.className = "card container flex-r todo";
            div.id = "".concat(_this.id);
            var btndel = document.createElement('button');
            btndel.className = 'btn btn-delete';
            var btnupdate = document.createElement('button');
            btnupdate.className = 'btn btn-update';
            btndel.addEventListener('click', function () { return console.log("am clicked delete "); });
            btnupdate.addEventListener('click', function () { return console.log("am clicked update"); });
            div.appendChild(btnupdate);
            div.appendChild(btndel);
            return div;
        };
    }
    TodoType.prototype.validation = function (value) {
        value === null ? '' : alert("Enter a do to app");
    };
    return TodoType;
}());
