function handleRouteError(err, res) {
    console.log(err);
    if (err.code === 11000) {
        //duplicate entry error
        return res.json({
            error: 403,
            message: 'a user with that email already exists'
        });
    }
    
    let messages = [];

    for (let prop in err.errors) {
        messages.push(err.errors[prop].message)
    }

    res.json({
        error: 403,
        messages
    });
}

module.exports = {
    handleRouteError
}