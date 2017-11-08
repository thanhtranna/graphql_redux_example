import {
	GraphQLNonNull,
	GraphQLID
} from 'graphql';

import {
	productType
} from '../../types/product';

import productModel from '../../../models/product';

export default {
	type: productType,
	args: {
		id: {
			name: 'ID',
			type: new GraphQLNonNull(GraphQLID)
		}
	},
	resolve: function(rootValue, params) {
		return productModel.findById(params.id).exec();
	}
}