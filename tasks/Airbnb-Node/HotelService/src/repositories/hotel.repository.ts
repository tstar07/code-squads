import { Op } from "sequelize";
import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { createHotelDTO, updateHotelDTO } from "../dto/hotel.dto";
import { NotFoundError } from "../utils/errors/app.error";

export async function createHotel(hotelData: createHotelDTO) {
    const hotel = await Hotel.create({
        name: hotelData.name,
        address: hotelData.address,
        location: hotelData.location,
        rating: hotelData.rating,
        ratingCount: hotelData.ratingCount
    });

    logger.info(`Hotel created: ${hotel.id}`);

    return hotel;
}

export async function getHotelById(id: number) {
    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
        logger.error(`Hotel not found: ${id}`);
        throw new NotFoundError(`Hotel with id ${id} not found`);
    }

    logger.info(`Hotel found: ${hotel.id}`);

    return hotel;
}

export async function getAllHotels() {
    const hotels = await Hotel.findAll({
      where: {
        deletedAt: {
          [Op.is]: null as any
        }
      }
    });
  
    if (!hotels || hotels.length === 0) {
      logger.error(`No Hotels data found`);
      throw new NotFoundError(`No Hotels data found`);
    }
  
    return hotels;
  }

export async function updateHotelById(id: number, hotelData: updateHotelDTO) {
    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
        logger.error(`Hotel not found: ID ${id}`);
        throw new NotFoundError(`Hotel not found: ID ${id}`);
    }

    await hotel.update(hotelData);

    logger.info(`Hotel updated:ID ${hotel.id}`);
    return hotel;
}

// export async function deleteHotelById(id: number) {
//     const deletedCount = await Hotel.destroy({
//         where: { id }
//       });

//     if (deletedCount === 0) {
//         logger.error(`Failed to delete Hotel: ID ${id} not found`);
//         throw new NotFoundError(`Failed to delete Hotel ${id} not found`);
//     }

//     logger.info(`Hotel deleted successfully: ID ${id}`);

//     return true;
// }

export async function softDeleteHotelById(id: number) {
    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
        logger.error(`Hotel not found: ID ${id}`);
        throw new NotFoundError(`Hotel not found: ID ${id}`);
    }

    hotel.deletedAt = new Date();
    await hotel.save(); //save the changs to db

    logger.info(`Hotel deleted successfully: ID ${id}`);

    return true;
}