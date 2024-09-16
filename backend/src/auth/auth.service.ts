import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(userLogin: { email: string; password: string }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: userLogin.email },
      });

      if (!user) {
        throw new BadRequestException('User not found');
        console.log('user', user);
      }

      if (
        userLogin.password &&
        !bcrypt.compareSync(userLogin.password, user.password)
      ) {
        throw new BadRequestException('Email or password invalid');
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        access_token: this.jwtService.sign({ userId: user.id }),
      };
    } catch (error) {
      console.log(error);
      throw new BadGatewayException(error);
    }
  }

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: registerUserDto.email },
    });

    if (user) {
      throw new BadRequestException('User already exist');
    }

    const hashedPassword = bcrypt.hashSync(registerUserDto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        name: registerUserDto.name,
        email: registerUserDto.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return newUser;
  }
}
