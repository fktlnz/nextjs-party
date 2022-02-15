// Import database
const knex = require('../db')

// Retrieve all questions
exports.questionsAll = async (req, res) => {
  // Get all questions from database
  await knex
    .select('*') // select all records
    .from('questions') // from 'questions' table
    .then((userData) => {
      // Send questions extracted from database in response
      // console.log('userData')
      // console.log(userData)
      return res.json(userData);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving questions: ${err}` })
    })
}

// Retrieve all questions
exports.questionsSelect = async (req, res) => {
  // Get all questions from database
  await knex
    .where('id', req.body.id)
    .select('*') // select all records
    .from('questions') // from 'questions' table
    .then((userData) => {
      // Send questions extracted from database in response
      // console.log('userData')
      // console.log(userData)
      return res.json(userData);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving questions: ${err}` })
    })
}

// Create new question
exports.questionsCreate = async (req, res) => {
  // Add new question to database
  knex('questions')
    .insert({ // insert new record, a question
      'question': req.body.question,
      'select1_text': req.body.select1_text,
      'select1_imgpath': req.body.select1_imgpath,
      'select2_text': req.body.select2_text,
      'select2_imgpath': req.body.select2_imgpath,
      'select3_text': req.body.select3_text,
      'select3_imgpath': req.body.select3_imgpath,
      'select4_text': req.body.select4_text,
      'select4_imgpath': req.body.select4_imgpath,
      'answer': req.body.answer
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `Question \'${req.body.question}\' created.` })
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${req.body.question} question: ${err}` })
    })
}

// Update specific question
exports.questionsUpdate = async (req, res) => {
  // Find specific question in the database and remove it
  knex('questions')
    .where('id', req.body.id) // find correct record based on id
    .update({
      'question': req.body.question,
      'select1_text': req.body.select1_text,
      'select1_imgpath': req.body.select1_imgpath,
      'select2_text': req.body.select2_text,
      'select2_imgpath': req.body.select2_imgpath,
      'select3_text': req.body.select3_text,
      'select3_imgpath': req.body.select3_imgpath,
      'select4_text': req.body.select4_text,
      'select4_imgpath': req.body.select4_imgpath,
      'answer': req.body.answer
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `Question ${req.body.id} updated.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error updating ${req.body.id} question: ${err}` })
    })
}


// Remove specific question
exports.questionsDelete = async (req, res) => {
  // Find specific question in the database and remove it
  knex('questions')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `Question ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} question: ${err}` })
    })
}

// Remove all questions on the list
exports.questionsReset = async (req, res) => {
  // Remove all questions from database
  knex
    .select('*') // select all records
    .from('questions') // from 'questions' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'Question list cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting Question list: ${err}.` })
    })
}
