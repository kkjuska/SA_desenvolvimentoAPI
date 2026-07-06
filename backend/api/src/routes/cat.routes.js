import { Router } from "express";
import { catService } from "../services/cat.service.js"

export const CatRouter = Router()

CatRouter.get('/', async (req, res) => {
    const cat = await catService.getAll()
    res.send(cat)
});

CatRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const cat = await catService.getById(id)
    res.send(cat)
})

CatRouter.post('/', async (req, res) => {
    const { nome, id_item } = req.body
    const cat = await catService.post(nome, id_item)
    res.send(cat)
})

CatRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const { nome, id_item } = req.body
    const cat = await catService.put(nome, id_item, id)
    res.send(cat)
})

CatRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    const cat = await catService.delete(id)
    res.send(cat)
})