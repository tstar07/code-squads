import { createHotelDTO, updateHotelDTO } from "../dto/hotel.dto";
import { createHotel, getHotelById, getAllHotels, updateHotelById, softDeleteHotelById } from "../repositories/hotel.repository";

export async function createHotelService(hotelData: createHotelDTO) {
    const hotel = await createHotel(hotelData);
    return hotel;
}

export async function getHotelByIdService(id: number) {
    const hotel = await getHotelById(id);
    return hotel;
}

export async function getAllHotelsService() {
    const hotels = await getAllHotels();
    return hotels;
}

export async function updateHotelByIdService(id: number, hotelData: updateHotelDTO) {
    const hotel = await updateHotelById(id, hotelData);
    return hotel;
}

export async function deleteHotelByIdService(id: number) {
    const hotel = await softDeleteHotelById(id);
    return hotel;
}


// export async function deleteHotelByIdService(id: number) {
//     const hotel = await softDeleteHotelById(id);
//     return hotel;
// }