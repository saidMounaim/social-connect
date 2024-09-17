import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class PostService {
    private readonly prisma;
    private cloudinaryService;
    constructor(prisma: PrismaService, cloudinaryService: CloudinaryService);
    createPost(createPostDto: CreatePostDto, userId: string, image?: Express.Multer.File): Promise<{
        image: string;
        userId: string;
        body: string;
    }>;
}
