import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  establishment?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  sector?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  studyLevel?: string;
}
