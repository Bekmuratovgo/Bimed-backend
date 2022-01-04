/********************************
  CallOrder Model
********************************/

const { errorHandler } = require("../lib");

const { CallOrderCollection } = require("../collections");
const BaseModel = require("./base.model");

const collection = CallOrderCollection;

class CallOrder extends BaseModel {
  constructor() {}

  /********************************
    create callOrder
  ********************************/

  static async create(callOrderData) {
    try {
      const callOrder = await super.create({
        item: {
          ...callOrderData
        },
        collection
      });

      return callOrder;
    } catch (error) {
      throw new errorHandler(error.statusCode, error.message);
    }
  }

  /********************************
    get callOrder by id
  ********************************/

  static async getById(id) {
    try {
      return await super.findById({ id, collection });
    } catch (error) {
      throw new errorHandler(error.statusCode, error.message);
    }
  }

  /********************************
    get matching callOrders
  ********************************/

  static async get(query) {
    try {
      const {
        limit = undefined,
        skip = undefined,

        name = undefined,
        phone = undefined,
        email = undefined,
        title = undefined,
        body = undefined,

        sortBy = undefined
      } = query;

      // / /  / / / //  / /////
      const sort = {};
      if (sortBy) {
        const parts = sortBy.split(":");
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
      }
      // / /  / / / //  / /////
      const filter = {};
      const filterOptions = ["name", "phone", "email", "title", "body"];
      filterOptions.forEach(filterOption => {
        if (query[filterOption]) filter[filterOption] = query[filterOption];
      });
      // / /  / / / //  / /////
      const restricted = "";
      // / /  / / / //  / /////
      const options = {
        limit: limit && parseInt(limit),
        skip: limit && parseInt(skip),
        sort
      };
      // / /  / / / //  / /////
      const callOrders = await super.findMany({
        filter,
        restricted,
        options,
        collection
      });
      if (!callOrders) {
        throw new errorHandler(500, "FETCH selected callOrders => Failed");
      } else if (!(callOrders.length > 0)) {
        return [];
      }
      return callOrders;
    } catch (error) {
      throw new errorHandler(error.statusCode, error.message);
    }
  }

  /********************************
    update callOrder by id
  ********************************/

  static async updateById(req) {
    try {
      const {
        params: { id }
      } = req;

      // update callOrder
      const callOrder = await super.updateById({
        id,
        data: { ...req.body },
        collection
      });
      if (!callOrder)
        throw new errorHandler(
          500,
          `UPDATE callOrder with the id: ${id} => Failed`
        );

      return callOrder;
    } catch (error) {
      throw new errorHandler(error.statusCode, error.message);
    }
  }

  /********************************
    delete callOrder by id
  ********************************/

  static async deleteById(id) {
    try {
      return await super.deleteOne({
        filter: { _id: id },
        collection
      });
    } catch (e) {
      throw new errorHandler(error.statusCode, error.message);
    }
  }

  /********************************
    delete maching callOrders
  ********************************/

  static async delete(query) {
    try {
      const {
        limit = undefined,
        skip = undefined,

        name = undefined,
        phone = undefined,
        email = undefined,
        title = undefined,
        body = undefined,

        sortBy = undefined
      } = query;

      // / /  / / / //  / /////
      const sort = {};
      if (sortBy) {
        const parts = sortBy.split(":");
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
      }
      // / /  / / / //  / /////
      const filter = {};
      const filterOptions = ["name", "phone", "email", "title", "body"];
      filterOptions.forEach(filterOption => {
        if (query[filterOption]) filter[filterOption] = query[filterOption];
      });
      // / /  / / / //  / /////
      const options = {
        limit: limit && parseInt(limit),
        skip: limit && parseInt(skip),
        sort
      };
      // / /  / / / //  / /////
      const callOrders = await super.deleteMany({
        filter,
        options,
        collection
      });
      if (!callOrders) {
        throw new errorHandler(500, "DELETE selected callOrders => Failed");
      } else if (!(callOrders.length > 0)) {
        throw new errorHandler(404, "No callOrders to delete");
      }
      return callOrders;
    } catch (error) {
      throw new errorHandler(error.statusCode, error.message);
    }
  }
}

module.exports = CallOrder;
