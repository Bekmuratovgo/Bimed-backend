/********************************
  About Model
********************************/

const { errorHandler } = require("../lib");

const { AboutCollection } = require("../collections");
const BaseModel = require("./base.model");

const collection = AboutCollection;

class About extends BaseModel {
  constructor() {}

  /********************************
    create about
  ********************************/

  static async create(aboutData) {
    const about = await super.create({
      item: {
        ...aboutData,
      },
      collection,
    });

    return about;
  }

  /********************************
    get about by id
  ********************************/

  static async getById(id) {
    try {
      return await super.findById({ id, collection });
    } catch (e) {
      throw new errorHandler(404, `a about with the id: ${id} is NOT found`);
    }
  }

  /********************************
    get matching abouts
  ********************************/

  static async get(query) {
    const {
      limit = 1,
      skip = 0,

      title = undefined,
      body = undefined,

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
    const filterOptions = ["title", "body"];
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
    const abouts = await super.findMany({
      filter,
      restricted,
      options,
      collection,
    });
    if (!abouts) {
      throw new errorHandler(500, "FETCH selected abouts => Failed");
    } else if (!(abouts.length > 0)) {
      return [];
    }
    return abouts;
  }

  /********************************
    update about by id
  ********************************/

  static async updateById(req) {
    const {
      params: { id },
    } = req;

    // update about
    const about = await super.updateById({
      id,
      data: { ...req.body },
      collection,
    });
    if (!about)
      throw new errorHandler(500, `UPDATE about with the id: ${id} => Failed`);

    return about;
  }

  /********************************
    delete about by id
  ********************************/

  static async deleteById(id) {
    try {
      return await super.deleteOne({
        filter: { _id: id },
        collection,
      });
    } catch (e) {
      throw new errorHandler(500, `DELETE about with the id: ${id} => Failed`);
    }
  }

  /********************************
    delete maching abouts
  ********************************/

  static async delete(query) {
    const {
      limit = undefined,
      skip = undefined,

      title = undefined,
      body = undefined,

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
    const filterOptions = ["title", "body"];
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
    const abouts = await super.deleteMany({
      filter,
      options,
      collection,
    });
    if (!abouts) {
      throw new errorHandler(500, "DELETE selected abouts => Failed");
    } else if (!(abouts.length > 0)) {
      throw new errorHandler(404, "No abouts to delete");
    }

    return abouts;
  }

  //
}

module.exports = About;
