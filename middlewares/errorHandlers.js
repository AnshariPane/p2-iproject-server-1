module.exports = function (error, req, res, next) {
    let code = error.code || 500;
    let message = "Internal server error";

    console.log(error.name);

    if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((e) => {
            return e.message;
        });
        code = 400;
        message = errors;
    } else if (error.name === "SequelizeUniqueConstraintError") {
        const errors = error.errors.map((el) => {
            return el.message;
        });
        if (errors[0] === "email must be unique") {
            message = "Email already exists";
        } else if (errors[0] === "username must be unique") {
            message = "Username already exists"
        } else {
            message = errors;
        } 
        code = 400;
    } else if (error.name === "Unauthorized") {
        code = 401
        message = "Unauthorized"
    } else if (error.name === "not found") {
        code = 404
        message = "Data not found"
    } else if (error.name === "Invalid login") {
        code = 401
        message = "Email/Password is wrong"
    }

    res.status(code).json({ message });
};
