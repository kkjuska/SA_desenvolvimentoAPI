import { pool } from "../config/db.js"

class ItemService {
    async getAll() {
        try {
            const res = await pool.query('SELECT * FROM itens')
            return res.rows
        } catch (error) {
            console.error(error);
        }
    }
    async getById(id) {
        try {
            const res = await pool.query('SELECT * FROM itens WHERE id = $1', [id])
            return res.rows
        } catch (error) {
            console.error(error);
        }
    }
    async post(nome, quantidade) {
        try {
            const res = await pool.query('INSERT INTO itens (nome, quantidade) values ($1, $2) RETURNING *', [nome, quantidade])
            return res.rows
        } catch (error) {
            console.error(error);
        }
    } 
    async put(nome, quantidade, id) {
        try {
            const res = await pool.query('UPDATE itens SET nome = $1, quantidade = $2 WHERE id = $3 RETURNING *', [nome, quantidade, id])
            return res.rows
            } catch (error) {
                console.error(error)
            } 
    }
    async delete(id) {
        try {
            const res = await pool.query('DELETE FROM itens WHERE id = $1 RETURNING *', [id])
            return res.rows
        } catch (error) {
            console.error(error)
        }
    }
}

export const itemService = new ItemService()