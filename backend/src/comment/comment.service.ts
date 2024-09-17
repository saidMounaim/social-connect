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

  async deleteComment(commentId: string, userId: string) {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: { id: commentId },
      });

      if (!comment) {
        throw new BadRequestException('Comment not found');
      }

      if (comment.userId !== userId) {
        throw new BadRequestException(
          "You don't have permission to delete this comment",
        );
      }

      return await this.prisma.comment.delete({ where: { id: commentId } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
