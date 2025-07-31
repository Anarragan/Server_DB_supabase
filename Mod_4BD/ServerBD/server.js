import express from 'express'; //permite levantar API rest
import cors from 'cors';
import pool from './dataBase_conection.js';

const app = express(); // crea una instancia de express
const PORT = 6543;

app.use(express.json());
app.use(cors());

//Get method
app.get('/empleados', (req, res) => {
 pool.query('SELECT * FROM empleados', (err, results) => {
        if (err) {
        console.error('Error al obtener los empleados:', err);
        return res.status(500).json({ error: 'Error al obtener los empleados' });
        }
        res.json(results);
    });
});

//Post method
app.post('/empleados', (req, res) => {
    const { nombre, apellido, departamento, edad, salario, fecha_ingreso} = req.body;
    pool.query(
        `INSERT INTO empleados (nombre, apellido, departamento, edad, salario, fecha_ingreso) 
        VALUES ($1, $2, $3, $4, $5, $6)`,

        [nombre, apellido, departamento, edad, salario, fecha_ingreso],

        (err, results) => {
            if (err) {
                console.error('Error al agregar el empleado:', err);
                return res.status(500).json({ error: 'Error al agregar el empleado' });
            }
            res.status(201).json({ message: 'Empleado agregado con éxito', id: results.insertId });
        }
    );
});

//Put method
app.put('/empleados/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, departamento, edad, salario, fecha_ingreso } = req.body;

    pool.query(
        `UPDATE empleados 
        SET nombre = $1, apellido = $2, departamento = $3, edad = $4, salario = $5, fecha_ingreso = $6 
        WHERE id = $7`,

        [nombre, apellido, departamento, edad, salario, fecha_ingreso, id],

        (err) => {
            if (err) {
                console.error('Error al actualizar el empleado:', err);
                return res.status(500).json({ error: 'Error al actualizar el empleado' });
            }
            res.json({ message: 'Empleado actualizado con éxito' });
        }
    );
});

//Delete method
app.delete('/empleados/:id', (req, res) => {
    const { id } = req.params;

    pool.query('DELETE FROM empleados WHERE id = $1', [id], (err) => {
        if (err) {
            console.error('Error al eliminar el empleado:', err);
            return res.status(500).json({ error: 'Error al eliminar el empleado' });
        }
        res.json({ message: 'Empleado eliminado con éxito' });
    });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
