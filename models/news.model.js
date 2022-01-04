/********************************
  News Model
********************************/

const { errorHandler } = require("../lib");

const { NewsCollection } = require("../collections");
const BaseModel = require("./base.model");

const collection = NewsCollection;

class News extends BaseModel {
  constructor() {}

  /********************************
    create news
  ********************************/

  static async create(newsData) {
    const news = await super.create({
      item: {
        ...newsData,
      },
      collection,
    });

    return news;
  }

  /********************************
    get news by id
  ********************************/

  static async getById(id) {
    try {
      return await super.findById({ id, collection });
    } catch (e) {
      throw new errorHandler(404, `a news with the id: ${id} is NOT found`);
    }
  }

  /********************************
    get matching news
  ********************************/

  static async get(query) {
    const {
      limit = 8,
      skip = 0,

      title = undefined,
      body = undefined,
      date = undefined,

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
    const filterOptions = ["title", "body", "date"];
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
    const news = await super.findMany({
      filter,
      restricted,
      options,
      collection,
    });
    if (!news) {
      throw new errorHandler(500, "FETCH selected news => Failed");
    } else if (!(news.length > 0)) {
      return [];
    }
    return news;
  }

  /********************************
    update news by id
  ********************************/

  static async updateById(req) {
    const {
      params: { id },
    } = req;

    // update news
    const news = await super.updateById({
      id,
      data: { ...req.body },
      collection,
    });
    if (!news)
      throw new errorHandler(500, `UPDATE news with the id: ${id} => Failed`);

    return news;
  }

  /********************************
    delete news by id
  ********************************/

  static async deleteById(id) {
    try {
      return await super.deleteOne({
        filter: { _id: id },
        collection,
      });
    } catch (e) {
      throw new errorHandler(500, `DELETE news with the id: ${id} => Failed`);
    }
  }

  /********************************
    delete maching news
  ********************************/

  static async delete(query) {
    const {
      limit = undefined,
      skip = undefined,

      title = undefined,
      body = undefined,
      date = undefined,

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
    const filterOptions = ["name", "body", "date"];
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
    const news = await super.deleteMany({
      filter,
      options,
      collection,
    });
    if (!news) {
      throw new errorHandler(500, "DELETE selected news => Failed");
    } else if (!(news.length > 0)) {
      throw new errorHandler(404, "No news to delete");
    }

    return news;
  }

  //
}

module.exports = News;
