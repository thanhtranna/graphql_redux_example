import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

export const productType = new GraphQLObjectType({
  name: 'Product',
  description: 'Represent the type of a Product',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    cost: {
      type: GraphQLInt
    },
    quantity: {
      type: GraphQLInt
    },
    image: {
      type: GraphQLString
    }
  })
});

export const productInputType = new GraphQLInputObjectType({
  name: 'ProductInput',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLString
    },
    image: {
      type: GraphQLString
    },
    cost: {
      type: GraphQLInt
    },
    quantity: {
      type: GraphQLInt
    }
  })
});