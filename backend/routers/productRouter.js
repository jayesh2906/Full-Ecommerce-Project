import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth, isCustomer } from '../utils.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({ requestStatus: false });
    res.send(products);
  })
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

export default productRouter;


productRouter.post(
  '/addProduct',
  isAdmin,
  expressAsyncHandler((req, res) => {
    var pp = req.files.image;

    var imageName = pp.name;

    async function rep() {
      for (var i = 0; i < imageName.length; i++) {
        if (imageName[i] === " ") {
          imageName = setCharAt(imageName, i, '_');
        }
      }
      var img = imageName;
      return img;
    }

    function setCharAt(str, index, chr) {
      if (index > str.length - 1) return str;
      return str.substring(0, index) + chr + str.substring(index + 1);
    }

    var img = rep();
    pp.mv('frontend/public/images/' + imageName, function (err) {
      if (err) {
        res.json({ "status": "file not uploaded" });
      }
      else {

        var insobj = {
          name: req.body.name,
          category: req.body.category,
          price: req.body.price,
          countInStock: req.body.countInStock,
          brand: req.body.brand,
          rating: req.body.rating,
          numReviews: req.body.numReviews,
          description: req.body.description,
          image: imageName,
          customer: false
        }

        const createdProducts = Product.create(insobj);
        res.send({ createdProducts });
      }
    })
  })
);



productRouter.put(
  '/updateProduct/:id',
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name,
        product.category = req.body.category,
        product.price = req.body.price,
        product.countInStock = req.body.countInStock,
        product.brand = req.body.brand,
        product.rating = req.body.rating,
        product.numReviews = req.body.numReviews,
        product.description = req.body.description

      const updatedProduct = await product.save();
      res.send({ updatedProduct });
    }
  })
)

productRouter.delete(
  '/deleteProduct/:id',
  isAuth,
  expressAsyncHandler((req, res) => {
    Product.remove({ _id: req.params.id })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json({
          error: err
        })
      })
  }
  ))


///////////////customer part///////////


productRouter.get(
  '/customer/:name',
  isCustomer,
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({ $and: [{ customer: req.params.name }, { requestStatus: false }] });
    res.send(products);
  })
);



productRouter.post(
  '/addRequestProduct',
  isCustomer,
  expressAsyncHandler((req, res) => {
    var pp = req.files.image;

    var imageName = pp.name;

    async function rep() {
      for (var i = 0; i < imageName.length; i++) {
        if (imageName[i] === " ") {
          imageName = setCharAt(imageName, i, '_');
        }
      }
      var img = imageName;
      return img;
    }

    function setCharAt(str, index, chr) {
      if (index > str.length - 1) return str;
      return str.substring(0, index) + chr + str.substring(index + 1);
    }

    var img = rep();

    pp.mv('frontend/public/images/' + imageName, function (err) {
      if (err) {
        res.json({ "status": "file not uploaded" });
      }
      else {

        var insobj = {
          name: req.body.name,
          category: req.body.category,
          price: req.body.price,
          countInStock: req.body.countInStock,
          brand: req.body.brand,
          rating: false,
          numReviews: false,
          description: req.body.description,
          image: imageName,
          customer: req.body.customer,
          requestStatus: true
        }

        const createdProducts = Product.create(insobj);
        res.send({ createdProducts });
      }
    })
  })
);


productRouter.patch(
  '/customer/update/:id',
  isCustomer,
  expressAsyncHandler(async (req, res) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };
      const updatedData = await Product.findOneAndUpdate({ _id: id }, updates, options);
      return res.status(200).json({ status: true, data: updatedData });

    } catch (error) {
      return res.status(400).json({ status: false, error: error });
    }
  })
)


////////////////////  admin part///////////////


productRouter.get(
  '/admin/requestedProducts',
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({ requestStatus: true });
    res.send(products);
  })
);

productRouter.patch(
  '/admin/acceptRequest/:name',
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const name = req.params.name;
      const updates = req.body;
      const options = { new: true };
      const updatedData = await Product.findOneAndUpdate({ name: name }, updates, options);
      return res.status(200).json({ status: true, data: updatedData });

    } catch (error) {
      return res.status(400).json({ status: false, error: error });
    }
  }))


///////////////////////search part//////////


productRouter.get(
  '/search/name/:search',
  expressAsyncHandler(async (req, res) => {

    try {
      const search = new RegExp(req.params.search, 'i');
      const products = await Product.find({ $and: [{ requestStatus: false }, { name: search }] });
      return res.status(200).json({ status: true, nameData: products });

    } catch (error) {
      return res.status(400).json({ status: false, error: error });
    }
  }))

productRouter.get(
  '/search/category/:search',
  expressAsyncHandler(async (req, res) => {

    try {
      const search = new RegExp(req.params.search, 'i');
      const products = await Product.find({ $and: [{ requestStatus: false }, { category: search }] });
      return res.status(200).json({ status: true, data: products });

    } catch (error) {
      return res.status(400).json({ status: false, error: error });
    }
  }))

productRouter.get(
  '/search/brand/:search',
  expressAsyncHandler(async (req, res) => {
    try {
      const search = new RegExp(req.params.search, 'i');
      const products = await Product.find({ $and: [{ requestStatus: false }, { brand: search }] });
      return res.status(200).json({ status: true, data: products });
    } catch (error) {
      return res.status(400).json({ status: false, error: error });
    }
  }))

productRouter.get(
  '/search/rating/:search',
  expressAsyncHandler(async (req, res) => {
    try {
      const products = await Product.find({ $and: [{ requestStatus: false }, { rating: { $gte: req.params.search } }] });
      return res.status(200).json({ status: true, data: products });
    } catch (error) {
      return res.status(400).json({ status: false, error: error });
    }
  }))

productRouter.get(
  '/search/price/:min/:max',
  expressAsyncHandler(async (req, res) => {
    try {
      const products = await Product.find({
        $and: [{ requestStatus: false },
        {
          $and: [{ price: { $gte: req.params.min } },
          { price: { $lte: req.params.max } }]
        }]
      });
      return res.status(200).json({ status: true, data: products });
    } catch (error) {
      return res.status(400).json({ status: false, error: error });
    }
  }))



////////////////////////////// Fiter part /////////////


productRouter.get(
  '/filter/category/:data',
  expressAsyncHandler(async (req, res) => {
    try {
      var perm = JSON.parse(req.params.data);
      const products = await Product.find(
        {
          $and: [{ requestStatus: false },

          {
            $or: [
              {
                category: {
                  $in: perm.map((post) => {
                    return (
                      `${post}`
                    )
                  })
                }
              }
            ]
          }]
        });

      return res.status(200).json({ status: true, data: products });
    } catch (error) {
      return res.status(400).json({ status: false, error: error });
    }
  }))



productRouter.get(
  '/filter/brand/:data',
  expressAsyncHandler(async (req, res) => {
    try {
      var perm = JSON.parse(req.params.data);

      const products = await Product.find(
        {
          $and: [{ requestStatus: false },

          {
            $or: [
              {
                brand: {
                  $in: perm.map((post) => {
                    return (
                      `${post}`
                    )
                  })
                }
              }
            ]
          }]
        });

      return res.status(200).json({ status: true, data: products });
    } catch (error) {
      return res.status(400).json({ status: false, error: error });
    }
  }))




////////////// request status customer //////////////

productRouter.get(
  `/customer/allRequest/:name`,
  isCustomer,
  expressAsyncHandler(async (req, res) => {
    try {
      const customer = req.params.name;
      const requestedData = await Product.find({ customer: customer });
      return res.status(200).json({ status: true, data: requestedData });
    } catch (error) {
      return res.status(400).json({ status: false, error: error });
    }
  }))