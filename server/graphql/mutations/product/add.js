import * as _ from 'underscore';

import {
	GraphQLNonNull
} from 'graphql';


import { productType, productInputType } from '../../types/product';
import ProductModel from '../../../models/product';

export default {
	type: productType,
	args: {
		data: {
	      name: 'data',
	      type: new GraphQLNonNull(productInputType)
	    }
	},
	resolve(rootValue, params) {
		const productModel = new ProductModel(params.data);
	    const newProduct = productModel.save();
	    if (!newProduct) {
	      throw new Error('Error adding post');
	    }
	    return newProduct;	
	}
}