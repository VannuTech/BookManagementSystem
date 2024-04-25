const express = require('express');
const { body, validationResult } = require('express-validator');
const contactModal = require("../model/model");

const app = express();

const validate = validations => {
  return async (req, res, next) => {
    try {
      for (let validation of validations) {
        const result = await validation.run(req);
        console.log(result.errors);
        if (result.errors.length) break;
      }

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      res.status(400).json({ errors: errors.array() });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
};

exports.getBooksList = async (req, res) => {
  let params = req.query;
  try {
    const results = await contactModal.getListofBooks(params);
    if (results.length > 0) {
      res.status(200).json({ status: 'T', message: "List of books", data: results });
    } else {
      res.status(201).send({ status: 'F', message: 'No books Found', data: [] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Something wrong');
  }
};


exports.addBook = [
  validate([
    body('book_name').notEmpty().withMessage('Book name is required'),
    body('publication_year').notEmpty().withMessage('publication year is required'),
    body('author_name').notEmpty().withMessage('Author name must not be empty')
  ]),
  async (req, res) => {
    try {
     
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const param = req.body;
       
      const results = await contactModal.createBookList(param);
      if (results.length > 0) {
        res.status(200).json({ status: 'T', message: "Book added successfully" });
      } else {
        res.status(201).send({ status: 'F', message: 'Book cant be added without valid data', data: [] });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Something wrong');
    }
  }
];

exports.updateBookById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const param = req.body;
    console.log(JSON.stringify(param, "klklklklk"));
    // Update the book in the database
    const result = await contactModal.updateBook(param);

    if (result.affectedRows > 0) {
      res.status(200).json({ status: 'T', message: "Book updated successfully" });
    } else {
      res.status(404).json({ status: 'F', message: 'Book not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
};

exports.deleteBookById = async (req, res) => {
  try {
        
    const param = req.body;
    console.log(JSON.stringify(param, "klklklklk"));
    // Update the book in the database
    const result = await contactModal.deleteBook(param);
    
    if (result.affectedRows > 0) {
      res.status(200).json({ status: 'T', message: "Book deleted successfully" });
    } else {
      res.status(404).json({ status: 'F', message: 'Book not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
};

