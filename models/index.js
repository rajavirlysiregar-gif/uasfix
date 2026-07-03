require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const basename = path.basename(__filename);

console.log(`🔌 Mencoba menghubungkan database ke host: ${process.env.DB_HOST || '127.0.0.1'} pada port: ${process.env.DB_PORT || 3306}`);

// 1. Inisialisasi instansi Sequelize secara dinamis dari Environment Variables
const sequelize = new Sequelize(
  process.env.DB_NAME || 'nama_db_lokal_anda',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // ubah ke console.log jika ingin melihat log query SQL di Railway
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
    }
  }
);

const db = {};

// 2. Membaca dan mendaftarkan seluruh file model di dalam folder ini otomatis
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

// 3. Menjalankan fungsi asosiasi (relasi antar tabel) jika didefinisikan di dalam model
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 4. Ekspor instansi utama beserta objek semua model tabel
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;