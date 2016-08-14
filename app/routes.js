// app/routes.js

// load the Books and user models
var Books = require('./models/book');
var Users = require('./models/users');
var request = require('request');

// expose the routes to our app with module.exports
module.exports = function(app) {

    //Request header field Content-Type is not allowed by Access-Control-Allow-Headers in preflight response.
    //from http://stackoverflow.com/questions/19867775/cors-trouble-with-nodejs-and-angularjs
    // app.all('/*', function(req, res, next) {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //   res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    //   next();
    // })

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {
        // use mongoose to get all todos in the database
        Books.find(function(err, todos) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
              res.send(err);
            }
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
                    res.send(err);
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
                    res.send(err);
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
          } else {
            var responseText = '';
            if (todo.checkedOut == true) {
              responseText = "You checked out \"" + todo.text + "\". Enjoy!";
            } else {
              responseText = "You returned \"" + todo.text + "\". Thank you!";
            }
            request({
              method: 'POST',
              headers: [{
                name: 'content-type',
                value: 'application/json'
              }],
              uri: 'https://hooks.slack.com/services/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',
              body: JSON.stringify({
                "text": responseText
              })
            }, function (error, response, body) {
              // if (!error && response.statusCode == 200) {
              //
              // }
            });
            res.json(todo);
          }
        });
      });

    });

    // USERS ==================================

    app.get('/api/users', function(req, res) {
      Users.find(function(err, users) {
        if (err)
          res.send(err);

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

  /*
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
  */

};
