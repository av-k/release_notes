# Example Application with Backend and Frontend parts

### Technology stack:
* NodeJS (lightweight framework [Hapi.js](https://hapijs.com/))
* PostgreSQL (ORM [Sequelize](http://docs.sequelizejs.com/))
* React + Redux
* UI Components [Ant Design](https://ant.design/)
* Docker

## Running

1) Clone repo.

#### Production:
```bash
docker-compose up
# web server will be available at URL `http://0.0.0.0:3000`
```

#### Development:
For a start in `docker-compose.yml` comment out the code for services `api` and `web` and start `postgres` service for DB instance.

```bash
# API
# install packages
cd api
npm i
# run local server
node src/index.js
# the server will be available by default at URL `http://0.0.0.0:3010`

# WEB
# install packages
cd web
npm i
# run local server
npm run dev
# the server will be available by default at URL `http://0.0.0.0:3000`
```

