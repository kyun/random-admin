import { authorizeManager } from 'authorizer/authorizationChecker';
import { APIGatewayProxyEvent } from 'aws-lambda';
import mysql from 'mysql2/promise';
import { RoleType, Role, Authorization } from 'types/db';

export async function getUserList(event: APIGatewayProxyEvent) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'random-admin',
  });
  try {
    // console.log(event.queryStringParameters);
    const { org_id } = event.requestContext.authorizer?.claims;
    await authorizeManager('GET;/users', event, connection);

    const [rows] = await connection.query(`
      SELECT * FROM user
      WHERE org_id = '${org_id}'
    `);
    // console.log(rows);

    return {
      statusCode: 200,
      body: JSON.stringify({
        rows,
        message: 'SUCCE',
      }),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        ...e,
        messagess: 'ERROR',
      }),
    };
  }
}
