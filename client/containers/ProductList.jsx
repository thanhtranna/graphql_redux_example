import React from 'react';
import {connect} from 'react-redux';
import {getProducts, removeProduct} from '../actions/products.actions.js';
import {Link, browserHistory} from 'react-router';

class ProductList extends React.Component {
    componentWillMount() {
        const {getProducts} = this.props;
        getProducts("{products{_id, name}}")
    }

    componentWillUnmount() {
        const {getProducts} = this.props;
        getProducts("{products{_id, name}}");
    }

    render() {
        const {products, fetching, removeProduct} = this.props;
        if (!products) return <div>Loading.....</div>;
        return (<div style={{
            textAlign: "center"
        }}>
            <h1>List of Products</h1>
            {
                products.map(product => {
                    return (
                        <div style={{width: "300px", margin: "0 auto"}} key={product._id}>
                            <div style={{
                                width: "150px",
                                display: "inline-block",
                                textAlign: "left"
                            }}>
                                <Link to={`product/${product._id}`}>
                                    {product.name}
                                </Link>
                            </div>
                            <div style={{
                                width: "150px",
                                display: "inline-block",
                                textAlign: "right"
                            }}>
                                <button onClick={() => browserHistory.push(`/product/${product._id}/edit`)}>
                                    Edit
                                </button>
                                &nbsp; &nbsp;
                                <button
                                    onClick={() => removeProduct(`mutation{removeProduct(id:"${product._id}"){_id, name}}`)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })
            }
            <br/>
            <Link to="product/new">
                Add New Product
            </Link>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {products: state.products.get("products"), fetching: state.products.get("fetching")}
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: (payload) => {
            return dispatch(getProducts(payload));
        },
        removeProduct: (payload) => {
            return dispatch(removeProduct(payload));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
