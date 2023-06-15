var express = require('express');
var router = express.Router();

// Listar interessados
router.get('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM interessado", function (err, rows) {
            if (!err && rows.length > 0) {
                res.status(200).json(rows);
            } else {
                res.status(500).json([]);
            }
        });
    });
});

// Buscar interessado pelo id
router.get('/:id', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var id = req.params.id;
        connection.query("SELECT * FROM interessado WHERE id='"
            + id + "' LIMIT 1", function (err, rows) {
                if (!err && rows.length > 0) {
                    res.json(rows);
                } else {
                    res.json([]);
                }
            });
    });
});

// Cadastrar interessados
router.post('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var dados = req.body;
        var nome = dados.nome;
        var cpf = dados.cpf;
        var dataNascimento = dados.dataNascimento;
        var email = dados.email;
        var rg = dados.rg;
        var interesse = dados.interesse;

        connection.query(
            "INSERT INTO `interessado` (`nome`, `cpf`, `dataNascimento`, `email`, `rg`, `interesse`) VALUES ('"
            + nome + "','"
            + cpf + "','"
            + dataNascimento + "','"
            + email + "','"
            + rg + "','"
            + interesse +
            "')", function (err, rows) {

                if (rows.affectedRows) {
                    connection.query("SELECT * FROM interessado WHERE id='" + rows.insertId
                        + "' LIMIT 1", function (err, rows) {
                            if (!err && rows.length > 0) {
                                res.json(rows);
                            } else {
                                res.json([]);
                            }
                        });
                }
            });
    });
});

// Excluir interessado
router.delete('/:id', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var id = req.params.id;
        connection.query("DELETE FROM interessado WHERE id='" + id +
            "'", function (err, rows) {
                if (!err) {
                    res.json({
                        "excluido": true
                    });
                } else {
                    res.json({
                        "excluido": false
                    });
                }
            });
    });
});

// Modificar interessado
router.put('/:id', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var id = req.params.id;
        var dados = req.body;
        var nome = dados.nome;
        var cpf = dados.cpf;
        var dataNascimento = dados.dataNascimento;
        var email = dados.email;
        var rg = dados.rg;
        var interesse = dados.interesse;

        connection.query(
            "UPDATE interessado SET nome='" + nome +
            "', cpf='" + cpf +
            "', dataNascimento='" + dataNascimento +
            "', email='" + email +
            "', rg='" + rg +
            "', interesse='" + interesse +
            "'WHERE id='" + id +
            "'", function (err, rows) {

                if (rows.affectedRows) {
                    connection.query("SELECT * FROM interessado WHERE id='" + id
                        + "' LIMIT 1", function (err, rows) {
                            if (!err && rows.length > 0) {
                                res.json({
                                    "Excluído": true
                                });
                            } else {
                                res.json({
                                    "Excluído": false
                                });
                            }
                        });
                }
            });
    });
});

module.exports = router;