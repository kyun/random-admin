import { APIGatewayProxyEvent } from 'aws-lambda';

import mysql, { QueryError, RowDataPacket } from 'mysql2/promise';
import { dateTime } from 'utils/datetime';



// PUT;/banner
export async function addBanner(event: any){
  const connection = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'random-admin',
    timezone: 'UTC'
  });
  function makeid(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  try{
    const { id } = (event.requestContext.authorizer.claims);

    const { title, img_src } = JSON.parse(event.body);
    const now = dateTime(new Date());
    //const now = new Date().toLocaleString();
    const [rows] = await connection.execute(`
      INSERT INTO banner(banner_id, title, banner_img, publisher, created_at, updated_at, starts_at, expire_at)
      VALUES ('${makeid(4)}', '${title}', '${img_src}', '${id}', '${now}', NOW(), NOW(), NOW())
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