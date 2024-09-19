import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('')
  getAll() {
    return this.postService.getAll();
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
        ],
        fileIsRequired: false,
      }),
    )
    image: Express.Multer.File,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.postService.createPost(createPostDto, userId, image);
  }

  @Delete('/:postId')
  @UseGuards(JwtAuthGuard)
  deletePost(@Param('postId') postId: string, @Req() req: any) {
    const userId = req.user.id;
    return this.postService.deletePost(postId, userId);
  }

  @Post('/like')
  @UseGuards(JwtAuthGuard)
  likePost(
    @Body() likeData: { postId: string; userId: string },
    @Req() req: any,
  ) {
    const userId = req.user.id;
    likeData = { ...likeData, userId };
    return this.postService.likePost(likeData);
  }
}
