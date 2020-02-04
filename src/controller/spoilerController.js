const Spoiler = require('../model/spoiler');
const status = require("http-status");

exports.buscarPorId = (req, res, next) => {
    const id = req.params.id;

    Spoiler.findById(id)
        .then(spoiler => {
            if(spoiler) {
                res.status(status.OK).send(spoiler);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        }).catch(error => next(error));
};

exports.listaPaginada = (req, res, next) => {
    let limite = parseInt(req.query.limite || 0);
    let pagina = parseInt(req.query.pagina || 0);

    if(!Number.isInteger(limite) || !Number.isInteger(pagina)) {
        res.status(status.BAD_REQUEST).send(); // 400 - bad-request
    }

    const ITENS_POR_PAGINA = 10;

    limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    pagina = pagina <= 0 ? 0 : pagina * limite;

    Spoiler.findAll({ limit: limite, offset: pagina})
        .then(spoilers => {
            res.send(spoilers);
        }).catch(error => next(error));
};

exports.inserir = (req, res, next) => {
    // pega os atributos disparados no corpo da requisição
    const titulo = req.body.titulo;
    const espoliador = req.body.espoliador;
    const descricao = req.body.descricao;

    Spoiler.create({
        titulo: titulo,
        espoliador: espoliador,
        descricao: descricao
    }).then(() => {
        res.status(status.CREATED).send();
    }).catch((error) => next(error));
};

exports.atualizar = (req, res, next) => {
    // pega o id
    const id = req.params.id;

    // pega os dados no corpo da requisição
    const titulo = req.body.titulo;
    const espoliador = req.body.espoliador;
    const descricao = req.body.descricao;

    Spoiler.findById(id) // busca aquele id recebido
        .then(spoiler => {
            if(spoiler) {
                Spoiler.update({ // lança os novos dados
                    titulo: titulo,
                    espoliador: espoliador,
                    descricao: descricao
                },
                {
                    where: {id: id} // referente àquele id
                }).then(() => {
                    res.send(); // aqui já passa status 200 porque ele é padrão
                }).catch((error) => next(error));
            } else {
                res.status(status.NOT_FOUND).send(); // se não encontrar, lança o erro 404
            }
        }).catch(error => next(error));
};

exports.excluir = (request, response, next) => {
    const id = request.params.id;

    Spoiler.findById(id)
        .then(spoiler => {
            if(spoiler) {
                Spoiler.destroy({
                    where: {id: id}
                }).then(() => {
                    response.status(status.OK).send(); // conforme acima, não é necessário
                }).catch((error) => next(error));
            } else {
                response.status(status.NOT_FOUND).send();
            }
    }).catch(error => next(error));
};

// não tem o module.exports porque os métodos já estão sendo exportados quando chamados