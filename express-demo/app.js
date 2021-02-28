const express = require('express');
const app = express();

app.use(express.json());

const games = [
    { id: 1, name: "Assassin's Creed Unity"},
    { id: 2, name: "Call of Duty"},
    { id: 3, name: "Zoo Tycoon"  }
];

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/games', (req, res) => {
    res.send(games);
});

app.post('/api/games', (req, res) => {
    const game = {
        id: games.length + 1,
        name: req.body.name
    };
});

app.get('/api/games/:id', (req, res) => {
    const game = games.find(c => c.id === parseInt(req.params.id));
    if (!game) 
        res.status(404).send('game with given id was not found!');
    else 
        res.send(game);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));