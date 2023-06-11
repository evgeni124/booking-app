const PlaceService = require("../../services/place/PlaceService");

class PlaceController {
    async getAllPlaces(req, res, next) {
        try {
            const places = await PlaceService.getAllPlaces()

            return res.json({ places })
        } catch (error) {
            console.log(error)
        }
    }

    async getOnePlaceById(req, res, next) {
        try {
            const { id } = req.params

            const place = await PlaceService.getOnePlace(id)

            return res.json({ place })
        } catch (error) {
            console.log(error);
        }
    }

    async createPlace(req, res, next) {
        try {
            const { title, description, numberGuests, price, images } = req.body;
            const newPlace = {
                title, description, numberGuests, price, images
            }
            const place = await PlaceService.createPlace(newPlace)

            return res.json({ place })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new PlaceController()