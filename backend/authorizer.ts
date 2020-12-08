import jwt from 'jsonwebtoken';
import { APIGatewayProxyHandler } from 'aws-lambda';

function generatePolicyDocument(effect: any, methodArn: any) {
  if (!effect || !methodArn) return null;

  const policyDocument = {
      Version: '2012-10-17',
      Statement: [{
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: methodArn
      }]
  };

  return policyDocument;
}
function generateAuthResponse(principalId: string, effect: any, methodArn: any) {
  const policyDocument = generatePolicyDocument(effect, methodArn);

  return {
      principalId,
      policyDocument
  };
}

export async function authorizer(event: any, context: any, callback: any) {
  const access_token = event.authorizationToken.replace("Bearer ", "");
  const methodArn = event.methodArn;
  if(!access_token || !methodArn){
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      },
      body: JSON.stringify({
        message: 'Unauthorized',
      })
    }
  }
  const secret = Buffer.from(process.env.JWT_SECRET as string, "base64");
  const decoded: any = jwt.verify(access_token, secret);

  if (decoded && decoded.id) {
    return callback(null, generateAuthResponse(decoded.id, "Allow", methodArn));
  } else {
    return callback(null, generateAuthResponse(decoded.id, "Deny", methodArn));
  }

}