# pantohealth sample project

### For running the project please run this command in root directory:

- `docker compose up`

### or

- `docker compose up -d`

**project will be started after downloading images and create application's images**

- signal-sender app running on port 3000
- signal-analyzer app running on port 3001
- rabbitMQ management interface run on port 15672

**signal-sender app send a signal every 20 second through rabbitMQ and signal-analyzer app will retrieve it and after processing will save it to mongoDB**

_for accessing data in MongoDB use GUI apps like Mongo Compass._

**For running sample unit test move to signal-analyzer app directory and run this command:**

- `npm run test`

### And API part of application:

**you can access swagger interface through this url:**

- `http://localhost:3001/api`
- [Swagger](http://localhost:3001/api)

**for stopping the entire app and remove the data use this command:**

- `docker compose down -v`
