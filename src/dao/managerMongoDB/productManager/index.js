import productModel from '../../models/product.models.js'

class ProductManager {

    getAllProducts = async (search, options) => {return await productModel.paginate(search, options) }
    
    getProductById = async pid => {return await productModel.findOne({_id: pid})}

    addProduct = async body => {return await productModel.create(body)}

    updateProduct = async (id, fieldUpdate) => {return await productModel.updateOne({_id: id}, fieldUpdate) }

    deleteProduct = async (id) => {return await productModel.deleteOne({_id: id})}
}

export default ProductManager