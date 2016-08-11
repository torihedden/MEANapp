// app/routes.js

// load the Books and user models
var Books = require('./models/todo');
var Users = require('./models/users');

// expose the routes to our app with module.exports
module.exports = function(app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Books.find(function(err, todos) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

    app.get('/api/todos/:todo_id', function(req, res) {
      Books.findById(req.params.todo_id, function(err, todo) {
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
        Books.create({
            text : req.body.text,
            author : req.body.author,
            checkedOut : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Books.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Books.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Books.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    // alter the checked out status of a Books
    app.put('/api/todos', function(req, res) {
      // console.log('put method here');
      // console.log(req.body);
      Books.findById(req.body.id, function(err, todo) {
        if (err) {
          res.send(err);
        }
        todo.checkedOut = req.body.bookStatus;
        todo.save(function(err) {
          if (err) {
            res.send(err);
          }
          res.json(todo);
          console.log(res);
        });
      });

    });

    // USERS ==================================

    app.get('/api/users', function(req, res) {
      Users.find(function(err, users) {
        if (err)
          res.send(err)

        res.json(users);
      });
    });

    app.post('/api/users', function(req, res) {
      Users.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        slackName : req.body.slackName
      }, function(err, user) {
        if (err)
          res.send(err)

        Users.find(function(err, users) {
            if (err)
                res.send(err)
            res.json(users);
        });

    });

  });

};
