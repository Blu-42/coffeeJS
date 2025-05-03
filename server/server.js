const express = require('express');
const cors = require('cors');
require('dotenv').config();
const supabase = require('./db');

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    console.log('hitting / route')
    res.send('Hello world')
});

app.get('/getMenu', (req, res) => {
    console.log('gn2 /getMenu');
    //reach out to the db to get the menu
    res.json(menu);
});

app.post('/login', async (req, res) => {
    console.log('gn2 /login', req.body);
    //check user login
    // res.json(menu);
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email: req.body.username,
        password: req.body.password
    });

    //const user = data?.user;

    if (error) {
        console.error('Signin error', error);
        return res.status(401).json({ error: error.message });
    }
    res.status(200).json({message: 'Success'})
});






// User data
const user = { username: 'admin', password: 'password123' };

//menu
const menu = [
    {
        name: 'Americano', 
        price: 2.5, 
        type: 'hot',
    },
    {name: 'Latte', price: 3.0, type: 'hot'},
    {name: 'Cappuccino', price: 3.5, type: 'hot'},
    {name: 'Frozen Americano', price: 4.5, type: 'cold'},
    {name: 'Frozen Latte', price: 2.5, type: 'cold'},
    {name: 'Pup Cup', price: 0, type: 'cold'},
];

const contacts = [];

app.post("/contact", (req, res) => {
    const { data } = req.body;
    contacts.push(data);
    console.log("New contact received:", data);
    res.status(201).json({ message: "Contact saved", data });
});


console.log('im listening')
app.listen(3000);