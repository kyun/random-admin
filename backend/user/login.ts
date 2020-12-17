import mysql, { FieldPacket } from 'mysql2/promise';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const SALT = 'SALT';
const ITERATIONS = 1109;
const SECRET = "SECRET";

async function generateToken(id: string): Promise<{ access_token: string, refresh_token: string }> {
  async function signToken(user: any, subject="access_token", expiresIn=60*60){
    return jwt.sign({
      ...user,
    }, SECRET, {
      expiresIn,
      issuer: 'random',
      subject
    });
  }
  try {
    const access_token = await signToken({id, role: "MASTER"});
    const refresh_token = await signToken({id}, "refresh_token", 60 * 60 * 24);
    return {
      access_token,
      refresh_token
    }
  } catch (e) {
    return {
      access_token: "",
      refresh_token: ""
    }
  }
};

function encrypt(password: string): string {
  return crypto.pbkdf2Sync(password, SALT, ITERATIONS, 64, 'sha512').toString('base64');
}
export const login = async (event: any) => {
  const connection = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'random-admin'
  });
  try{
    const { id, password } = await JSON.parse(event.body);
    if(!id || !password) {
      throw new Error('no')
    }

    const encrypted = encrypt(password);
    const now = Date.now();
    console.log(now);
    const { access_token, refresh_token } = await generateToken("gg");
    console.log(access_token);
    const [rows]: any = await connection.query(`
      SELECT * FROM user
      WHERE id = '${id}' AND password = '${encrypted}'
    `);
    console.log( rows);
    if(rows.length === 0){
      return {
        statusCode: 403,
        body: JSON.stringify({
          message: 'incorrect'
        })
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
        "Set-Cookie" : `access_token=${access_token};refresh_token=${refresh_token};Max-Age=${60 * 60 * 24 * 7};path=/;`
      },
      body: JSON.stringify({
        rows,
        access_token,
      })
    }


  }catch(e){
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: 'ee'
      })
    }
  }
}

