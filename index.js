var Controller = /** @class */ (function () {
    function Controller() {
        var _this = this;
        this.Todo = new Model();
        this.todostateobject = new State();
        this.input = document.getElementById("inputs");
        this.todocontainer = document.getElementById("todos");
        this.Compltedtodocontainer = document.getElementById("complte-todo");
        this.textarea = document.getElementById('textarea');
        this.dateinput = document.getElementById("dateinput");
        this.form = document.getElementById("addform").addEventListener('submit', function (e) {
            e.preventDefault();
            if (_this.input.value === "" || _this.textarea.value === "") {
                alert("ENTER A TODO");
            }
            else {
                _this.UpdateView();
            }
            _this.input.value = '';
            _this.textarea.value = "";
        });
        this.UpdateView = function () {
            var lastelm = _this.todocontainer.lastChild;
            while (lastelm) {
                _this.todocontainer.removeChild(lastelm);
                lastelm = _this.todocontainer.lastChild;
            }
            _this.todostateobject.CreateTodo(_this.input.value).map(function (item) {
                if (item.complete) {
                    _this.Compltedtodocontainer.appendChild(_this.Todo.displayView(item));
                }
                else {
                    _this.todocontainer.appendChild(_this.Todo.displayView(item));
                }
            });
        };
    }
    Controller.prototype.HandleDelete = function (id) {
        var _this = this;
        var lastelm = this.todocontainer.lastChild;
        var lastcompl = this.Compltedtodocontainer.lastChild;
        while (lastelm) {
            this.todocontainer.removeChild(lastelm);
            lastelm = this.todocontainer.lastChild;
        }
        while (lastcompl) {
            this.Compltedtodocontainer.removeChild(lastcompl);
            lastcompl = this.Compltedtodocontainer.lastChild;
        }
        this.todostateobject.DeleteTodo(parseInt(id)).map(function (item) {
            if (item.complete) {
                _this.Compltedtodocontainer.appendChild(_this.Todo.displayView(item));
            }
            else {
                _this.todocontainer.appendChild(_this.Todo.displayView(item));
            }
        });
    };
    Controller.prototype.HandleUpdate = function (id) {
        var _this = this;
        var lastelm = this.todocontainer.lastChild;
        var updatedTodo = window.prompt("Updat...");
        var lastcompl = this.Compltedtodocontainer.lastChild;
        while (lastelm) {
            this.todocontainer.removeChild(lastelm);
            lastelm = this.todocontainer.lastChild;
        }
        while (lastcompl) {
            this.Compltedtodocontainer.removeChild(lastcompl);
            lastcompl = this.Compltedtodocontainer.lastChild;
        }
        this.todostateobject.updateTodos(id, updatedTodo).map(function (item) {
            if (item.complete) {
                _this.Compltedtodocontainer.appendChild(_this.Todo.displayView(item));
            }
            else {
                _this.todocontainer.appendChild(_this.Todo.displayView(item));
            }
        });
    };
    Controller.prototype.HandleCheckBox = function (id) {
        var _this = this;
        var lastelm = this.todocontainer.lastChild;
        var lastcompl = this.Compltedtodocontainer.lastChild;
        while (lastelm) {
            this.todocontainer.removeChild(lastelm);
            lastelm = this.todocontainer.lastChild;
        }
        while (lastcompl) {
            this.Compltedtodocontainer.removeChild(lastcompl);
            lastcompl = this.Compltedtodocontainer.lastChild;
        }
        this.todostateobject.ChangeChecker(id).map(function (item) {
            if (item.complete) {
                _this.Compltedtodocontainer.appendChild(_this.Todo.displayView(item));
            }
            else {
                _this.todocontainer.appendChild(_this.Todo.displayView(item));
            }
        });
    };
    return Controller;
}());
var State = /** @class */ (function () {
    function State() {
        this.updateTodos = function (id, text, complete) {
            return State.todoState.map(function (item) {
                if (item.id === id) {
                    if (typeof complete !== 'undefined') {
                        item.complete = complete;
                    }
                    if (typeof text !== 'undefined') {
                        item.text = text;
                    }
                }
                return item;
            });
        };
        this.DeleteTodo = function (id) {
            State.todoState = State.todoState.filter(function (item) {
                if (item.id !== id) {
                    console.log(item.text);
                    return item;
                }
            });
            return State.todoState;
        };
        this.ChangeChecker = function (id) {
            return State.todoState.map(function (item) {
                if (item.id === id) {
                    item.complete = !item.complete;
                }
                return item;
            });
        };
        this.CreateTodo = function (text, complete) {
            var id = State.todoState.length + 1;
            var todo = {
                id: id,
                text: text,
                complete: complete
            };
            State.todoState.push(todo);
            return State.todoState;
        };
    }
    State.todoState = [];
    return State;
}());
var Model = /** @class */ (function () {
    function Model(id, description, done) {
        this.id = id;
        this.description = description;
        this.done = done;
    }
    Model.prototype.displayView = function (todo) {
        //the div container
        var div = document.createElement('div');
        var descp = document.createElement('h3');
        descp.innerText = "".concat(todo.text);
        div.className = "card container flex-r todo";
        div.id = "".concat(todo.id);
        var btndel = document.createElement('button');
        btndel.innerText = "Delete";
        btndel.className = 'btn btn-delete';
        var btnupdate = document.createElement('button');
        btnupdate.innerText = "Edit";
        btnupdate.className = 'btn btn-update';
        btndel.addEventListener('click', function () {
            var con = new Controller;
            con.HandleDelete(div.id);
        });
        btnupdate.addEventListener('click', function () {
            var con = new Controller;
            console.log("check box changed :" + div.id);
            con.HandleUpdate(parseInt(div.id));
        });
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = false;
        checkbox.addEventListener('change', function () {
            var con = new Controller;
            con.HandleCheckBox(parseInt(div.id));
            checkbox.checked = !checkbox.checked;
            console.log(checkbox.checked);
        });
        div.appendChild(checkbox);
        div.appendChild(descp);
        div.appendChild(btnupdate);
        div.appendChild(btndel);
        return div;
    };
    return Model;
}());
var col = new Controller();
