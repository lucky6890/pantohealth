import { IsNumber, IsString } from 'class-validator';

export class CreateSignalDto {
  @IsString()
  deviceId: string;

  @IsString()
  time: string;

  @IsNumber()
  dataLength: number;

  @IsString()
  dataVolume: string;
}
