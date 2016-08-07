// app/routes.js

// load the todo model
var Todo = require('./models/todo');

// expose the routes to our app with module.exports
module.exports = function(app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

    app.get('/api/todos/:todo_id', function(req, res) {
      Todo.findById(req.params.todo_id, function(err, todo) {
        if (err) {
          res.send(err);
        } else {
          res.json(todo);
        }
      });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            checkedOut : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    // alter the checked out status of a book
    app.put('/api/todos', function(req, res) {
      console.log('put method here');
      console.log(req.body);
      Todo.findById(req.body.id, function(err, todo) {
        if (err) {
          res.send(err);
        }
        todo.checkedOut = req.body.bookStatus;
        todo.save(function(err) {
          if (err) {
            res.send(err);
          }
          res.json(todo);
        });
      });
      // Todo.update({
      //   _id : req.body.id,
      //   checkedOut : req.body.bookStatus
      // }, function(err, todo) {
      //   console.log(todo);
      //   console.log("line 78");
      //   if (err)
      //     res.send(err);
      //   res.json(todo);
      // });

    });

};
