import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class FollowController {
  constructor(private followService: FollowService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/follow')
  followUser(
    @Body() userFollow: { followerId: string; followingId: string },
    @Req() req: any,
  ) {
    const userId = req.user.id;
    userFollow = { ...userFollow, followerId: userId };
    return this.followService.followUser(userFollow);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/unfollow')
  unfollowUser(
    @Body() userUnfollow: { followerId: string; followingId: string },
    @Req() req: any,
  ) {
    const userId = req.user.id;
    userUnfollow = { ...userUnfollow, followerId: userId };
    return this.followService.unfollowUser(userUnfollow);
  }
}
