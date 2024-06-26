import { IsNotEmpty, IsString } from 'class-validator';

export class ApplyRequest {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}
