import mysql from 'mysql2';
import { config } from 'dotenv'

config();

const pool = mysql.createPool({
    host: process.env.HOST_NAME,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.DB_NAME
}).promise()

const  getFriends = async () => {
    // destructuring is used in order to only get the array of friends in the database
    const [result] = await pool.query(`
    SELECT * FROM the_boys
    `)

    return result;
}

const getFriend = async(id) => {
    // destructuring is used in order to only get the array of friends in the database
    const [result] = await pool.query(`
    SELECT * FROM the_boys
    WHERE id = ?
    `, [id]);

    return result;
}


const addFriend = async (name, age) => {
    const [friend] = await pool.query(`
    INSERT INTO the_boys (name, age) VALUES (?, ?)
    `, [name, age]);

    // this will return the entire JSON object of the
    // data being inserted
    return getFriend(friend.insertId)
}

// console.log(await getFriends());
// console.log(await getFriend(5));

const deleteFriend =  async (id) => {
    const [friend] = await pool.query(`
    DELETE FROM the_boys WHERE id = ?
    `, [id]);
}

const editFriend = async (name, age, id) => {
    const [friend] = await pool.query(`
    UPDATE the_boys SET name = ?, age = ? WHERE id = ?
    `, [name, age, id]);
}


export { getFriends, getFriend, addFriend, deleteFriend, editFriend }