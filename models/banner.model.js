/********************************
  Banner Model
********************************/

const { errorHandler } = require("../lib");

const { BannerCollection } = require("../collections");
const BaseModel = require("./base.model");

const collection = BannerCollection;

class Banner extends BaseModel {
  constructor() {}

  /********************************
    create banner
  ********************************/

  static async create(bannerData) {
    const banner = await super.create({
      item: {
        ...bannerData,
      },
      collection,
    });

    return banner;
  }

  /********************************
    get banner by id
  ********************************/

  static async getById(id) {
    try {
      return await super.findById({ id, collection });
    } catch (e) {
      throw new errorHandler(404, `a banner with the id: ${id} is NOT found`);
    }
  }

  /********************************
    get matching banners
  ********************************/

  static async get(query) {
    const {
      limit = 3,
      skip = 0,

      name = undefined,
      clicks = undefined,
      description = undefined,

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
    const filterOptions = ["name", "clicks", "description"];
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
    const banners = await super.findMany({
      filter,
      restricted,
      options,
      collection,
    });
    if (!banners) {
      throw new errorHandler(500, "FETCH selected banners => Failed");
    } else if (!(banners.length > 0)) {
      return [];
    }
    return banners;
  }

  /********************************
    update banner by id
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

      //  if the name belongs to another banner not self
      if (nameExists && nameExists._id != _id)
        throw new errorHandler(
          400,
          `this name: ${name} cannot be used, please use a different one`
        );
    }

    // update banner
    const banner = await super.updateById({
      id,
      data: { ...req.body },
      collection,
    });
    if (!banner)
      throw new errorHandler(500, `UPDATE banner with the id: ${id} => Failed`);

    return banner;
  }

  /********************************
    delete banner by id
  ********************************/

  static async deleteById(id) {
    try {
      return await super.deleteOne({
        filter: { _id: id },
        collection,
      });
    } catch (e) {
      throw new errorHandler(500, `DELETE banner with the id: ${id} => Failed`);
    }
  }

  /********************************
    delete maching banners
  ********************************/

  static async delete(query) {
    const {
      limit = undefined,
      skip = undefined,

      name = undefined,
      clicks = undefined,
      description = undefined,

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
    const filterOptions = ["name", "clicks", "description"];
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
    const banners = await super.deleteMany({
      filter,
      options,
      collection,
    });
    if (!banners) {
      throw new errorHandler(500, "DELETE selected banners => Failed");
    } else if (!(banners.length > 0)) {
      throw new errorHandler(404, "No banners to delete");
    }

    return banners;
  }

  //
}

module.exports = Banner;
