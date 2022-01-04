/********************************
  Contact Model
********************************/

const { errorHandler } = require("../lib");

const { ContactCollection } = require("../collections");
const BaseModel = require("./base.model");

const collection = ContactCollection;

class Contact extends BaseModel {
  constructor() {}

  /********************************
    create contact
  ********************************/

  static async create(contactData) {
    const contact = await super.create({
      item: {
        ...contactData,
      },
      collection,
    });

    return contact;
  }

  /********************************
    get contact by id
  ********************************/

  static async getById(id) {
    try {
      return await super.findById({ id, collection });
    } catch (e) {
      throw new errorHandler(404, `a contact with the id: ${id} is NOT found`);
    }
  }

  /********************************
    get matching contacts
  ********************************/

  static async get(query) {
    const {
      limit = 10,
      skip = 0,

      field = undefined,
      data = undefined,

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
    const filterOptions = ["field", "data"];
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
    const contacts = await super.findMany({
      filter,
      restricted,
      options,
      collection,
    });
    if (!contacts) {
      throw new errorHandler(500, "FETCH selected contacts => Failed");
    } else if (!(contacts.length > 0)) {
      return [];
    }
    return contacts;
  }

  /********************************
    update contact by id
  ********************************/

  static async updateById(req) {
    const {
      params: { id },
    } = req;

    // update contact
    const contact = await super.updateById({
      id,
      data: { ...req.body },
      collection,
    });
    if (!contact)
      throw new errorHandler(
        500,
        `UPDATE contact with the id: ${id} => Failed`
      );

    return contact;
  }

  /********************************
    delete contact by id
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
        `DELETE contact with the id: ${id} => Failed`
      );
    }
  }

  /********************************
    delete maching contacts
  ********************************/

  static async delete(query) {
    const {
      limit = undefined,
      skip = undefined,

      field = undefined,
      data = undefined,

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
    const filterOptions = ["field", "data"];
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
    const contacts = await super.deleteMany({
      filter,
      options,
      collection,
    });
    if (!contacts) {
      throw new errorHandler(500, "DELETE selected contacts => Failed");
    } else if (!(contacts.length > 0)) {
      throw new errorHandler(404, "No contacts to delete");
    }

    return contacts;
  }

  //
}

module.exports = Contact;
