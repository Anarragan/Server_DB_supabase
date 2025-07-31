import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: "aws-0-us-east-2.pooler.supabase.com",
  user: 'postgres.kaywywqbyyjbshkkzjmq',
  password: '1006457424Aa!',
  database: 'postgres'
});

pool.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos con éxito!');
});

export default pool;
