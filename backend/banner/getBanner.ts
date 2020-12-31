import mysql from 'mysql2/promise';


export async function getBanner(event: any) {
  const connection = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'random-admin'
  });
  try{
    const { banner_id } = event.queryStringParameters as any;
    const [ rows ] = await connection.query(`
      SELECT * FROM banner
      WHERE banner_id = '${banner_id}'
    `);
    console.log(rows);
    return {
      statusCode: 200,
      body: JSON.stringify({
        rows,
        message: 'SCC'
      })
    }
  }catch(e){
    return {
      statusCode: 400,
      body: JSON.stringify({
        ...e,
        messagess: 'ERROR'
      })
    }
  }
}