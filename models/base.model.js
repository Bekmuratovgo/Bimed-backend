/********************************

  ### The base model
  - contains basic/isolated methods that handle Database CRUD operations.
  - This module is root/gateway for all Database operations.
  - If customization is needed then it should NOT be performed here. Instead it should be implemented in the context where it is needed.
  - All methods here should be standard and accessible to all the inheriting classes.
  - The naming convention used here is to be somehow close to that of mongoose to avoid confusion.



  ### List of methods (total count: 10):
  - create

  - findById
  - findOne       -> (filter)
  - findMany      -> (filter)
  - findAll

  - updateById
  - updateOne     -> (filter)
  - updateMany    -> (filter)

  - deleteOne     -> (filter)
  - deleteMany    -> (filter)

********************************/

const bcrypt = require("bcryptjs");

const { errorHandler } = require("../lib");

class Base {
  //
  // /////// ////// / / //
  // /////// ////// / / //
  static async create({ item, collection }) {
    try {
      const createdItem = await new collection(item);
      if (item.password) {
        const salt = await bcrypt.genSalt(10);
        createdItem.password = await bcrypt.hash(item.password, salt);
      }
      await createdItem.save();
      return createdItem;
    } catch (error) {
      throw new errorHandler(500, `Error => create new...  ${error.message}`);
    }
  }

  // /////// ////// / / //
  // /////// ////// / / //
  static async findById({ id, collection }) {
    try {
      return await collection.findById(id);
    } catch (error) {
      throw new errorHandler(500, error.message); // a test
    }
  }

  // /////// ////// / / //
  // /////// ////// / / //
  static async findOne({ filter, collection }) {
    try {
      return await collection.findOne(filter);
    } catch (error) {
      throw new errorHandler(
        500,
        `Error => find one... \nfilter = ${filter}   ...   ${error.message}`
      );
    }
  }

  // /////// ////// / / //
  // /////// ////// / / //
  static async findMany({
    filter = {},
    restricted = {},
    options = {},
    collection
  }) {
    try {
      // filter => should be an array
      return await collection.find(filter, restricted, options);
    } catch (error) {
      throw new errorHandler(500, `Error => find Many... ${error.message}`);
    }
  }

  // /////// ////// / / //
  // /////// ////// / / //
  static async findAll({ collection }) {
    try {
      return await collection.find();
    } catch (error) {
      throw new errorHandler(500, `Error => find all... ${error.message}`);
    }
  }

  // /////// ////// / / //
  // /////// ////// / / //
  static async updateById({ id, data, collection }) {
    try {
      if (data.password) {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
      }

      const item = await collection.findOneAndUpdate({ _id: id }, data, {
        new: true
      });

      return item;
    } catch (error) {
      throw new errorHandler(
        500,
        `Error => update by id... id = ${id}  ...  ${error.message}`
      );
    }
  }

  // /////// ////// / / //
  // /////// ////// / / //
  static async updateOne({ filter, data, collection }) {
    try {
      const item = await collection.findOneAndUpdate(filter, data);
      await item.save();
      return item;
    } catch (error) {
      throw new errorHandler(
        500,
        `Error => update one... filter = ${filter}  ...  ${error.message}`
      );
    }
  }

  // /////// ////// / / //
  // /////// ////// / / //
  static async updateMany({ filter, data, collection }) {
    try {
      const items = await collection.updateMany(filter, data, { new: true });
      items.length > 0 &&
        Promise.all(
          items.map(async item => {
            return await item.save();
          })
        ).then(() => {
          return items;
        });
    } catch (error) {
      throw new errorHandler(
        500,
        `Error => update many... filter = ${filter}  ...  ${error.message}`
      );
    }
  }

  // /////// ////// / / //
  // /////// ////// / / //
  static async deleteOne({ filter, collection }) {
    try {
      const item = await collection.findOne(filter);
      await item.remove();
      return item;
    } catch (error) {
      throw new errorHandler(
        500,
        `Error => delete one... filter = ${filter}   ...  ${error.message}`
      );
    }
  }

  // /////// ////// / / //
  // /////// ////// / / //
  static async deleteMany({ filter = {}, options = {}, collection }) {
    try {
      return await collection.deleteMany(filter, options);
    } catch (error) {
      throw new errorHandler(
        500,
        `Error => delete many... filter = ${filter}  ...  ${error.message}`
      );
    }
  }
}

module.exports = Base;
