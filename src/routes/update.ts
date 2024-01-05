import express, { Request, Response } from 'express';
import { Restock } from '../models/restock';
import { sendNotification } from '../messaging/notification';

//import { body, validationResult } from 'express-validator';
//import { Inventory } from '../models/inventory';
//import { RequestValidationError } from '../errors/request-validation-errors';

const router = express.Router();

router.put(
    '/api/restock/:id/updatestock',
    async (req: Request, res: Response) => {
      const { id } = req.params;
      //const errors = validationResult(req);

      /*if (!errors.isEmpty()) {
          console.log(errors.array())
          //throw new RequestValidationError(errors.array());
      }*/

      const restock = await Restock.findById({ _id: id });

      const newMessage = {
        companyId: restock?.companyId,
        inventoryId: restock?.inventoryId,
        quanity: restock?.reorderQuanity
      }

      sendNotification(newMessage);

      res.status(201).send(restock);
    }
);

export { router as updateRouter }