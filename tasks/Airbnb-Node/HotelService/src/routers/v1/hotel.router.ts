import express from 'express';
import { createHotelHandler,  getAllHotelsHandler, getHotelByIdHandler, updateHotelByIdHandler, deleteHotelByIdHandler } from '../../controllers/hotel.controller';
import { validateRequestBody, validateRequestParams } from '../../validators';
import { hotelSchema, hotelIdParamSchema } from '../../validators/hotel.validator';

const hotelRouter = express.Router();

hotelRouter.post('/', validateRequestBody(hotelSchema),createHotelHandler);
hotelRouter.get('/:id', validateRequestParams(hotelIdParamSchema), getHotelByIdHandler); 
hotelRouter.get('/', getAllHotelsHandler); 
hotelRouter.put('/:id', validateRequestParams(hotelIdParamSchema), validateRequestBody(hotelSchema), updateHotelByIdHandler); 
hotelRouter.delete('/:id', validateRequestParams(hotelIdParamSchema), deleteHotelByIdHandler); 

export default hotelRouter;