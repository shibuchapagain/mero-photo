import { Param } from '@nestjs/common';
import { ParseObjectIdPipe } from '../../pipelines/parse-objectId.pipe';

/**
 * Usage: @MongoIdParam('id') id: string
 */
export const MongoIdParam = (paramName = 'id') => Param(paramName, ParseObjectIdPipe);
