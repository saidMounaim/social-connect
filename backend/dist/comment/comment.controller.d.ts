import { AddCommentDto } from './dto/add-comment.dto';
import { CommentService } from './comment.service';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    addComment(addCommentDto: AddCommentDto, req: any): Promise<{
        id: string;
        body: string;
        userId: string;
        postId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteComment(commentId: string, req: any): Promise<{
        id: string;
        body: string;
        userId: string;
        postId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
