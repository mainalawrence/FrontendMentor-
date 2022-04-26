var Controller = /** @class */ (function () {
    function Controller() {
        var _this = this;
        this.Todo = new Model();
        this.todostateobject = new State();
        this.input = document.getElementById("inputs");
        this.todocontainer = document.getElementById("todos");
        this.Compltedtodocontainer = document.getElementById("complte-todo");
        this.form = document.getElementById("addform").addEventListener('submit', function (e) {
            e.preventDefault();
            if (_this.input.value === "") {
                alert("ENTER A TO DO");
            }
            else {
                _this.UpdateView();
            }
            _this.input.value = '';
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
        while (lastelm) {
            this.todocontainer.removeChild(lastelm);
            lastelm = this.todocontainer.lastChild;
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
        while (lastelm) {
            this.todocontainer.removeChild(lastelm);
            lastelm = this.todocontainer.lastChild;
        }
        this.todostateobject.DeleteTodo(id).map(function (item) {
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
        while (lastelm) {
            this.todocontainer.removeChild(lastelm);
            lastelm = this.todocontainer.lastChild;
        }
        this.todostateobject.DeleteTodo(id).map(function (item) {
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
        var _this = this;
        this.todoState = [];
        this.getTodos = function () {
            return _this.todoState;
        };
        this.updateTodos = function (id, text, complete) {
            return _this.todoState.map(function (item) {
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
            _this.todoState = _this.todoState.filter(function (item) {
                if (item.id !== id) {
                    console.log(item.text);
                    return item;
                }
            });
            return _this.todoState;
        };
        this.CreateTodo = function (text, complete) {
            var id = _this.todoState.length + 1;
            var todo = {
                id: id,
                text: text,
                complete: complete
            };
            _this.todoState.push(todo);
            return _this.todoState;
        };
    }
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
        checkbox.addEventListener('change', function () {
            var con = new Controller;
            console.log("check box changed :" + div.id);
            con.HandleCheckBox(parseInt(div.id));
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
