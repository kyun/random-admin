import mysql from 'mysql2/promise';
import { RoleType, Role, Authorization } from 'types/db';


export async function getUserList(event: any) {
  const connection = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'random-admin'
  });
  try {
    const { role: executerRole, org_id } = (event.requestContext.authorizer.claims);
    console.log(org_id);
    const [[{ default_role }]] = await connection.query<Array<Authorization>>(`
      SELECT * FROM authorization
      WHERE endpoint = '${'GET;/users'}' 
    `);
    if(default_role && Role[executerRole as RoleType] < Role[default_role]){
      throw {
        code: 10001,
        message: `excutes failed...`,
        reason: `You have not permission...`
      }
    }
    const [ rows ] = await connection.query(`
      SELECT * FROM user
      WHERE org_id = '${org_id}'
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