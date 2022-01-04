/***********************
  1C integration code
***********************/

module.exports = async () => {
  "use strict";

  const fs = require("fs");
  const path = require("path");
  const xlsx = require("xlsx");

  const utils = require("./utils");
  const { winLogger, errorHandler } = require("../../lib");
  const { MedicineCollection } = require("../../collections");

  /****************************************************************
    // 'step by step guide to the integration process'
    ****************************************************


    // read the from xlsx file
    // convert data to JSON format

    // iterate over the JSON array of data objects
    // for each item on the array, do the following:

        // check if the item has an external id
        // check if the item already exists in the database
           using its external id
        // prepare medicine object to save to database
        // check if the item has an image url:

            // download the image from the external server
            // delete the image from the local server
            // upload image to bucket
            // append uploaded image data to medicine object

        // save medicine object to database


    // list and write saved objects to a json file
    // list and write omitted objects to a json file
    // list and write existing objects to a json file

  ****************************************************************/

  try {
    winLogger.info(`1C:INTEGRATION: started`);
    // read in memory < make sure the medicines.xlsx file exists >
    const filePath = path.resolve(__dirname, "medicines.xlsx");
    const workbook = xlsx.readFile(filePath);

    // console.log(Object.keys(workbook));
    // console.log(workbook.SheetNames);
    // console.log(workbook.Sheets);

    // convert to json
    let worksheets = {};
    for (var sheetName of workbook.SheetNames) {
      worksheets[sheetName] = xlsx.utils.sheet_to_json(
        workbook.Sheets[sheetName]
      );
    }

    // console.log(Object.keys(worksheets));
    // console.log(worksheets.Worksheet[0]);
    // console.log(Object.keys(worksheets.Worksheet[0]));

    // work
    let savedItems = []; // write in a json file
    let omittedItems = []; // write in a json file
    let existingItems = []; // write in a json file

    for (let i = 0; i < worksheets.Worksheet.length; i++) {
      try {
        // if (i > 202) break;
        const item = worksheets.Worksheet[i];

        // check if the item has an external id
        if (!item.External_ID) {
          winLogger.info(`1C:INTEGRATION:OMITTED: no external id`);
          omittedItems.push(item);
          continue;
        }
        // check if the item already exists in the database using its external id
        const medicineExists = await MedicineCollection.findOne({
          externalId: item.External_ID
        });
        if (medicineExists) {
          winLogger.info(
            `1C:INTEGRATION:IGNORED: external id '${item.External_ID}' already exists in the database`
          );
          existingItems.push(item);
          continue;
        }

        // prepare medicine object to save to database

        const medicine = {
          name: item.Product_Name,
          externalId: item.External_ID,
          category: item.Collection,
          subcategory: item.Collection_Order,
          country: "",
          brand: "",
          company: "",
          gallery: [],
          price: {
            commercial: "",
            noncommercial: item.Price
          },
          sales: {
            commercial: {
              status: false,
              original: "",
              current: ""
            },
            noncommercial: {
              status: false,
              original: "",
              current: ""
            }
          },
          composition: "",
          description: item.Section,
          instructions: ""
        };

        // check if the item has an image url
        if (
          item.Image &&
          typeof item.Image == "string" &&
          item.Image.startsWith("https://")
        ) {
          // break if more than one image is stored
          const images = item.Image.split("|");
          if (images.length > 1) {
            for (let j = 0; j < images.length; j++) {
              if (
                images[j] &&
                typeof images[j] == "string" &&
                images[j].startsWith("https://")
              ) {
                // download the image from the external server
                const downloadedFile = await utils.server.download({
                  url: images[j],
                  id: item.External_ID
                });

                // upload image to bucket
                const uploadedFile = await utils.bucket.upload(downloadedFile);

                // delete the image from the local server
                const deletedFile = await utils.local.delete(uploadedFile);

                // append uploaded image data to medicine object
                medicine.gallery = [...medicine.gallery, { ...uploadedFile }];
              }
            }
          } else {
            // download the image from the external server
            const downloadedFile = await utils.server.download({
              url: item.Image,
              id: item.External_ID
            });

            // console.log("downloadedFile", downloadedFile); //

            // upload image to bucket
            const uploadedFile = await utils.bucket.upload(downloadedFile);

            // console.log("uploadedFile", uploadedFile); //

            // delete the image from the local server
            const deletedFile = await utils.local.delete(uploadedFile);

            // append uploaded image data to medicine object
            medicine.gallery = [...medicine.gallery, { ...uploadedFile }];

            // console.log("gallery", medicine.gallery); //
          }
        }
        // else {
        // ignore/don't save the item if it has no image
        //   continue;
        // }

        // save medicine object to database
        const newMedicine = await new MedicineCollection(medicine);
        await newMedicine.save();
        savedItems.push(newMedicine);
      } catch (error) {
        throw new errorHandler(error.statusCode, error.message);
      }
    }

    // wrtie to logs
    winLogger.info(
      `savedItems: ${savedItems.length} -> [${savedItems.map(
        item => item.externalId
      )}]`
    );
    winLogger.info(
      `omittedItems: ${omittedItems.length} -> [${omittedItems.map(
        item => item.External_ID
      )}]`
    );
    winLogger.info(
      `existingItems: ${existingItems.length} -> [${existingItems.map(
        item => item.External_ID
      )}]`
    );

    // save to files
    if (savedItems.length > 0)
      await utils.saveToFile({
        filename: "savedItems.json",
        data: savedItems
      });

    if (omittedItems.length > 0)
      await utils.saveToFile({
        filename: "omittedItems.json",
        data: omittedItems
      });

    if (existingItems.length > 0)
      await utils.saveToFile({
        filename: "existingItems.json",
        data: existingItems
      });
    winLogger.info(`1C:INTEGRATION: completed`);
    return;
  } catch (error) {
    winLogger.error(`1C:INTEGRATION:ERROR: ${error.message}`);
    throw new errorHandler(500, `1C:INTEGRATION:ERROR: ${error.message}`);
  }
};
