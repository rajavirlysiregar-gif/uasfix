const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    buyerId: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    totalAmount: { 
      type: DataTypes.DECIMAL(12, 2), 
      allowNull: false, 
      validate: { min: 0 } 
    },
    status: { 
      type: DataTypes.ENUM('pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled'), 
      defaultValue: 'pending' 
    },
    shippingAddress: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    paymentMethod: { 
      type: DataTypes.STRING, 
      defaultValue: 'manual_transfer' 
    }
  }, {
    tableName: 'Orders'
  });

  return Order;
};