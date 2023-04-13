import { author } from "../models/author.js"

const createAuthor = async (req, res) => {
    const {name} = req.body
    try {
        await author.create({
            author_name: name
        })
        res.status(200).json('Succesfully created')
    } catch (error) {
        console.error(error)
    }
}

const getAuthors = async (req, res) => {
    try {
        const allAuthors = await author.findAll()
        res.status(201).send(allAuthors)
    } catch (error) {
        console.error(error)
    }
}

const deleteAuthor = async (req, res) => {
    const {id} = req.params
    try {
        await author.destroy({where: {
            author_id: id
        }})
        res.status(200).send('Author was succesfully deleted')
    } catch (error) {
        console.error(error)
    }
}

export {
    createAuthor,
    getAuthors,
    deleteAuthor
}
