const express = require('express');
const app = express();
const pool = require('./config');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const BAD_GATEWAY = 502;

app.get('/produtos', async (req, res) => {
    try {
        const [produtos] = await pool.execute('SELECT * FROM produtos');
        res.status(OK).json(produtos);
    } 
    catch (error) {
        console.error(error);
        if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
            return res.status(BAD_GATEWAY).json({ message: 'Erro externo: Problema ao se comunicar com o servidor externo' });
        }
        res.status(INTERNAL_SERVER_ERROR).json({ message: 'Erro interno do servidor' });
    }
});

app.post('/produtos', async (req, res) => {
    const { nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario } = req.body;

    if (!nome || !fornecedor || !endereco_fornecedor || !quantidade || !endereco || !preco_unitario) {
        return res.status(BAD_REQUEST).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const [result] = await pool.execute(
            'INSERT INTO produtos (nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario) VALUES (?, ?, ?, ?, ?, ?)',
            [nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario]
        );
        res.status(CREATED).json({ id: result.insertId, ...req.body });
    } 
    catch (error) {
        console.error(error);
        if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
            return res.status(BAD_GATEWAY).json({ message: 'Erro externo: Problema ao se comunicar com o servidor externo' });
        }
        res.status(INTERNAL_SERVER_ERROR).json({ message: 'Erro interno do servidor' });
    }
});

app.put('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario } = req.body;

    if (!nome || !fornecedor || !endereco_fornecedor || !quantidade || !endereco || !preco_unitario) {
        return res.status(BAD_REQUEST).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const [result] = await pool.execute(
            'UPDATE produtos SET nome = ?, fornecedor = ?, endereco_fornecedor = ?, quantidade = ?, endereco = ?, preco_unitario = ? WHERE id = ?',
            [nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario, id]
        );
        
        if (result.affectedRows == 0) {
            return res.status(BAD_REQUEST).json({ message: 'Produto não encontrado' });
        }

        res.status(OK).json({ id, ...req.body });
    } 
    catch (error) {
        console.error(error);
        if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
            return res.status(BAD_GATEWAY).json({ message: 'Erro externo: Problema ao se comunicar com o servidor externo' });
        }
        res.status(INTERNAL_SERVER_ERROR).json({ message: 'Erro interno do servidor' });
    }
});

app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.execute('DELETE FROM produtos WHERE id = ?', [id]);
        
        if (result.affectedRows == 0) {
            return res.status(NOT_FOUND).json({ message: 'Produto não encontrado' });
        }

        res.status(OK).json({ message: 'Produto removido com sucesso' });
    } 
    catch (error) {
        console.error(error);
        if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
            return res.status(BAD_GATEWAY).json({ message: 'Erro externo: Problema ao se comunicar com o servidor externo' });
        }
        res.status(INTERNAL_SERVER_ERROR).json({ message: 'Erro interno do servidor' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
