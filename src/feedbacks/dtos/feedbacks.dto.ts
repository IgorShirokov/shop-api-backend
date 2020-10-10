import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class FeedbackDto {
  @ApiProperty()
  public readonly product!: string;
  @Min(0)
  @Max(5)
  @ApiProperty()
  public readonly rate!: number;
  @ApiPropertyOptional()
  public readonly advantages?: string;
}
