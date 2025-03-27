CREATE DATABASE PRODUTOS;
USE PRODUTOS;
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    fornecedor VARCHAR(255),
    endereco_fornecedor VARCHAR(255),
    quantidade INT,
    endereco VARCHAR(255),
    preco_unitario FLOAT
);
SHOW TABLES;
INSERT INTO produtos (nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario)
VALUES 
('Cadeira Gamer', 'TechGames', 'Rua das Tecnologias, 123', 10, 'Avenida Central, 456', 899.90),
('Mouse Óptico', 'Eletrônica ABC', 'Rua da Eletrônica, 456', 25, 'Rua das Flores, 789', 49.99),
('Teclado Mecânico', 'CompuStore', 'Avenida do Computador, 321', 15, 'Avenida Paulista, 1000', 349.50),
('Monitor LED 27"', 'Monitores Ltda', 'Rua da Tela, 101', 8, 'Rua do Comércio, 450', 1299.99);
SELECT * FROM PRODUTOS;
SHOW DATABASES;

