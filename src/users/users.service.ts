import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(params: { id: number }): Promise<User> {
    const { id } = params;
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });
    
    return await this.prisma.user.update({
      data: { profileViews: user.profileViews + 1 },
      where: { id }
    })
  }

  async update(params: { where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput }): Promise<User> {
    const { data, where } = params;

    return await this.prisma.user.update({
      data,
      where,
    });
  }

  remove(params: { where: Prisma.UserWhereUniqueInput }) {
    const { where } = params;
    
    return ;
  }
}
