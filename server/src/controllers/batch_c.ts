import {JsonController, Get, NotFoundError, Param, BadRequestError, Post, HttpCode, Body} from 'routing-controllers'
import Batch from '../entities/Batch_e';

@JsonController()
export default class BatchController {

    @Get('/batches')
    async getAllBatches()
    {
      const allBatches = await Batch.find()
      if (!allBatches) throw new NotFoundError("Uh-oh... I can't find a batch table! Find me in server/src/controllers/batch_c.ts")
      return { allBatches }
    }

    @Get('/batches/:id')
    async getBatchById(
      @Param('id') id: number
      ) {
      const batch = await Batch.findOne(id)
      if (!batch) {
        throw new BadRequestError(`Sorry, I can't find a batch with that ID. Please make sure the ID is correct, or GET without an ID to retrieve a list of all batches. You can find me in the batches controller`)
      } else {
        return { batch }
      }
    }

    @Post('/batches')
    @HttpCode(201)
    async createBatch(
      @Body() newBatch: Batch
    ) {
      const batchEntity = Batch.create(newBatch)
      return batchEntity.save()
    }

}