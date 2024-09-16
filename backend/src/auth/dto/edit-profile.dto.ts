import { IsNotEmpty, IsString } from 'class-validator';

export class EditProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  image?: Express.Multer.File;
}
