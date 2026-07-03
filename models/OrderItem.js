const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const OrderItem = sequelize.define('OrderItem', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    orderId: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    productId: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    sellerId: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    quantity: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      defaultValue: 1,
      validate: { min: 1 } 
    },
    price: { 
      type: DataTypes.DECIMAL(12, 2), 
      allowNull: false, 
      validate: { min: 0 } 
    }
  }, {
    tableName: 'OrderItems'
  });

  return OrderItem;
};