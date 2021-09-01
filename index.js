const express = require('express');
const pg = require('pg');

//instancia o express
const app = express();
const localhost = '127.0.0.1';
const port = 3000;

//const conString = `postgres://postgres:171011@127.0.0.1/sistema_noticia`

const config = {
    host: 'localhost',
    user: 'postgres',
    database: 'sistema_noticias',
    password: '171011',
    port: 5432
};

const client = new pg.Client(config);
client.connect();

app.get('/', (req, res, next) => {
    
});

//serviço de busca de categorias
app.get('/news-api/v1/categorias', (request, response) => {

    client.query(`SELECT id, nome FROM categoria`, (err, res) => {
        if(!err){
            console.log(res.rows);
            response.send(res.rows);
        }else{console.log('erro')}
    });
});

app.get('/news-api/v1/categorias/:categoriaId/noticias', (req, response) => {
    //res.send(req.params.categoriaId);
    client.query(`SELECT id, titulo FROM noticia WHERE id_categoria = ${req.params.categoriaId}`, (err, res) => {
        if(!err){
            console.log(res.rows);
            response.send(res.rows);
        }
    });
});

app.get('/news-api/v1/categorias/:categoriaId/noticias/:noticiaId', (req, response) => {
    //res.send(req.params.categoriaId);
    client.query(`SELECT id, titulo, conteudo FROM noticia WHERE id_categoria = 
    ${req.params.categoriaId} AND id = ${req.params.noticiaId}`, (err, res) => {
        if(!err){
            console.log(res.rows);
            response.send(res.rows[0]);
        }
    });
});

app.listen(port, () => {
    console.log(`server listening at http://${localhost}:${port}`);
});