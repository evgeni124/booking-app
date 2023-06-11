const { validationResult } = require('express-validator')

const validationHandler = (request) => {
    const result = validationResult(request)

    if (!result.isEmpty()) {
        const errors = result.array()

        const arrayWithErrors = errors.map(error => {
            const path = error.path
            const msg = error.msg

            return {[path]: msg}
        })

        return arrayWithErrors
    }
}

module.exports = {
    validationHandler
}