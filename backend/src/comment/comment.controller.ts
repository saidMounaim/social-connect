import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddCommentDto } from './dto/add-comment.dto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  addComment(@Body() addCommentDto: AddCommentDto, @Req() req: any) {
    const userId = req.user.id;
    return this.commentService.addComment(addCommentDto, userId);
  }
}
