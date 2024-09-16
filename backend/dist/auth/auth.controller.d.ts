import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { EditProfileDto } from './dto/edit-profile.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
        id: string;
        name: string;
        email: string;
    }>;
    editProfile(editProfileDto: EditProfileDto, image: Express.Multer.File, req: any): Promise<{
        id: string;
        name: string;
        email: string;
        image: string;
    }>;
}
