import { Router } from "express";
import { setorService } from "../services/setor.service.js"

export const SetorRouter = Router()

SetorRouter.get('/', async (req, res) => {
    const setor = await setorService.getAll()
    res.send(setor)
});

SetorRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const setor = await setorService.getById(id)
    res.send(setor)
})

SetorRouter.post('/', async (req, res) => {
    const { nome, qt_pessoas, id_usuario } = req.body
    const setor = await setorService.post(nome, qt_pessoas, id_usuario)
    res.send(setor)
})

SetorRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const { nome, qt_pessoas, id_usuario } = req.body
    const setor = await setorService.put(nome, qt_pessoas, id_usuario, id)
    res.send(setor)
})

SetorRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    const setor = await setorService.delete(id)
    res.send(setor)
})