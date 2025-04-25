import { Request, Response, NextFunction } from "express";
import { createHotelService, getHotelByIdService, getAllHotelsService, updateHotelByIdService, deleteHotelByIdService } from "../services/hotel.service";
import { StatusCodes } from "http-status-codes";

export async function createHotelHandler(req: Request, res: Response, next: NextFunction) {
    // 1. Call the service layer

    const hotelResponse = await createHotelService(req.body);

    // 2. Send the response

    res.status(StatusCodes.CREATED).json({
        message: "Hotel created successfully",
        data: hotelResponse,
        success: true,
    })
}

export async function getHotelByIdHandler(req: Request, res: Response, next: NextFunction) {
    // 1. Call the service layer

    const hotelResponse = await getHotelByIdService(Number(req.params.id));

    // 2. Send the response

    res.status(StatusCodes.OK).json({
        message: "Hotel found successfully",
        data: hotelResponse,
        success: true,
    })
}

export async function getAllHotelsHandler(req: Request, res: Response, next: NextFunction) {
    
    const hotelsResponse = await getAllHotelsService();

    res.status(StatusCodes.OK).json({
        message: "Hotels found successfully",
        data: hotelsResponse,
        success: true,
    });

}

// export async function deleteHotelByIdHandler(req: Request, res: Response, next: NextFunction) {

//     //await deleteHotelByIdService(Number(req.params.id));
//     await deleteHotelByIdService(Number(req.params.id));

//     res.status(200).json({
//         message: "Hotel deleted successfully",
//         success: true
//     });
    
// }

export async function deleteHotelByIdHandler(req: Request, res: Response, next: NextFunction) {
    
    await deleteHotelByIdService(Number(req.params.id));

    res.status(StatusCodes.OK).json({
        message: "Hotel soft deleted successfully",
        success: true
    });
    
}

export async function updateHotelByIdHandler(req: Request, res: Response, next: NextFunction) {

    const updatedHotelResponse = await updateHotelByIdService(Number(req.params.id), req.body);   

    res.status(StatusCodes.OK).json({
        message: "Hotel updated successfully",
        data: updatedHotelResponse,
        success: true,
    });
    
}