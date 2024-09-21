import { PrismaService } from 'src/prisma/prisma.service';
export declare class FollowService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    followUser(userFollowData: {
        followerId: string;
        followingId: string;
    }): Promise<{
        id: string;
        followerId: string;
        followingId: string;
        createdAt: Date;
    }>;
    unfollowUser(userUnfollowData: {
        followerId: string;
        followingId: string;
    }): Promise<{
        id: string;
        followerId: string;
        followingId: string;
        createdAt: Date;
    }>;
}
