import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
export declare class AuthService {
    private readonly prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(email: string, password: string): Promise<{
        id: string;
        name: string;
        email: string;
        image: string;
        access_token: string;
    }>;
    register(registerUserDto: RegisterUserDto): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
}
