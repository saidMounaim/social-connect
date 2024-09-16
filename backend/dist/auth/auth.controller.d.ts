import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
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
}
