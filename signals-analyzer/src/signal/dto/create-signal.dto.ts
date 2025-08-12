import { IsString } from 'class-validator';

export class CreateSignalDto {
  @IsString()
  deviceId: string;

  @IsString()
  time: string;

  @IsString()
  dataLength: string;

  @IsString()
  dataVolume: string;
}
