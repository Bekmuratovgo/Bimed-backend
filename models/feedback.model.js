/********************************
  Feedback Model
********************************/

const { errorHandler } = require("../lib");

const { FeedbackCollection } = require("../collections");
const BaseModel = require("./base.model");

const collection = FeedbackCollection;

class Feedback extends BaseModel {
  constructor() {}

  /********************************
    create feedback
  ********************************/

  static async create(feedbackData) {
    const feedback = await super.create({
      item: {
        ...feedbackData,
      },
      collection,
    });

    return feedback;
  }

  /********************************
    get feedback by id
  ********************************/

  static async getById(id) {
    try {
      return await super.findById({ id, collection });
    } catch (e) {
      throw new errorHandler(404, `a feedback with the id: ${id} is NOT found`);
    }
  }

  /********************************
    get matching feedbacks
  ********************************/

  static async get(query) {
    const {
      limit = undefined,
      skip = undefined,

      name = undefined,
      phone = undefined,
      email = undefined,
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
    const filterOptions = ["name", "phone", "email", "title", "body"];
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
    const feedbacks = await super.findMany({
      filter,
      restricted,
      options,
      collection,
    });
    if (!feedbacks) {
      throw new errorHandler(500, "FETCH selected feedbacks => Failed");
    } else if (!(feedbacks.length > 0)) {
      return [];
    }
    return feedbacks;
  }

  /********************************
    update feedback by id
  ********************************/

  static async updateById(req) {
    const {
      params: { id },
    } = req;

    // update feedback
    const feedback = await super.updateById({
      id,
      data: { ...req.body },
      collection,
    });
    if (!feedback)
      throw new errorHandler(
        500,
        `UPDATE feedback with the id: ${id} => Failed`
      );

    return feedback;
  }

  /********************************
    delete feedback by id
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
        `DELETE feedback with the id: ${id} => Failed`
      );
    }
  }

  /********************************
    delete maching feedbacks
  ********************************/

  static async delete(query) {
    const {
      limit = undefined,
      skip = undefined,

      name = undefined,
      phone = undefined,
      email = undefined,
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
    const filterOptions = ["name", "phone", "email", "title", "body"];
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
    const feedbacks = await super.deleteMany({
      filter,
      options,
      collection,
    });
    if (!feedbacks) {
      throw new errorHandler(500, "DELETE selected feedbacks => Failed");
    } else if (!(feedbacks.length > 0)) {
      throw new errorHandler(404, "No feedbacks to delete");
    }

    return feedbacks;
  }

  //
}

module.exports = Feedback;
