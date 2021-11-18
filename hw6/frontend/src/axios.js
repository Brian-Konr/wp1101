import axios from 'axios';

const instance = axios.create({baseURL: 'http://localhost:4000'});

const startGame = async () => {
    let res = await instance.post('/api/start');
    return res.data;
}

const guess = async (number) => {
    try {
        let res = await instance.get('/api/guess', {
            params: {number}
        });
        return res.data.msg;
    } catch (error) {
        return 406;
        // handle other errors
    }
}

const restart = async () => {
    let res = await instance.post('/api/restart');
    return res.data;
}

export {startGame, guess, restart}