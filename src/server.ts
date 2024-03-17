import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

const port = config.port;
const serverURL: string | undefined = config.db_url;
async function main() {
  try {
    await mongoose.connect(serverURL as string);

    app.listen(port, () => {
      console.log(
        `[server 🔥⚡]: Server is running at http://localhost:${port}`,
      );
    });
  } catch (err) {
    throw new Error('server is down!');
  }
}

main();
