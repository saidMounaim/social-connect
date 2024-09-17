import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    getAll(): Promise<{
        id: string;
        body: string;
        image: string;
        createdAt: Date;
        user: {
            id: string;
            image: string;
            name: string;
        };
        comments: {
            id: string;
            body: string;
            createdAt: Date;
            user: {
                id: string;
                image: string;
                name: string;
            };
        }[];
    }[]>;
    createPost(createPostDto: CreatePostDto, image: Express.Multer.File, req: any): Promise<{
        image: string;
        userId: string;
        body: string;
    }>;
    deletePost(postId: string, req: any): Promise<{
        id: string;
        body: string;
        image: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
