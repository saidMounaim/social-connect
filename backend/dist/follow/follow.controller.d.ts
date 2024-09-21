import { FollowService } from './follow.service';
export declare class FollowController {
    private followService;
    constructor(followService: FollowService);
    followUser(userFollow: {
        followerId: string;
        followingId: string;
    }, req: any): Promise<{
        id: string;
        followerId: string;
        followingId: string;
        createdAt: Date;
    }>;
    unfollowUser(userUnfollow: {
        followerId: string;
        followingId: string;
    }, req: any): Promise<{
        id: string;
        followerId: string;
        followingId: string;
        createdAt: Date;
    }>;
}
