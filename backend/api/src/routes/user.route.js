import { Router } from "express";
import { userService } from "../services/user.service.js"

export const UserRouter = Router()

UserRouter.get('/', async (req, res) => {
    const user = await userService.getAll()
    res.send(user)
});

UserRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const user = await userService.getById(id)
    res.send(user)
})

UserRouter.post('/', async (req, res) => {
    const { email, senha, id_item } = req.body
    const user = await userService.post(email, senha, id_item)
    res.send(user)
})

UserRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const { email, senha, id_item } = req.body
    const user = await userService.put(email, senha, id_item, id)
    res.send(user)
})

UserRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    const user = await userService.delete(id)
    res.send(user)
})