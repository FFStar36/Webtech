let books = require('./books.json');
const express = require('express')
const app = express();
const port = 8001;

books = books.sort((a, b) => a.title.localeCompare(b.title));

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/books', (req, res) => {
  let from = (req.query.from) ? req.query.from : 0;
  let to = (req.query.to) ? req.query.to : from + 5;  
  res.json(books.slice(from, to));
});

app.get('/book/:id', (req, res) => {
  let book = books.find((book) => book.isbn13 == req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book with ISBN13: ' + req.params.id + ' does not exist!' });
  }
});

app.post('/book', (req, res) => {
  let book = books.find((book) => book.isbn13 == req.body.isbn13);
  if (book) {
    res.status(400).json({ message: 'Book with ISBN13: ' + book.isbn13 + ' already exists!' });
  } else {
    books.push(req.body);
    res.json({ message: 'Book successfully created!' });
  }
});

app.put('/book/:id', (req, res) => {
  let book = books.find((book) => book.isbn13 == req.params.id);
  if (book) {
    books[books.indexOf(book)] = req.body;
    res.json({ message: 'Book with ISBN13: ' + req.body.isbn13 +  ' successfully updated!' });
  } else {
    res.status(404).json({ message: 'Book with ISBN13: ' + req.body.isbn13 + ' does not exist!' });
  }
});

app.delete('/book/:id', (req, res) => {
  let book = books.find((book) => book.isbn13 == req.params.id);
  if (book) {
    books.splice(books.indexOf(book), 1);
    res.json({ message: 'Book with ISBN13: ' + req.params.id +  ' successfully deleted!' })
  } else {
    res.status(404).json({ message: 'Book with ISBN13: ' + req.body.isbn13 + ' does not exist!' });
  }
});

Object
  .keys(books[0])
  .forEach((prop) => {
    app.get('/book/:id/' + prop, (req, res) => {
      let book = books.find((book) => book.isbn13 == req.params.id);
      if (book) {
        res.json({ [prop]: book[prop] });
      } else {
        res.status(404).json({ message: 'Book with ISBN13: ' + req.params.id + ' does not exist!' });
      }
    });

    app.put('/book/:id/' + prop, (req, res) => {
      let book = books.find((book) => book.isbn13 == req.params.id);
      if (book) {
        books[books.indexOf(book)][prop] = (req.body[prop]) ? req.body[prop] : books[books.indexOf(book)][prop];
        res.json({ message: 'Book with ISBN13: ' + req.params.id +  ' successfully updated!' });
      } else {
        res.status(404).json({ message: 'Book with ISBN13: ' + req.params.id3 + ' does not exist!' });
      }
    });
  });

app.listen(port, () => {});