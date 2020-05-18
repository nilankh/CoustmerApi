const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());
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

// POST requests
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); //result.error
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(courses);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // if not existinfg return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    // req.params.id return strings to parse this string into integer
    if(!course){ //404
        res.status(404).send('The course with given id was not found.');
    }
    // validate
    
    const { error } = validateCourse(req.body); //result.error
    
// if invalid, return 400 - BAd request
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    
    // Update course
    course.name = req.body.name;
    res.send(course);
    // Return the updated course

});



function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return  Joi.validate(course, schema);
}

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
