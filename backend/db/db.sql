CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255),
    telefone VARCHAR(15),
    coordenada_x INTEGER,
    coordenada_y INTEGER
);
