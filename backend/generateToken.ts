import jwt from 'jsonwebtoken';

interface User {
  id: string;
};

export async function handler(event: any){
  async function signToken(user: User, subject='access_token', expiresIn=86400 ){
    const secret = Buffer.from("process.env.JWT_SECRET" as string, "base64");
    return jwt.sign({
      id: user.id,
    }, 
    secret, 
    {
      expiresIn,
      issuer: 'jinongun',
      subject
    });
  }
  try{

    const body = JSON.parse(event.body as string);

    const secret = Buffer.from("process.env.JWT_SECRET" as string, "base64");
   
    const token = await signToken({id: body.id});
    const refresh_token = await signToken({id: body.id},"refresh_token", 86400 * 7)
    const decoded = jwt.verify(token, secret);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "http://localhost:3000", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
        "Set-Cookie" : `refresh_token=${refresh_token};Max-Age=${86400 * 7};path=/;HttpOnly;`
      },
      body: JSON.stringify({
        message: 'success',
        token,
        refresh_token,
        decoded,
        body
      })
    };
  }catch{
    return {
      statusCode: 500,
      body: JSON.stringify({
        body: 'ggg'
      })
    }
  }
}