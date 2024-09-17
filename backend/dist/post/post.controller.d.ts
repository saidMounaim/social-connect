import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    createPost(createPostDto: CreatePostDto, image: Express.Multer.File, req: any): Promise<{
        image: string;
        userId: string;
        body: string;
    }>;
}
