import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  node_env: process.env.NODE_ENV,
  bcrypt_salt_rounds: process.env.bcrypt_salt_rounds,
  jwt_secret: process.env.JWT_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_exp_in: process.env.JWT_EXP_IN,
  jwt_refresh_exp_in: process.env.JWT_REFRESH_EXP_IN,
};
