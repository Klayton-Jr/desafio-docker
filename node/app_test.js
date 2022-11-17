const express = require('express');
const randomNames = require('node-random-name');
const mysql = require('mysql');


const app = express();
const PORT = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'change-me',
  database: 'nodedb',
};

app.get('/', (req, res) => {
  insertPeopleName(res);
});

app.listen(PORT, () => {
  console.log('Rodando na porta: ' + PORT);
});

function getPersonName() {
  return randomNames();
}

async function insertPeopleName(res) {
  const name = getPersonName();
  const connection = mysql.createConnection(config);
  const sql = `INSERT INTO people(name) values('${name}')`;
    
  connection.query(sql);
  console.log(`${name} inserido no banco!`);    
  getPeople(res, connection);
}

function getPeople(res, connection) {    
  const sql = `SELECT id, name FROM people`;  
  
  connection.query(sql, (error, results, fields) => {
    if (error) {
      throw error
    };
    
    let table = '<table>';
    table += '<tr><th>#</th><th>Name</th></tr>';
    for(let people of results) {      
      table += `<tr><td>${people.id}</td><td>${people.name}</td></tr>`;
    }

    table += '</table>';    
    res.send('<h1>Full Cycle Rocks!</h1>' + table);    
  });   
  connection.end();
}