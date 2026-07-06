import { pool } from "../config/db.js"

class UserService {
    async getAll() {
        try {
            const res = await pool.query('SELECT * FROM usuario')
            return res.rows
        } catch (error) {
            console.error(error);
        }
    }
    async getById(id) {
        try {
            const res = await pool.query('SELECT * FROM usuario WHERE id = $1', [id])
            return res.rows
        } catch (error) {
            console.error(error);
        }
    }
    async post(email, senha, id_item) {
        try {
            const res = await pool.query('INSERT INTO usuario (email, senha, id_item) values ($1, $2, $3) RETURNING *', [email, senha, id_item])
            return res.rows
        } catch (error) {
            console.error(error);
        }
    } 
    async put(email, senha, id_item, id) {
        try {
            const res = await pool.query('UPDATE usuario SET nome = $1, quantidade = $2, id_item = $3 WHERE id = $4 RETURNING *', [email, senha, id_item, id])
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

export const userService = new UserService()