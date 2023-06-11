const { Place } = require('../../models/models')

class PlaceService {
    async getAllPlaces() {
        const places = await Place.findAll()
        return places
    }

    async getOnePlace(id) {
        const place = await Place.findOne({ where: { id }})
        return place
    }

    async createPlace(placeData) {
        const { title, description, numberGuests, price, images } = placeData
        // https://www.google.com/search?q=bralanda+sweden&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjK6MKXtJz_AhUVyosKHdo-DagQ_AUoAnoECAEQBA&biw=1920&bih=969&dpr=1#imgrc=DAF9TOh9Y1r7aM
        const place = await Place.create({ title, description, numberGuests, price })

        place.set('images', images)
        
        await place.save()

        return place
    }
}

module.exports = new PlaceService()