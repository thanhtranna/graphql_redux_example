import {
	GraphQLList
} from 'graphql';

import {
	productType
} from '../../types/product';

import productModel from '../../../models/product';

export default {
	type: new GraphQLList(productType),
	resolve() {
		const products = productModel.find({}).exec();
		if (!products) {
			throw new Error('Error getting products');
		}
		return products;
	}
}