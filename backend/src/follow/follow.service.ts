import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private readonly prisma: PrismaService) {}

  async followUser(userFollowData: {
    followerId: string;
    followingId: string;
  }) {
    try {
      const existingFollow = await this.prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: userFollowData.followerId,
            followingId: userFollowData.followingId,
          },
        },
      });

      if (existingFollow) {
        throw new BadRequestException('You already following this user');
      }

      return await this.prisma.follow.create({
        data: {
          followerId: userFollowData.followerId,
          followingId: userFollowData.followingId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async unfollowUser(userUnfollowData: {
    followerId: string;
    followingId: string;
  }) {
    try {
      const existingFollow = await this.prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: userUnfollowData.followerId,
            followingId: userUnfollowData.followingId,
          },
        },
      });

      if (existingFollow) {
        return await this.prisma.follow.delete({
          where: {
            followerId_followingId: {
              followerId: userUnfollowData.followerId,
              followingId: userUnfollowData.followingId,
            },
          },
        });
      }

      throw new BadRequestException('You already following this user');
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
