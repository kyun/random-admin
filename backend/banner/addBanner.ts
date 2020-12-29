import { APIGatewayProxyEvent } from 'aws-lambda';

import mysql, { QueryError, RowDataPacket } from 'mysql2/promise';
import { dateTime } from 'utils/datetime';

// PUT;/banner
export async function addBanner(event: any){
  const connection = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'random-admin'
  });
  try{
    const { id } = (event.requestContext.authorizer.claims);

    const { title, img_src } = JSON.parse(event.body);
    const now = dateTime(new Date());
    const [rows] = await connection.execute(`
      INSERT INTO banner(banner_id, title, banner_img, publisher, created_at, updated_at, starts_at, expire_at)
      VALUES ('${now}', '${title}', '${img_src}', '${id}', '${now}', '${now}', SYSDATE(), NOW())
    `).catch((e: any) => {
      throw e;
    });

    return { 
      statusCode: 200,
      body: JSON.stringify({
        message: 'SSCUCCESS',
      })
    }
  }catch(e){
    return {
      statusCode: 400,
      body: JSON.stringify({
        ...e,
        message: 'FAILURE'
      })
    }
  }
}