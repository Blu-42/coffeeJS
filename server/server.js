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

app.get('/getMenu', async (req, res) => {
    console.log('gn2 /getMenu');
    //reach out to the db to get the menu
    const { data: menu, error } = await supabase
        .from('menu')
        .select();

    if (error) {
        console.error('error', error);
        return res.status(500).json({ error: error.message });
    }

    console.log ('menu', menu);
    console.log ('error', error);

    res.json(menu);
});

app.post('/login', async (req, res) => {
    //console.log('gn2 /login', req.body);
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


app.post('/contact', async (req, res) => {
    //console.log('gn2 /contactForm', req.body);

    if(!req.body || req.body.length < 1) {
        res.status(400).json({ message: "Error submitting contact form.  Ensure all fields are filled out"})
    }

    const messageObj = req.body;
    console.log ('messageObj', messageObj)

    const {data, error} = await supabase
        .from ('contact_form_messages')
        .insert ([
            {
                first_name: messageObj.firstMame,
                last_name: messageObj.lastName,
                email: messageObj.email,
                comment: messageObj.comment,
            }
        ])

        if (error) {
            console.error('error', error);
            return res.status(500).json({ error: error.message});
        }
    res.status(200).json({message: "Message Received Successfully"})
})

console.log('im listening')
app.listen(3000);