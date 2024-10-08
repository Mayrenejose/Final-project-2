function session (req, res, next) {
    if( req.session?.user ) {
        return res.redirect('/products')
    }

    return next()
}

export default session