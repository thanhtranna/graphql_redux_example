import {
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import {
    productType
} from '../../types/product';

import ProductModel from '../../../models/product';

export default {
    type: productType,
    args: {
        id: {
            name: 'ID',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(rootValue, params) {
        return ProductModel.findByIdAndRemove(params.id)
            .catch(err => new Error('Could\' Remove Product Data.', err));
    }
}