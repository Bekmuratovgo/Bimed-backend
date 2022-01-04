/********************************
  Pharmacy Model
********************************/

const { errorHandler } = require("../lib");

const { PharmacyCollection } = require("../collections");
const BaseModel = require("./base.model");

const collection = PharmacyCollection;

class Pharmacy extends BaseModel {
  constructor() {}

  /********************************
    create pharmacy
  ********************************/

  static async create(pharmacyData) {
    const pharmacy = await super.create({
      item: {
        ...pharmacyData,
      },
      collection,
    });

    return pharmacy;
  }

  /********************************
    get pharmacy by id
  ********************************/

  static async getById(id) {
    try {
      return await super.findById({ id, collection });
    } catch (e) {
      throw new errorHandler(404, `a pharmacy with the id: ${id} is NOT found`);
    }
  }

  /********************************
    get matching pharmacies
  ********************************/

  static async get(query) {
    const {
      limit = 8,
      skip = 0,

      name = undefined,
      address = undefined,

      sortBy = undefined,
    } = query;

    // / /  / / / //  / /////
    const sort = {};
    if (sortBy) {
      const parts = sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    // / /  / / / //  / /////
    const filter = {};
    const filterOptions = ["name", "address", "coordinates", "schedule"];
    filterOptions.forEach((filterOption) => {
      if (query[filterOption]) filter[filterOption] = query[filterOption];
    });
    // / /  / / / //  / /////
    const restricted = "";
    // / /  / / / //  / /////
    const options = {
      limit: limit && parseInt(limit),
      skip: limit && parseInt(skip),
      sort,
    };
    // / /  / / / //  / /////
    const pharmacys = await super.findMany({
      filter,
      restricted,
      options,
      collection,
    });
    if (!pharmacys) {
      throw new errorHandler(500, "FETCH selected pharmacies => Failed");
    } else if (!(pharmacys.length > 0)) {
      return [];
    }
    return pharmacys;
  }

  /********************************
    update pharmacy by id
  ********************************/

  static async updateById(req) {
    const {
      body: { _id, name },
      params: { id },
    } = req;

    if (name) {
      const nameExists = await super.findOne({
        filter: { name },
        collection,
      });

      //  if the name belongs to another pharmacy not self
      if (nameExists && nameExists._id != _id)
        throw new errorHandler(
          400,
          `this name: ${name} cannot be used, please use a different one`
        );
    }

    // update pharmacy
    const pharmacy = await super.updateById({
      id,
      data: { ...req.body },
      collection,
    });
    if (!pharmacy)
      throw new errorHandler(
        500,
        `UPDATE pharmacy with the id: ${id} => Failed`
      );

    return pharmacy;
  }

  /********************************
    delete pharmacy by id
  ********************************/

  static async deleteById(id) {
    try {
      return await super.deleteOne({
        filter: { _id: id },
        collection,
      });
    } catch (e) {
      throw new errorHandler(
        500,
        `DELETE pharmacy with the id: ${id} => Failed`
      );
    }
  }

  /********************************
    delete maching pharmacies
  ********************************/

  static async delete(query) {
    const {
      limit = undefined,
      skip = undefined,

      name = undefined,
      address = undefined,
      coordinates = undefined,
      schedule = undefined,

      sortBy = undefined,
    } = query;

    // / /  / / / //  / /////
    const sort = {};
    if (sortBy) {
      const parts = sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    // / /  / / / //  / /////
    const filter = {};
    const filterOptions = ["name", "address", "coordinates", "schedule"];
    filterOptions.forEach((filterOption) => {
      if (query[filterOption]) filter[filterOption] = query[filterOption];
    });
    // / /  / / / //  / /////
    const options = {
      limit: limit && parseInt(limit),
      skip: limit && parseInt(skip),
      sort,
    };
    // / /  / / / //  / /////
    const pharmacys = await super.deleteMany({
      filter,
      options,
      collection,
    });
    if (!pharmacys) {
      throw new errorHandler(500, "DELETE selected pharmacys => Failed");
    } else if (!(pharmacys.length > 0)) {
      throw new errorHandler(404, "No pharmacies to delete");
    }

    return pharmacys;
  }

  //
}

module.exports = Pharmacy;
