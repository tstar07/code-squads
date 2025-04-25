'use strict';

import { DataTypes, QueryInterface } from "sequelize";
//sequelize query
module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.addColumn('hotels', 'deleted_at', {
      type: DataTypes.DATE,
      allowNull:true,
      defaultValue:null,
      });
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.removeColumn('hotels', 'deleted_at');
  }
};
