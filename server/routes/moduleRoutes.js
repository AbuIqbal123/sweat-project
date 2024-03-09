const express = require("express");
const router = express.Router();
const moduleController = require("../Controllers/ModuleController");

/**
 * Route: /fetch-data/:id
 * Method: GET
 * Description: Fetch module data by module code.
 */
router.get("/fetch-data/:id", moduleController.fetchData);

/**
 * Route: /fetch-all-codes
 * Method: GET
 * Description: Fetch all module codes based on specified filters.
 */
router.get("/fetch-all-codes/", moduleController.fetchAllCodes);

/**
 * Route: /create
 * Method: POST
 * Description: Create a new module.
 */
router.post("/create", moduleController.createModule);

/**
 * Route: /update/:id
 * Method: PUT
 * Description: Update an existing module by module code.
 */
router.put("/update/:id", moduleController.updateModule);

module.exports = router;
