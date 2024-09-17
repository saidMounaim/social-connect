import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate(payload: {
        userId: string;
    }): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        image: string | null;
        isAdmin: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
