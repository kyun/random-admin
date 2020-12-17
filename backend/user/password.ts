import crypto from 'crypto';



export function encrypt(password: string): string{
  console.log('En');
  console.log(password);
  const p = '123';
  //const p = crypto.pbkdf2Sync(password, SALT, ITERATIONS, 64, 'sha512').toString('base64')
  return p;
}

export function ssss(): string {
  console.log('ssss')
  const p= '123';
  return p;
}