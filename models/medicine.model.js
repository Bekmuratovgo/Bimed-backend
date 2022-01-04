/********************************
  Medicine Model
********************************/

const { errorHandler, downloadFile } = require("../lib");

const { MedicineCollection } = require("../collections");
const BaseModel = require("./base.model");

const collection = MedicineCollection;

class Medicine extends BaseModel {
  constructor() {}

  /********************************
    create medicine
  ********************************/

  static async create(medicineData) {
    const medicine = await super.create({
      item: {
        ...medicineData
      },
      collection
    });

    return medicine;
  }

  /********************************
    get medicine by id
  ********************************/

  static async getById(id) {
    try {
      return await super.findById({ id, collection });
    } catch (e) {
      throw new errorHandler(404, `a medicine with the id: ${id} is NOT found`);
    }
  }

  /********************************
    get matching medicines
  ********************************/

  static async get(query) {
    const {
      limit = 15,
      skip = 0,

      name = undefined,
      category = undefined,
      subcategory = undefined,
      country = undefined,
      brand = undefined,
      company = undefined,
      composition = undefined,
      description = undefined,
      instructions = undefined,

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
    const filterOptions = [
      "name",
      "category",
      "subcategory",
      "country",
      "brand",
      "company",
      "composition",
      "description",
      "instructions"
    ];
    filterOptions.forEach(filterOption => {
      if (query[filterOption]) {
        if (filterOption == "name") {
          // console.log(query[filterOption]);
          filter[filterOption] = new RegExp(query[filterOption]);
        } else {
          filter[filterOption] = query[filterOption];
        }
      }
    });
    // console.log(filter);
    // / /  / / / //  / /////
    const restricted = "";
    // / /  / / / //  / /////
    const options = {
      limit: limit && parseInt(limit),
      skip: limit && parseInt(skip),
      sort
    };
    // / /  / / / //  / /////
    const medicines = await super.findMany({
      filter,
      restricted,
      options,
      collection
    });
    if (!medicines) {
      throw new errorHandler(500, "FETCH selected medicines => Failed");
    } else if (!(medicines.length > 0)) {
      return [];
    }
    return medicines;
  }

  /********************************
      get medicine image
  ********************************/

  static async getMedicineImage(req, res) {
    try {
      const filename = req.params.key;
      await downloadFile({ req, res, filename });
    } catch (error) {
      throw new errorHandler(error.statusCode, error.message);
    }
  }

  /********************************
    update medicine by id
  ********************************/

  static async updateById(req) {
    const {
      body: { _id, name },
      params: { id }
    } = req;

    if (name) {
      const nameExists = await super.findOne({
        filter: { name },
        collection
      });

      //  if the name belongs to another medicine not self
      if (nameExists && nameExists._id != _id)
        throw new errorHandler(
          400,
          `this name: ${name} cannot be used, please use a different one`
        );
    }

    // update medicine
    const medicine = await super.updateById({
      id,
      data: { ...req.body },
      collection
    });
    if (!medicine)
      throw new errorHandler(
        500,
        `UPDATE medicine with the id: ${id} => Failed`
      );

    return medicine;
  }

  /********************************
    delete medicine by id
  ********************************/

  static async deleteById(id) {
    try {
      return await super.deleteOne({
        filter: { _id: id },
        collection
      });
    } catch (e) {
      throw new errorHandler(
        500,
        `DELETE medicine with the id: ${id} => Failed`
      );
    }
  }

  /********************************
    delete maching medicines
  ********************************/

  static async delete(query) {
    const {
      limit = undefined,
      skip = undefined,

      name = undefined,
      category = undefined,
      subcategory = undefined,
      country = undefined,
      brand = undefined,
      company = undefined,
      composition = undefined,
      description = undefined,
      instructions = undefined,

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
    const filterOptions = [
      "name",
      "category",
      "subcategory",
      "country",
      "brand",
      "company",
      "composition",
      "description",
      "instructions"
    ];
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
    const medicines = await super.deleteMany({
      filter,
      options,
      collection
    });
    if (!medicines) {
      throw new errorHandler(500, "DELETE selected medicines => Failed");
    } else if (!(medicines.length > 0)) {
      throw new errorHandler(404, "No medicines to delete");
    }

    return medicines;
  }

  //

  /*
  get random number documents by skip RAND
  */
  static async getRandomDocuments(size) {
    const random = Math.floor(Math.random() * size);
    const medicines = await super.findMany({
      filter: {},
      restricted: "",
      options: { skip: random },
      collection: collection
    });

    if (!medicines) throw new errorHandler(400, "Medicines not found, sorry");

    if (!medicines) throw new errorHandler(400, "Medicines not found, sorry");

    return medicines;
  }
}

module.exports = Medicine;
