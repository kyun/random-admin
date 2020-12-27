import { Connection } from 'mysql2/promise';
import { dateTime } from 'utils/datetime';

export async function rewardManager(endpoint: string, user_id: string, connection: Connection) {
  try {
    const [reward_list] = await connection.query<any>(`
      SELECT * FROM reward
      WHERE endpoint = '${endpoint}' AND is_active = true
    `);
    reward_list.forEach( async (reward: any) => {
      const { repeatition, reward_id } = reward;
      
      const history: any = await historyChecker(user_id, reward_id, connection);
      if(repeatition === 'once'){
        
        if(history.length === 0){
          await reward_boy(user_id, reward_id, connection);
        }else{
          console.log(reward_id, 'YOU HAVE ALREADY GET REWARD...');
        }
      }else{
        if(history.length){
          if(new Date().getDate() - new Date(history[0]?.created_at).getDate()){
            await reward_boy(user_id, reward_id, connection);
          }else{
            console.log(reward_id, 'YOU HAVE ALREADY GET REWARD...');
          }
        }
      }
    });
  } catch (e) {

  }
}
async function historyChecker(user_id: string, reward_id: string, connection: Connection) {
  const [history] = await connection.query(`
    SELECT * FROM reward_history
    WHERE reward_id = '${reward_id}' AND user_id = '${user_id}'
    ORDER BY created_at DESC
    LIMIT 1
  `);
  //console.log(history);
  return history;
}
async function reward_boy(user_id: string, reward_id: string, connection: Connection) {
  const [rows] = await connection.execute(`
    UPDATE user SET point = point + '5' WHERE (user_id = '${user_id}');
  `);
  const [rows2] = await connection.execute(`
    INSERT INTO reward_history (reward_id, user_id, created_at)
    VALUES ('${reward_id}', '${user_id}', '${dateTime(new Date())}');
  `);
  console.log(rows);
  console.log(rows2);
}
