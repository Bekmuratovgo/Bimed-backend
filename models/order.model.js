/********************************
  Order Model
********************************/

const { errorHandler } = require("../lib");

const { OrderCollection } = require("../collections");
const BaseModel = require("./base.model");

const collection = OrderCollection;

class Order extends BaseModel {
  constructor() {}

  /********************************
    create order
  ********************************/

  static async create(orderData) {
    const order = await super.create({
      item: {
        ...orderData
      },
      collection
    });

    return order;
  }

  /********************************
    get order by id
  ********************************/

  static async getById(id) {
    try {
      return await super.findById({ id, collection });
    } catch (e) {
      throw new errorHandler(404, `a order with the id: ${id} is NOT found`);
    }
  }

  /********************************
    get matching orders
  ********************************/

  static async get(req) {
    const {
      limit = undefined,
      skip = undefined,

      name = undefined,
      buyer = undefined,
      price = undefined,
      description = undefined,

      sortBy = undefined
    } = req.query;

    /********************************
      // TODO:

      - add restriction to viewing orders history except for their signed respective users
    ********************************/

    // / /  / / / //  / /////
    const sort = {};
    if (sortBy) {
      const parts = sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    // / /  / / / //  / /////
    const filter = {};
    const filterOptions = ["name", "buyer", "price", "description"];
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
    const orders = await super.findMany({
      filter,
      restricted,
      options,
      collection
    });
    if (!orders) {
      throw new errorHandler(500, "FETCH selected orders => Failed");
    } else if (!(orders.length > 0)) {
      return [];
    }
    return orders;
  }

  /********************************
    update order by id
  ********************************/

  static async updateById(req) {
    const {
      params: { id }
    } = req;

    // update order
    const order = await super.updateById({
      id,
      data: { ...req.body },
      collection
    });
    if (!order)
      throw new errorHandler(500, `UPDATE order with the id: ${id} => Failed`);

    return order;
  }

  /********************************
    delete order by id
  ********************************/

  static async deleteById(id) {
    try {
      return await super.deleteOne({
        filter: { _id: id },
        collection
      });
    } catch (e) {
      throw new errorHandler(500, `DELETE order with the id: ${id} => Failed`);
    }
  }

  /********************************
    delete maching orders
  ********************************/

  static async delete(query) {
    const {
      limit = undefined,
      skip = undefined,

      name = undefined,
      buyer = undefined,
      price = undefined,
      description = undefined,

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
    const filterOptions = ["name", "buyer", "price", "description"];
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
    const orders = await super.deleteMany({
      filter,
      options,
      collection
    });
    if (!orders) {
      throw new errorHandler(500, "DELETE selected orders => Failed");
    } else if (!(orders.length > 0)) {
      throw new errorHandler(404, "No orders to delete");
    }

    return orders;
  }

  //
}

module.exports = Order;
