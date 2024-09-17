import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async createPost(
    createPostDto: CreatePostDto,
    userId: string,
    image?: Express.Multer.File,
  ) {
    try {
      let uploadImageUrl: string;
      if (image) {
        try {
          const uploadResult = await this.cloudinaryService.uploadImage(image);
          uploadImageUrl = uploadResult.url;
        } catch (error) {
          throw new BadRequestException(error);
        }
      }

      const newPost = { ...createPostDto, image: uploadImageUrl, userId };

      await this.prisma.post.create({ data: newPost });

      return newPost;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
