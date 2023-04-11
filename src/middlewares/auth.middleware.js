const authMid = (req, res, next) => {
    try{
        if(req.cookies.session_token){
            next()
        }
        else{
            res.status(401).send('Not authenticated')
        }
    }
    catch(error){
        console.log(error)
    }
}

export{
    authMid
}
