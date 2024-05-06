const express = require('express');
const path = require('path')
const fs = require('fs')
const app = express();
const PORT = process.env.PORT || 3001;
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req,res) => { 
    res.send('Welcome to the Note Taker App')
});

app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read notes from the database.' });
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    if (!title || !text) {
        return res.status(400).json({ error: 'Title and text are required.' });
    }

    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read notes from the database.' });
        }

        const notes = JSON.parse(data);
        const newNote = {
            id: uuidv4(),
            title,
            text
        };
        notes.push(newNote);

        fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to write note to the database.' });
            }

            res.json(newNote);
        });
    });
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});