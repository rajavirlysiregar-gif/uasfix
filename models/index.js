const { Sequelize } = require('sequelize');

// 1. Buat instansi koneksi Sequelize terlebih dahulu menggunakan ENV Railway
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false // Ubah jadi console.log jika ingin melihat query SQL di log Railway
  }
);

// 2. Import model SETELAH instansi sequelize terbuat, dan passing instansinya jika model berupa fungsi
// Catatan: Jika model Anda di dalam file (seperti User.js) tipenya BUKAN fungsi, ubah kodenya menjadi: require('./User')
const User = typeof require('./User') === 'function' ? require('./User')(sequelize) : require('./User');
const Category = typeof require('./Category') === 'function' ? require('./Category')(sequelize) : require('./Category');
const Product = typeof require('./Product') === 'function' ? require('./Product')(sequelize) : require('./Product');
const Cart = typeof require('./Cart') === 'function' ? require('./Cart')(sequelize) : require('./Cart');
const Order = typeof require('./Order') === 'function' ? require('./Order')(sequelize) : require('./Order');
const OrderItem = typeof require('./OrderItem') === 'function' ? require('./OrderItem')(sequelize) : require('./OrderItem');
const Review = typeof require('./Review') === 'function' ? require('./Review')(sequelize) : require('./Review');
const Wishlist = typeof require('./Wishlist') === 'function' ? require('./Wishlist')(sequelize) : require('./Wishlist');
const Message = typeof require('./Message') === 'function' ? require('./Message')(sequelize) : require('./Message');
const Notification = typeof require('./Notification') === 'function' ? require('./Notification')(sequelize) : require('./Notification');

// =====================
// Associations (Hubungan Antar Tabel)
// =====================

// Product belongs to Category & Seller (User)
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

User.hasMany(Product, { foreignKey: 'sellerId', as: 'products' });
Product.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

// Cart belongs to Buyer (User) & Product
User.hasMany(Cart, { foreignKey: 'buyerId', as: 'cartItems' });
Cart.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer' });

Product.hasMany(Cart, { foreignKey: 'productId', as: 'cartEntries' });
Cart.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Order belongs to Buyer (User), has many OrderItems
User.hasMany(Order, { foreignKey: 'buyerId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer' });

Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

User.hasMany(OrderItem, { foreignKey: 'sellerId', as: 'soldItems' });
OrderItem.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

// Review belongs to Buyer (User), Product & Order
User.hasMany(Review, { foreignKey: 'buyerId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer' });

Product.hasMany(Review, { foreignKey: 'productId', as: 'reviews' });
Review.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

Order.hasMany(Review, { foreignKey: 'orderId', as: 'reviews' });
Review.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// Wishlist belongs to Buyer (User) & Product
User.hasMany(Wishlist, { foreignKey: 'buyerId', as: 'wishlist' });
Wishlist.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer' });

Product.hasMany(Wishlist, { foreignKey: 'productId', as: 'wishlistedBy' });
Wishlist.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Message belongs to Sender & Receiver (User)
User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });

User.hasMany(Message, { foreignKey: 'receiverId', as: 'receivedMessages' });
Message.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });

// Notification belongs to User
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// 3. Export objek database tunggal agar bisa dipakai di server.js atau controller Anda
module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Cart,
  Order,
  OrderItem,
  Review,
  Wishlist,
  Message,
  Notification
};