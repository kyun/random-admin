import mysql from 'mysql2/promise';
import { encryptPassword } from './password';
import { generateToken } from 'authorizer/generateToken';
import { User } from 'types/db';
import { rewardManager } from 'authorizer/rewardManager';

export const login = async (event: any) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'random-admin',
  });
  try {
    const { id, password } = await JSON.parse(event.body);
    if (!id || !password) {
      throw new Error('no');
    }

    const encrypted = encryptPassword(password);
    const now = Date.now();
    console.log(now);

    const [rows] = await connection.query<Array<User>>(`
      SELECT * FROM user
      WHERE id = '${id}' AND password = '${encrypted}'
    `);

    if (rows.length === 0) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          message: 'incorrect',
        }),
      };
    }
    const { access_token, refresh_token } = await generateToken(rows[0]);

    rewardManager('POST;/login', id, connection);
    // const [rows2] = await connection.query<any>(`
    //   SELECT * FROM reward
    //   WHERE endpoint = '${`POST;/login`}' AND is_active = true
    // `);
    // console.log(rows2);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        'Set-Cookie': `access_token=${access_token};refresh_token=${refresh_token};Max-Age=${60 * 60 * 24 * 7};path=/;`,
      },
      body: JSON.stringify({
        rows,
        access_token,
      }),
    };
  } catch (e) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: 'ee',
      }),
    };
  }
};
