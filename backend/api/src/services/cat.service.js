import { pool } from "../config/db.js"

class CatService {
    async getAll() {
        try {
            const res = await pool.query('SELECT * FROM categorias')
            return res.rows
        } catch (error) {
            console.error(error);
        }
    }
    async getById(id) {
        try {
            const res = await pool.query('SELECT * FROM categorias WHERE id = $1', [id])
            return res.rows
        } catch (error) {
            console.error(error);
        }
    }
    async post(nome, id_item) {
        try {
            const res = await pool.query('INSERT INTO categorias (nome, id_item) values ($1, $2) RETURNING *', [nome, id_item])
            return res.rows
        } catch (error) {
            console.error(error);
        }
    } 
    async put(nome, id_item, id) {
        try {
            const res = await pool.query('UPDATE itens SET nome = $1, id_item = $2 WHERE id = $3 RETURNING *', [nome, id_item, id])
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

export const catService = new CatService()