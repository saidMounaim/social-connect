import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { EditProfileDto } from './dto/edit-profile.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async login(userLogin: { email: string; password: string }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: userLogin.email },
      });

      if (!user) {
        throw new BadRequestException('User not found');
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

  async editProfile(
    editProfileDto: EditProfileDto,
    image: Express.Multer.File,
    userId: string,
  ) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    let uploadImageUrl: string;

    if (image) {
      try {
        const uploadResult = await this.cloudinaryService.uploadImage(image);
        uploadImageUrl = uploadResult.url;
      } catch (error) {
        throw new BadRequestException(error);
      }
    }

    const updateProfile = { ...editProfileDto, image: uploadImageUrl };
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: updateProfile,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });
  }
}
