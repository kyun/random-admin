import { Connection } from 'mysql2/promise';
import { Authorization, Role, RoleType } from 'types/db';


export async function authorizeManager(endpoint: string, event: any, connection: Connection) {

    const { role: executerRole, org_id } = (event.requestContext.authorizer.claims);
    const [[{ default_role }]] = await connection.query<Array<Authorization>>(`
      SELECT * FROM authorization
      WHERE endpoint = '${endpoint}' 
    `);
    if(default_role && Role[executerRole as RoleType] < Role[default_role]){
      throw {
        code: 10001,
        message: `excutes failed...`,
        reason: `Your role = ${executerRole}; Allow role = ${default_role}`
      }
    }
    return true;
}