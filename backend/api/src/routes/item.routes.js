import { Router } from "express";
import { itemService } from "../services/item.service.js"

export const ItemRouter = Router()

ItemRouter.get('/', async (req, res) => {
    const item = await itemService.getAll()
    res.send(item)
});

ItemRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const item = await itemService.getById(id)
    res.send(item)
})

ItemRouter.post('/', async (req, res) => {
    const { nome, quantidade } = req.body
    const item = await itemService.post(nome, quantidade)
    res.send(item)
})

ItemRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const { nome, quantidade } = req.body
    const item = await itemService.put(nome, quantidade, id)
    res.send(item)
})

ItemRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    const item = await itemService.delete(id)
    res.send(item)
})