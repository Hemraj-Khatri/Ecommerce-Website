import express from 'express';

import { addProduct,  getProducts, deleteProduct,updateProduct, addUserReview, toTenProduct} from '../controller/product.controller.js';
import { checkAdmin, checkAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

// router.post('/addProduct', addProduct);
router.route('/').get(getProducts);
router.route('/topten').get(toTenProduct);
router.route('/').post(checkAuth, checkAdmin, addProduct);
router.route('/delete/:id').delete(checkAuth, checkAdmin, deleteProduct)
router.route('/update/:id').put(checkAuth, checkAdmin, updateProduct)
router.route('/addreview/:id').put(checkAuth,  addUserReview)
export default router;