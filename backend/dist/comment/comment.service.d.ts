import { AddCommentDto } from './dto/add-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class CommentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    addComment(addCommentDto: AddCommentDto, userId: string): Promise<{
        id: string;
        body: string;
        userId: string;
        postId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
