const Joi = require('joi');
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

app.get('/api/games/:id', (req, res) => {
    const game = games.find(c => c.id === parseInt(req.params.id));
    if (!game) 
        return res.status(404).send('game with given id was not found!');
    else 
        res.send(game);
});

app.delete('/api/games/:id', (req, res) => {
    const game = games.find(c => c.id === parseInt(req.params.id));
    if (!game) 
        return res.status(404).send('game with given id does not exist!');
    const index = games.indexOf(game);
    games.splice(index, 1);

    res.send(game);
});


app.put('/api/games/:id', (req, res) => {
    // look up the game with given id
    // if does not exist return 404
    const game = game.find(c => c.id === parseInt(req.params.id));
    if (!game) 
        return res.status(404).send('The game with the given id does not exist!');
    // else validate
    // id invalid => 400 bad request
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error);
        return;
    }
    // else update course and return it to client
    game.name = req.body.name;
    res.send(game);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));