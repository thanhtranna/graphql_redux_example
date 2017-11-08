import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLList
} from 'graphql';

import {
    productType
} from '../../types/product';

import ProductModel from '../../../models/product';

export default {
    type: new GraphQLList(productType),
    args: {
        id: {
            name: 'ID',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve: async function(rootValue, params){
        await ProductModel.findByIdAndRemove(params.id);
        return await ProductModel.find({}).exec();
    }
}