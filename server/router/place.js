const { Router } = require('express')
const placeRouter = Router()
const PlaceController = require('../controllers/place/PlaceController')
const verifyJwt = require('../middlewares/verifyJwt')

placeRouter.get('/places/one/:id', PlaceController.getOnePlaceById)
placeRouter.get('/places/all', verifyJwt, PlaceController.getAllPlaces)
placeRouter.post('/places/create', PlaceController.createPlace)

module.exports = placeRouter