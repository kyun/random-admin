import jwt from 'jsonwebtoken';

export async function generateToken(event: any){
  const secret = "SECRET";
  async function signToken(user: any, subject="access_token", expiresIn=60*60*24) { 
    return jwt.sign({
      id: user.id,
    },
    secret,
    {
      expiresIn,
      issuer: 'random-admin',
      subject
    });
  }
  try {
    const body = JSON.parse(event.body);
    const token = await signToken({ id: body.id });
    const refresh_token = await signToken({ id: body.id }, "refresh_token", 60 * 60 * 24 * 7);
    const decoded = jwt.verify(token, secret);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "http://localhost:3000", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
        "Set-Cookie" : `refresh_token=${refresh_token};Max-Age=${60 * 60 * 24 * 7};path=/;HttpOnly;`
      },
      body: JSON.stringify({
        message: 'success',
        token,
        refresh_token,
        decoded,
        body
      })
    }
  } catch (e){
    return {
      statusCode: 500,
      body: JSON.stringify({
        body: 'ggg'
      })
    }
  }
}