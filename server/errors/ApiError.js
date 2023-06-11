
class ApiError extends Error {
    status
    errors

    constructor(status, messsage, errors = []) {
        super(messsage)
        this.status = status
        this.errors = errors
    }

    static Unauthorized() {
        return new ApiError(401, 'Unauthorized')
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }

    static Forbidden(message, errors = []) {
        return new ApiError(403, message, errors)
    }

    static NoContent(message, errors = []) {
        return new ApiError(204, message, errors)
    }
}

module.exports = ApiError