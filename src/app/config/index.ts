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

  base_url: process.env.BASE_URL,
  mail_host: process.env.HOST,
  mail_service: process.env.SERVICE,
  mail_port: process.env.EMAIL_PORT,
  mail_secure: process.env.SECURE,
  mail_sender: process.env.SENDER_MAIL_USER,
  mail_pass: process.env.MAIL_PASS,

  image_cloud_name: process.env.IMAGE_CLOUD_NAME,
  image_cloud_key: process.env.IMAGE_CLOUD_KEY,
  image_cloud_secret: process.env.IMAGE_CLOUD_SECRET,
};
