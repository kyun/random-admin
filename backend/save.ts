import AWS from 'aws-sdk';
import fetch from 'node-fetch';

const s3 = new AWS.S3();

export const save = (event: any, context: any, callback: any) => {
  fetch(event.image_url).then((response: any) => {
    if (response.ok) {
      return response;
    }
    return Promise.reject(new Error(
          `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`));
  })
  .then((r: any)=> r.buffer())
  .then((buffer: any) => (
    s3.putObject({
      Bucket: process.env.BUCKET as string,
      Key: event.key,
      Body: buffer,
    }).promise()
  ))
  .then((v:any) => callback(null, v), callback);
};
