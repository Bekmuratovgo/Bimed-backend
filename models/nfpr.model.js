/********************************
  NFPR Model
********************************/

const { errorHandler } = require("../lib");

const { NFPRCollection } = require("../collections");
const BaseModel = require("./base.model");

const collection = NFPRCollection;

class NFPR extends BaseModel {
  constructor() {}

  /********************************
    create nfpr
  ********************************/

  static async create(nfprData) {
    const nfpr = await super.create({
      item: {
        ...nfprData
      },
      collection
    });

    return nfpr;
  }

  /********************************
    get nfpr by id
  ********************************/

  static async getById(id) {
    try {
      return await super.findById({ id, collection });
    } catch (e) {
      throw new errorHandler(404, `a nfpr with the id: ${id} is NOT found`);
    }
  }

  /********************************
    get matching nfprs
  ********************************/

  static async get(query) {
    const {
      limit = undefined,
      skip = undefined,

      name = undefined,
      phone = undefined,
      product = undefined,
      status = undefined,

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
    const filterOptions = ["name", "phone", "product", "status"];
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
    const nfprs = await super.findMany({
      filter,
      restricted,
      options,
      collection
    });
    if (!nfprs) {
      throw new errorHandler(500, "FETCH selected nfprs => Failed");
    } else if (!(nfprs.length > 0)) {
      return [];
    }
    return nfprs;
  }

  /********************************
    update nfpr by id
  ********************************/

  static async updateById(req) {
    const {
      params: { id }
    } = req;

    // update nfpr
    const nfpr = await super.updateById({
      id,
      data: { ...req.body },
      collection
    });
    if (!nfpr)
      throw new errorHandler(500, `UPDATE nfpr with the id: ${id} => Failed`);

    return nfpr;
  }

  /********************************
    delete nfpr by id
  ********************************/

  static async deleteById(id) {
    try {
      return await super.deleteOne({
        filter: { _id: id },
        collection
      });
    } catch (e) {
      throw new errorHandler(500, `DELETE nfpr with the id: ${id} => Failed`);
    }
  }

  /********************************
    delete maching nfprs
  ********************************/

  static async delete(query) {
    const {
      limit = undefined,
      skip = undefined,

      name = undefined,
      phone = undefined,
      product = undefined,
      status = undefined,

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
    const filterOptions = ["name", "phone", "product", "status"];
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
    const nfprs = await super.deleteMany({
      filter,
      options,
      collection
    });
    if (!nfprs) {
      throw new errorHandler(500, "DELETE selected nfprs => Failed");
    } else if (!(nfprs.length > 0)) {
      throw new errorHandler(404, "No nfprs to delete");
    }

    return nfprs;
  }

  //
}

module.exports = NFPR;
