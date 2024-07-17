const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // añadido
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

//Importar middlewares
const error404 = require("./middlewares/error404");
const morgan = require("./middlewares/morgan");

// Logger de Morgan
app.use(morgan(':method :url :status - :response-time ms :body'));

//importar rutas
const productsRoutes = require('./routes/products.routes');
const providerRoutes = require('./routes/provider.routes')

app.use(express.json()); // Para habilitar recepción de datos JSON en una request

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, 'client/build')));; // Habilito la carpeta public para archivos estáticos

//Rutas API
app.use('/api/products', productsRoutes);
app.use('/api/providers', providerRoutes);

//http://localhost:3000/api-docs/
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//http://localhost:3000/api-jsdoc/
//app.use('/api-jsdoc', express.static(path.join(__dirname, '/jsondocs')));

// Handles any requests that don't match the ones above
/* app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
}); */

//Invocar middleware
app.use(error404); //Middleware para manejo de 404
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = server;