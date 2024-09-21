import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserById(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        image: string;
        posts: {
            id: string;
            body: string;
            image: string | null;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        following: {
            id: string;
            followerId: string;
        }[];
        followers: {
            id: string;
            followingId: string;
        }[];
    }>;
    getPostsByUserId(userId: string): Promise<{
        user: {
            id: string;
            name: string;
            image: string;
        };
        id: string;
        image: string;
        createdAt: Date;
        comments: {
            user: {
                id: string;
                name: string;
                image: string;
            };
            id: string;
            createdAt: Date;
            body: string;
        }[];
        likes: {
            id: string;
            userId: string;
            postId: string;
        }[];
        body: string;
    }[]>;
}
