const express = require('express');
const app = express();

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
];
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id);
// });

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    // req.params.id return strings to parse this string into integer
    if(!course){ //404
        res.status(404).send('The course with given id was not found.');
    }else{
        res.send(course);
    }
});

//how to read params
// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);
// });

// how to read query string paramter
// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.query);
// });


// PORT
const port = process.env.PORT || 3000;
//yiu can set port on terminal set PORT = 5000
app.listen(port, () => console.log(`Listening on port ${port}...`));
