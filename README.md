# Product-MERN-Docker

![App](./assets/mern_docker_schema.png)

Application made with ReactJS + ExpressJS + MongoDB

You must have Docker and docker-compose Installed in your System !

### How to run the App :

#### Development

Run the app using:

`$ docker-compose -f docker-compose-dev.yml up `

or

`$ docker-compose up -d`

Above command will start the services on (-d) detach mode (similar like running the app in background)

Then you can check the status of the containers by running:

`$ docker ps`

visit server or client : http://localhost:8080

To check the status of the running containers :

`docker-compose ps`


#### Production

To deploy in AWS EC2

Run the app using:

`$ docker-compose up -d --build --remove-orphans`

or

`$ docker-compose up -d`

Above command will start the services on (-d) detach mode (similar like running the app in background)

Then you can check the status of the containers by running:

`$ docker ps`

visit server or client : `your_aws_ip:80`

To check the status of the running containers :

`docker-compose ps`


# Execute MERN app
We can also execute our project without Docker

## Launch client + server
```javascript
cd client
//client
npm ci

cd ..
// server
npm ci 

//Preload data MongoDB - seeder
npm run feed_db

// run MERN app
npm run dev
```

# API REST products - Express + MongoDB

API REST Node.js, Express, MongoDB (local) or MongoDB Atlas cloud. 
Some clarifications about backend

## Instalation
```javascript
npm i 
npm i --save-dev nodemon
```

## Preload data MongoDB - seeder

```javascript
npm run feed_db
```

## Start backend for development
```javascript
  npm run server
```

## Start backend for production
```javascript
  npm start
```
## Connect with MongoDB Atlas
Rename `.env.example` to `.env` and add your URL mongoDB atlas
```
DB_URL_ATLAS=
```
## Endpoints

- GET products. Pagination from backend

```javascript
GET http://localhost:3000/api/products
GET http://localhost:3000/api/products?page=1&limit=2
GET http://localhost:3000/api/products?page=2&limit=3

```

- POST new product
```javascript
POST http://localhost:3000/api/products

Request:
{
"title": "Bocadillo Lomo Queso - Rocafría",
"price": 4.20,
"description": "El mejor bocadillo del barrio",
"image": "https://babelcafeloungebar.com/wp-content/uploads/2021/02/bocadillo-lomo-queso-babel.jpg"
}

Response:
{
"message": "Producto Bocadillo Lomo Queso - Rocafría guardado en el sistema con ID: 632f9a5236a3262c5b1b417a"
}
```
## Configure MongoDB Atlas 

1. Register in [MongoDB ATLAS](https://www.mongodb.com/cloud)

2. Create a cluster: 

![img](./assets/create_cluster.png)

3. Click on "Browse Collections": 

![img](./assets/browse_collections.png)


5. Create a user in MongoDB Atlas for your app

6. Allow access to your cluster from any IP: 

- **Access List Entry:**: 0.0.0.0/0
- **Comment:** all

![img](./assets/network_access.png)

7. Let's connect to MongoDB Atlas:

Get your URL MongoDB atlas. Click on **Databases** -> **Connect**:

![img](./assets/connect.png)

Choose **"Connect your application"**: 

![img](./assets/connect_your_application.png)

Introduce your `username` y `password`: 

```

mongodb+srv://<username>:<password>@cluster0.t7z6t.mongodb.net/BD?retryWrites=true&w=majority

```

Now you are ready to use your app editing `.env` file with your MongoDB URL


![App](./assets/deploy_meme.jpeg)
