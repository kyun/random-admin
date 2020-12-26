import { APIGatewayProxyEvent } from 'aws-lambda';
import mysql from 'mysql2/promise';
import { authorizeManager } from 'authorizer/authorizationChecker';

export async function getUserInfo(event: APIGatewayProxyEvent) {
  const connection = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'random-admin'
  });
  try {
    console.log(event.queryStringParameters);
    const { user_id } = event.queryStringParameters as any;
    const { org_id } = (event.requestContext.authorizer?.claims);
    await authorizeManager('GET;/user/:user_id', event, connection);
    const [ rows ] = await connection.query(`
      SELECT * FROM user
      WHERE user_id = '${user_id}'
    `);
    console.log(rows);
    return {
      statusCode: 200,
      body: JSON.stringify({
        rows,
        message: 'SUCCE'
      })
    }
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        ...e,
        messagess: 'ERROR'
      })
    }
  }
}