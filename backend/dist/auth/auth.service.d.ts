import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { EditProfileDto } from './dto/edit-profile.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class AuthService {
    private readonly prisma;
    private jwtService;
    private cloudinaryService;
    constructor(prisma: PrismaService, jwtService: JwtService, cloudinaryService: CloudinaryService);
    login(userLogin: {
        email: string;
        password: string;
    }): Promise<{
        id: string;
        name: string;
        email: string;
        image: string;
        access_token: string;
    }>;
    register(registerUserDto: RegisterUserDto): Promise<{
        name: string;
        email: string;
        id: string;
    }>;
    editProfile(editProfileDto: EditProfileDto, image: Express.Multer.File, userId: string): Promise<{
        name: string;
        email: string;
        id: string;
        image: string;
    }>;
}
