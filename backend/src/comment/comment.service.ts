import { BadRequestException, Injectable } from '@nestjs/common';
import { AddCommentDto } from './dto/add-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async addComment(addCommentDto: AddCommentDto, userId: string) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id: addCommentDto.postId },
      });

      if (!post) {
        throw new BadRequestException('Post not found');
      }
      const newComment = { ...addCommentDto, userId };

      return await this.prisma.comment.create({ data: newComment });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
