import mysql from 'mysql2/promise';



function makeid(length: number) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function hi(event:any){
  const connection = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'random-admin'
  });
   
  //const [rows, fields] = 
  //await connection.execute(`INSERT INTO user (user_id, id, password) VALUES ('${makeid(6)}', '${makeid(6)}', '${makeid(6)}')`);

  //await connection.execute(`SELECT * FROM user`);

  // connection.connect();
  // const res = await connection.query(
  //   'SELECT * FROM `user`',
  //   function(err, results, fields) {
  //     console.log(results); // results contains rows returned by server
  //     return results;
  //   }
  // );
  return {
    statusCode: 200,
    body: JSON.stringify({
      rows: 'hi',
    })
  }
  // for TEST
  // connection.end();
  // await dbClient.connect();
  // const result = await dbClient.query(` SELECT 2*4 니AS number `)

}