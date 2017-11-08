import * as _ from 'underscore';

import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt
} from 'graphql';

import {
    productType,
    productInputType
} from '../../types/product';

import ProductModel from '../../../models/product';

export default {
    type: productType,
    args: {
        id: {
            name: 'ID',
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
          name: 'data',
          type: new GraphQLNonNull(productInputType)
        }
    },
    resolve(rootValue, params) {
        return ProductModel.findByIdAndUpdate(params.id, {
          $set: {
            ...params.data
          }
        }, {new: true})
        .catch(err => new Error('Could\'t Update Post Data'));
    }
}