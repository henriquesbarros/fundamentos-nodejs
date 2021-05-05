const express = require('express');
const { v4: uuidv4 } = require('uuid')

const app = express();

app.use(express.json())

const customers = [];

/*
    cpf - string
    name - string
    id - uuid
    statement - []
*/

app.post('/account', (request, response) => {
    const { cpf, name } = request.body;

    /*
        O método some() testa se ao menos um dos elementos no 
        array passa no teste implementado pela função atribuída 
        e retorna um valor true ou false.
    */

    const customerAlreadyExists = customers.some(customer => customer.cpf === cpf)

    if (customerAlreadyExists) {
        return response.status(400).json({ error: "Customer already exists!" })
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });

    return response.status(201).send();
});

app.get('/statement', (request, response) => {
    const { cpf } = request.headers;

    /*
        O método find() retorna o valor do primeiro elemento do array
        que satisfazer a função de teste provida. Caso contrário, 
        undefined é retornado.
    */ 
    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return response.status(400).json({ error: "Customer not found!" })
    }

    return response.json(customer.statement);
});

app.listen(3333);