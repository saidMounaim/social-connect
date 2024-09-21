import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class PostService {
    private readonly prisma;
    private cloudinaryService;
    constructor(prisma: PrismaService, cloudinaryService: CloudinaryService);
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
    createPost(createPostDto: CreatePostDto, userId: string, image?: Express.Multer.File): Promise<{
        image: string;
        userId: string;
        body: string;
    }>;
    deletePost(postId: string, userId: string): Promise<{
        id: string;
        body: string;
        image: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    likePost(likeData: {
        userId: string;
        postId: string;
    }): Promise<{
        id: string;
        userId: string;
        postId: string;
        createdAt: Date;
    }>;
}
