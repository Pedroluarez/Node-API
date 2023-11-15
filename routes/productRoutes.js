// for expressjs
const express = require("express");
const router = express.Router();
// import controller
const {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controllers/productController");

//routes
//get all products
router.get("/", getProducts);
//get one product
router.get("/:id", getProduct);

//post products
router.post("/", postProduct);

// put product
router.put("/:id", putProduct);

//delete product
router.delete("/:id", deleteProduct);

module.exports = router;
