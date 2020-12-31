import { authorizeManager } from 'authorizer/authorizationChecker';
import mysql from 'mysql2/promise';

export async function getBanners(event: any){
  const connection = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'random-admin',
    timezone: 'UTC',
  });
  try {
    // const { org_id } = event.requestContext.authorizer?.claims;
    await authorizeManager('GET;/banners', event, connection);
    console.log(new Date());
    console.log(new Date().toISOString());
    const [rows]: any = await connection.query(`
      SELECT * FROM banner
    `);
    console.log(rows?.[0]?.created_at.toISOString())
    console.log(rows?.[0]?.created_at.toLocaleString('ko-KR', { timeZone: "Asia/Seoul" }))

    return {
      statusCode: 200,
      body: JSON.stringify({
        rows,
        message: 'SCC'
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