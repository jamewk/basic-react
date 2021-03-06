import React, { Component } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductList from "../../components/product/ProductList";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { productsFetch, productDelete } from "../../actions";


class Product extends Component {
	constructor(props) {
		super(props);
		this.delProduct = this.delProduct.bind(this);
		this.editProduct = this.editProduct.bind(this);
	}

	componentDidMount() {
		this.props.productsFetch();
	}

	editProduct(product) {
		this.props.history.push('products/edit/' + product.id);
	}

	delProduct(product) {
		this.props.productDelete(product.id);
	}

	render() {
		return (
			<div>
				<Header />
				<div className="container-fluid ">
					<div className="row">
						<div className="col-6">
							<h1>สินค้า</h1>
						</div>
						<div className="col-6">
							<button className="btn btn-success title float-right" onClick={() => this.props.history.push('products/add')}>เพิ่มสินค้า</button>
						</div>
					</div>
					{this.props.products.length > 0? 
						<ProductList products={this.props.products} 
							onEditProduct={this.editProduct} 
							onDelProduct={this.delProduct}  
						/>: 
						<div className="col-md-12 text-center">
							ไม่มีสินค้า
					 	</div> 
					}
				</div>
				<Footer />
			</div>
		);
	}
}

function mapStateToProps({products}){
	return { products };
}  

export default withRouter(connect(mapStateToProps, { productsFetch, productDelete })(Product));
