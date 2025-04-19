const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    console.log('hitting / route')
    res.send('Hello world')
});

app.get('/getMenu', (req, res) => {
    console.log('gn2 /getMenu');
    //reach out to the db to get the menu
    res.json(menu);
});

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



console.log('im listening')
app.listen(3000);