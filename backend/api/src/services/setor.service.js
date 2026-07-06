import { pool } from "../config/db.js"

class SetorService {
    async getAll() {
        try {
            const res = await pool.query('SELECT * FROM setor')
            return res.rows
        } catch (error) {
            console.error(error);
        }
    }
    async getById(id) {
        try {
            const res = await pool.query('SELECT * FROM setor WHERE id = $1', [id])
            return res.rows
        } catch (error) {
            console.error(error);
        }
    }
    async post(nome, qt_pessoas, id_usuario) {
        try {
            const res = await pool.query('INSERT INTO setor (nome, qt_pessoas, id_usuario) values ($1, $2, $3) RETURNING *', [nome, qt_pessoas, id_usuario])
            return res.rows
        } catch (error) {
            console.error(error);
        }
    } 
    async put(nome, qt_pessoas, id_usuario, id) {
        try {
            const res = await pool.query('UPDATE setor SET nome = $1, qt_pessoas = $2, id_usuario = $3 WHERE id = $4 RETURNING *', [nome, qt_pessoas, id_usuario, id])
            return res.rows
            } catch (error) {
                console.error(error)
            } 
    }
    async delete(id) {
        try {
            const res = await pool.query('DELETE FROM setor WHERE id = $1 RETURNING *', [id])
            return res.rows
        } catch (error) {
            console.error(error)
        }
    }
}

export const setorService = new SetorService()