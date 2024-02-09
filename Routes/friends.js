import express from 'express';
const router = express.Router();
import { getFriends, getFriend, addFriend, deleteFriend, editFriend } from '../db.js'


// advanced routing 
router.route('/')
    .get(async (req, res) => {

        res.send(await getFriends());

    }) 
    .post(async (req, res) => {

        // destructuring with {} gets the exact data out of a module/function 

        const {name, age} = req.body;

        await addFriend(name, age);

        res.send(await getFriends());

    });

router.route('/:id')
    .get(async (req, res) => {

        res.send(await getFriend(+req.params.id));

    })
    .delete(async (req, res) => {

      await deleteFriend(+req.params.id);

      res.send(await getFriend());

    })
    .patch(async (req, res) => {

        const [friend] = await getFriend(+req.params.id);

        let {name, age} = req.body;

        name ? name = name : {name} = friend

        age ? age = age : {age} = friend
        
        await editFriend(name, age, +req.params.id);

        res.json(await getFriends());
    
    });

export default router;
