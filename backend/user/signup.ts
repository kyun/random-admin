import crypto from 'crypto';
import mysql from 'mysql2/promise';
import {createConnection, QueryError, RowDataPacket} from 'mysql2';
import { encryptPassword } from './password';

const SALT = 'SALT';
const ITERATIONS = 1109;
export const signup = async (event: any) => {
  const connection = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'random-admin'
  });
  try{
    const { id, password, role } = JSON.parse(event.body);
    if(!id || !password || !role){
      throw new Error('not Found');
    }
    const key = crypto.pbkdf2Sync(password, 'SALT', 1109, 64, 'sha512').toString('base64')
    const now = Date.now();
    const [rows] = await connection.execute(`
      INSERT INTO user (user_id, id, password, role, status, created_at, updated_at)
      VALUES ('${id.toString('base64')}', '${id}', '${key}', '${role}', 'ACTIVE', '${now}', '${now}')
    `).catch((e: QueryError)=>{
      if(e.code === 'ER_DUP_ENTRY'){
        console.log('id 중복...');
      }
      throw e;
    })
    console.log(rows);
    return {
      statusCode: 200,
      body: JSON.stringify({
        id,
        password,
        key
      }),
    };
  }catch (error){
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'missing...'
      })
    }
  }

};