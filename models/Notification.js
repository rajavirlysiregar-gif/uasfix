const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Notification = sequelize.define('Notification', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    userId: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    title: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    content: { 
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    isRead: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false 
    }
  }, {
    tableName: 'Notifications'
  });

  return Notification;
};