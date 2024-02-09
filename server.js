import { config } from 'dotenv';
config();
import express from 'express';
import cors from 'cors';
import routeFriends from './Routes/friends.js';



const app = express();
const PORT_NO = process.env.PORT;

// always declare on top of everything
app.use(cors());

app.use(express.json());

app.use(express.static('public'));
app.use('/friends', routeFriends)



app.listen(PORT_NO, () => {
    console.log(`http://localhost:${PORT_NO}`);
});
