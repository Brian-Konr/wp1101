import express from 'express';
const router = express.Router();

var bingoNum = 1;
const genNumber = () => {
    return Math.floor(Math.random() * 100);
}

router.get('/', (_, res) => {
    res.end("Welcome to guess page.")
})
router.post('/start', (_, res) => {
    bingoNum = genNumber(); // generate a random number
    res.json({
        msg: 'The game has started.'
    });
})

router.post('/restart', (_, res) => {
    bingoNum = genNumber();
    res.json({
        msg: 'The game has started.'
    });
})
router.get('/guess', (req, res) => {
    let guessNum = Number(req.query.number);
    if(!guessNum || guessNum < 0 || guessNum > 100) {
        res.status(406).send({ msg: "Out of range"})
        return;
    }
    else if(guessNum < bingoNum) res.send({msg: "Bigger"})
    else if(guessNum > bingoNum) res.send({msg: "Smaller"})
    else if(guessNum === bingoNum) res.send({msg: "bingo"})
})

export default router;