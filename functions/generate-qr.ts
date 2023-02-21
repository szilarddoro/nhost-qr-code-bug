import { Request, Response } from "express";
import QRCode from "qrcode";

/**
 * Generates QR code to be put in a Location.
 *
 * Query parameters:
 *  - locationId: ID of the location - required
 *  - address: address of location to be included in the code - optional
 *  - description: any free description - optional
 *  - width: width of the generated image, defaults to 400px
 *
 * @param req
 * @param res
 */
export default async (req: Request, res: Response) => {
  try {
    res.setHeader("Content-Type", "image/png");
    const locationId = req.query.locationId;
    const address = req.query.address;
    const description = req.query.description;
    const width = req.query.width || 400;

    const content = JSON.stringify({
      locationId,
      address,
      description,
    });

    QRCode.toFileStream(
      res,
      content,
      {
        type: "png",
        width: typeof width === "string" ? parseInt(width, 2) || 400 : 400,
        errorCorrectionLevel: "H",
      },
      (error) => {
        if (error) {
          console.error("Failed to return content", error);

          res.send(error);
        }

        res.end();
      }
    );
  } catch (err) {
    console.error("Failed to return content", err);
  }
};
