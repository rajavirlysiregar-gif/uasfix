const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Review = sequelize.define('Review', {
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
    orderId: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    rating: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      validate: { min: 1, max: 5 } 
    },
    comment: { 
      type: DataTypes.TEXT, 
      defaultValue: '' 
    }
  }, {
    tableName: 'Reviews'
  });

  return Review;
};