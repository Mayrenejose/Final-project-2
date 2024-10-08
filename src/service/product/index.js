export default class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }

    getAllProducts = async(
        limit, 
        page,
        query,
        previousPage,
        currentUrl,
        sortBy,
        category
    ) => {
        try{   
            let search = {}
            
            if (query) {
                search.$or = [
                    { title: { $regex: new RegExp(query, 'i') } }                    
                ]
            }

            if(category) {
                search.$or = [
                    { category: { $regex: new RegExp(category, 'i') } }
                ]
            }
            
            const sortOptions = sortBy === 'asc' ? { price: 1 } : sortBy === 'desc' ? { price: -1 } : {}
            
            const options = {
                page: page,
                limit: limit,
                sort: sortOptions,
                lean: true
            }
            
            const getProducts = await this.dao.getAllProducts(search, options)

            const nextURL = `${currentUrl}/products?limit=${limit}&page=${page + 1}&query=${query}&sort=${sortBy}`       
            getProducts.payload = getProducts.docs
            delete getProducts.docs
            getProducts.query = query
            getProducts.status = 'success'
            getProducts.prevLink = getProducts.hasPrevPage ? previousPage  : null
            getProducts.nextLink = getProducts.hasNextPage ? nextURL : null

            return getProducts
        } catch (error) {
            return console.log(error)
        }
    }

    addProduct = async body => {return this.dao.addProduct(body)}

    getProductById = async pid => {return this.dao.getProductById(pid)}

    updateProduct = async (id, fieldUpdate) => {
        if (!fieldUpdate || !id) return console.log('empty field')
        return this.dao.updateProduct(id, fieldUpdate)
    }

    deleteProduct = async id => {
        const deleteProduct = await this.dao.deleteProduct(id)
        
        if ( deleteProduct.deletedCount === 0 ) {
            return 0 
        } else {
            return []
        }
    }
}