"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService, cloudinaryService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.cloudinaryService = cloudinaryService;
    }
    async login(userLogin) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email: userLogin.email },
            });
            if (!user) {
                throw new common_1.BadRequestException('User not found');
            }
            if (userLogin.password &&
                !bcrypt.compareSync(userLogin.password, user.password)) {
                throw new common_1.BadRequestException('Email or password invalid');
            }
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                access_token: this.jwtService.sign({ userId: user.id }),
            };
        }
        catch (error) {
            throw new common_1.BadGatewayException(error);
        }
    }
    async register(registerUserDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: registerUserDto.email },
        });
        if (user) {
            throw new common_1.BadRequestException('User already exist');
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
    async editProfile(editProfileDto, image, userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        let uploadImageUrl;
        if (image) {
            try {
                const uploadResult = await this.cloudinaryService.uploadImage(image);
                uploadImageUrl = uploadResult.url;
            }
            catch (error) {
                throw new common_1.BadRequestException(error);
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        cloudinary_service_1.CloudinaryService])
], AuthService);
//# sourceMappingURL=auth.service.js.map