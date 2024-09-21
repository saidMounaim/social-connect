import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    getAll(): Promise<{
        user: {
            id: string;
            name: string;
            image: string;
        };
        id: string;
        image: string;
        createdAt: Date;
        comments: {
            user: {
                id: string;
                name: string;
                image: string;
            };
            id: string;
            createdAt: Date;
            body: string;
        }[];
        likes: {
            id: string;
            userId: string;
            postId: string;
        }[];
        body: string;
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
    likePost(likeData: {
        postId: string;
        userId: string;
    }, req: any): Promise<{
        id: string;
        userId: string;
        postId: string;
        createdAt: Date;
    }>;
}
