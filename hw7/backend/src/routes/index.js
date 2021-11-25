import express from 'express';
import ScoreCard from '../models/ScoreCard';
// import mongo from '../mongo';
const router = express.Router();

router.delete('/clear-db', async (req, res) => {
    try {
        await ScoreCard.deleteMany({});
        res.json({message: "Database Cleared"});
    } catch (error) {
        res.json({message: error})
    }
})

router.get('/query-cards', async (req, res) => {
    let queryType = req.query.type,
        queryString = req.query.queryString;
    if(queryType === 'name') { // query name
        const existing = await ScoreCard.findOne({name: queryString});
        if(existing) {
            let filterData = await ScoreCard.find({name: queryString}).exec();
            res.json({messages: filterData});
        }
        else {
            res.json({message: `Name (${queryString}) not found!`})
        }
    }
    else if(queryType === 'subject') { // query subject
        const existing = await ScoreCard.findOne({subject: queryString.toString().toLowerCase()});
        if(existing) {
            let filterData = await ScoreCard.find({subject: queryString.toString().toLowerCase()}).exec();
            res.json({messages: filterData});
        }
        else {
            res.json({message: `Subject (${queryString}) not found!`})
        }
    }
})

router.post('/create-card', async (req, res) => {
    let reqName = req.body.name,
        reqSubject = req.body.subject.toLowerCase(),
        reqScore = req.body.score;
    const existing  = await ScoreCard.findOne({name: reqName, subject: reqSubject});
    if(existing) { //means we need to update
        try {
            let updateCard = await ScoreCard.updateOne(
                {name: reqName, subject: reqSubject},
                {
                    $set: {score: reqScore}
                }
            )
            res.json({
                message: `Updating (${reqName}, ${reqSubject}, ${reqScore})`,
                card: updateCard
            })
        } catch(error) {
            res.json({message: error});
        }
    }
    else {
        const newRecord = new ScoreCard({
            name: reqName,
            subject: reqSubject,
            score: reqScore
        })
        try {
            let newCard = await newRecord.save();
            res.json({
                message: `Adding (${reqName}, ${reqSubject}, ${reqScore})`,
                card: newCard
            });
        } catch (error) {
            res.json({message: err});
        }
    }

})
export default router;