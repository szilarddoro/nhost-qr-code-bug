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
    const locationId = req.query.locationId;
    const address = req.query.address;
    const description = req.query.description;
    const width = req.query.width || 400;

    const content = JSON.stringify({
      locationId,
      address,
      description,
    });

    // await QRCode.toFileStream(res, content, {
    //   type: "png",
    //   width: typeof width === "string" ? parseInt(width, 2) || 400 : 400,
    //   errorCorrectionLevel: "H",
    // });

    // const buffer = await QRCode.toBuffer(content, {
    //   type: "png",
    //   width: typeof width === "string" ? parseInt(width, 2) || 400 : 400,
    //   errorCorrectionLevel: "H",
    // });
    const dataUrl = await QRCode.toDataURL(content, {
      type: "image/png",
      width: typeof width === "string" ? parseInt(width, 2) || 400 : 400,
      errorCorrectionLevel: "H",
    });

    console.log(dataUrl);

    const dataUrlBuffer = Buffer.from(dataUrl.split(",")[1], "base64");

    console.log(dataUrlBuffer);

    const finalResponse = res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": dataUrlBuffer.length,
      "Content-Disposition": "attachment;filename=qr.png",
    });

    finalResponse.end(dataUrlBuffer);

    // res.send(dataUrl);
  } catch (err) {
    console.error("Failed to return content", err);
  }
};
