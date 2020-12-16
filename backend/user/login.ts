import mysql from 'mysql2/promise';
import { encrypt } from './password';

export const login = async (event: any) => {
  const connection = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'random-admin'
  });
  try{
    const { id, password } = JSON.parse(event.body);
    
    if(!id || !password) {
      throw new Error('no')
    }
    console.log(id, password);
    const encrypted = await encrypt(password);
    const now = Date.now();
    console.log(now);
    console.log(id, password);
    const rows = await connection.query(`
      SELECT * FROM user
      WHERE id = '${id}'
    `);
    console.log(rows);

    return {
      statusCode: 200,
      body: JSON.stringify({
        rows
      })
    }


  }catch(e){

  }
}