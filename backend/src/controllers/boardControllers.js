const prisma = require('../../prisma/dev.db');

exports.getAllBoards = async (req, res) => {
    const boards = await prisma.board.findMany({
        include: {
            cards: true,
        }
    }); // prisma get all boards from db
}

exports.getBoardById = async (req, res) => {
    const id = Number(req.params.id);
    const board = await prisma.board.findUnique({
        where: {id},
        include: {cards: true}
    });
    if(!board) return res.status(404).json({error: 'Board not found!'});
    res.json(board);
}

exports.createBoard = async (req, res) => {
    const { title, description, category, image, author, cards } = req.body
}

exports.addNewCard = async (req, res) => {

}

exports.deleteBoard = async (req, res) => {

}