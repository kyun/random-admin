import mysql, { QueryError, RowDataPacket } from 'mysql2/promise';
import crypto from 'crypto';
import { RoleType, Role, Authorization } from './../types/db';
import { encryptPassword } from './password';
import { authorizeManager } from 'authorizer/authorizationChecker';
// PUT;/user
export async function addUser(event: any) {
  const connection = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'random-admin'
  });
  try {
    // console.log(event.requestContext.authorizer.claims);
    const { org_id } = (event.requestContext.authorizer.claims);
    const { id, password, role, } = JSON.parse(event.body);

    await authorizeManager('PUT;/user', event, connection);
    const now = Date.now();
    const encrypted = encryptPassword(password);
    // console.log(id, password, role);
    const [rows] = await connection.execute(`
      INSERT INTO user (user_id, id, password, role, status, created_at, updated_at, org_id)
      VALUES ('${id.toString('base64')}', '${id}', '${encrypted}', '${role}', 'ACTIVE', '${now}', '${now}', '${org_id}')
    `).catch((e: QueryError) => {
      // console.log(e);
      throw e;
    });
    // console.log(rows);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'SUCCESS',
      })
    }
  } catch (e) {
    console.log('OCCUR ERROR!!');
    // console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify({
        ...e,
      })
    }
  }
}