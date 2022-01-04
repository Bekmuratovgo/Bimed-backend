/********************************
  FAQ Model
********************************/

const { errorHandler } = require("../lib");

const { FAQCollection } = require("../collections");
const BaseModel = require("./base.model");

const collection = FAQCollection;

class FAQ extends BaseModel {
  constructor() {}

  /********************************
    create faq
  ********************************/

  static async create(faqData) {
    const faq = await super.create({
      item: {
        ...faqData,
      },
      collection,
    });

    return faq;
  }

  /********************************
    get faq by id
  ********************************/

  static async getById(id) {
    try {
      return await super.findById({ id, collection });
    } catch (e) {
      throw new errorHandler(404, `a faq with the id: ${id} is NOT found`);
    }
  }

  /********************************
    get matching faqs
  ********************************/

  static async get(query) {
    const {
      limit = 10,
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
    const faqs = await super.findMany({
      filter,
      restricted,
      options,
      collection,
    });
    if (!faqs) {
      throw new errorHandler(500, "FETCH selected faqs => Failed");
    } else if (!(faqs.length > 0)) {
      return [];
    }
    return faqs;
  }

  /********************************
    update faq by id
  ********************************/

  static async updateById(req) {
    const {
      params: { id },
    } = req;

    // update faq
    const faq = await super.updateById({
      id,
      data: { ...req.body },
      collection,
    });
    if (!faq)
      throw new errorHandler(500, `UPDATE faq with the id: ${id} => Failed`);

    return faq;
  }

  /********************************
    delete faq by id
  ********************************/

  static async deleteById(id) {
    try {
      return await super.deleteOne({
        filter: { _id: id },
        collection,
      });
    } catch (e) {
      throw new errorHandler(500, `DELETE faq with the id: ${id} => Failed`);
    }
  }

  /********************************
    delete maching faqs
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
    const faqs = await super.deleteMany({
      filter,
      options,
      collection,
    });
    if (!faqs) {
      throw new errorHandler(500, "DELETE selected faqs => Failed");
    } else if (!(faqs.length > 0)) {
      throw new errorHandler(404, "No faqs to delete");
    }

    return faqs;
  }

  //
}

module.exports = FAQ;
