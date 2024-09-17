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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let PostService = class PostService {
    constructor(prisma, cloudinaryService) {
        this.prisma = prisma;
        this.cloudinaryService = cloudinaryService;
    }
    async getAll() {
        try {
            const posts = await this.prisma.post.findMany({
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    body: true,
                    image: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                    comments: {
                        select: {
                            id: true,
                            body: true,
                            createdAt: true,
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true,
                                },
                            },
                        },
                    },
                },
            });
            return posts;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async createPost(createPostDto, userId, image) {
        try {
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
            const newPost = { ...createPostDto, image: uploadImageUrl, userId };
            await this.prisma.post.create({ data: newPost });
            return newPost;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async deletePost(postId, userId) {
        try {
            const post = await this.prisma.post.findUnique({ where: { id: postId } });
            if (!post) {
                throw new common_1.BadRequestException('Post not found');
            }
            if (post.userId !== userId) {
                throw new common_1.BadRequestException("You don't have permission to delete this post");
            }
            return await this.prisma.post.delete({ where: { id: postId } });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], PostService);
//# sourceMappingURL=post.service.js.map