import jwt from 'jsonwebtoken';

export async function generateToken(id: string){
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
    const token = await signToken({ id });
    const refresh_token = await signToken({ id }, "refresh_token", 60 * 60 * 24 * 7);
    const decoded = jwt.verify(token, secret);
    return {
      message: 'success',
        token,
        refresh_token,
        decoded,
    }
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
        "Set-Cookie" : `refresh_token=${refresh_token};Max-Age=${60 * 60 * 24 * 7};path=/;`
      },
      body: JSON.stringify({
        message: 'success',
        token,
        refresh_token,
        decoded,
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