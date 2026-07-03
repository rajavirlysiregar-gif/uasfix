const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cart = sequelize.define('Cart', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    buyerId: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    productId: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    quantity: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      defaultValue: 1,
      validate: { min: 1 } 
    }
  }, {
    tableName: 'Carts'
  });

  return Cart;
};