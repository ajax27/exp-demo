const express = require('express');
const validate = require('./validate');
const mongoose = require('mongoose');
const moviesRouter = require('./routes/movies');

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/movies';
const db = mongoose.connection;

app.use(express.static('public'));

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });

db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());
app.use('/movies', moviesRouter);
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

// const lessons = [
//     {id: 1, lesson: 'lesson 1'},
//     {id: 2, lesson: 'lesson 2'},
//     {id: 3, lesson: 'lesson 3'}
// ];

// app.get('/', (req, res) => res.send('Hi Shaun!'));
// // get route
// app.get('/api/lessons', (req, res) => res.send(lessons));
// // get by id route
// app.get('/api/lessons/:id', (req, res) => {
//     const lesson = lessons.find(l => l.id === parseInt(req.params.id));
//     if (!lesson) res.status(404).send('That lesson does not exist!');
//     res.send(lesson);
// });
// // post route
// app.post('/api/lessons/', (req, res) => {
//     validate(req, res);
//     const lesson = {
//         id: lessons.length + 1,
//         lesson: req.body.lesson
//     };
//     lessons.push(lesson);
//     res.send(lesson);
// });
// // update route
// app.put('/api/lessons/:id', (req, res) => {
//     const lesson = lessons.find(l => l.id === parseInt(req.params.id));
//     if (!lesson) res.status(404).send('That lesson does not exist!');
//     validate(req, res);
//     lesson.lesson = req.body.lesson;
//     res.send(lesson);
// });
// // delete route
// app.delete('/api/lessons/:id', (req, res) => {
//     const lesson = lessons.find(l => l.id === parseInt(req.params.id));
//     if (!lesson) res.status(404).send('That lesson does not exist!');
//     const index = lessons.indexOf(lesson);
//     lessons.splice(index, 1);
//     res.send(lesson);
// });

