import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private prismaService: PrismaService) {}

  async createUser(user: CreateUserDto) {
    try {
      const hashedPassword = await argon.hash(user.password);
      const uuid = randomUUID();

      return await this.prismaService.user.create({
        data: {
          uuid,
          username: user.username,
          email: user.email,
          nickname: user.nickname,
          passwordHash: hashedPassword // Note: schema uses passwordHash
        },
        select: {
          id: true,
          uuid: true,
          username: true,
          nickname: true,
          email: true,
          createdAt: true
        }
      });
    } catch (error: any) {
      this.logger.error('Failed to create user:', {
        error: error.message,
        username: user.username,
        email: user.email
      });
      throw error;
    }
  }

  async getUserByUUId(uuid: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { uuid },
        select: {
          id: true,
          uuid: true,
          username: true,
          nickname: true,
          email: true,
          createdAt: true
        }
      });
    } catch (error: any) {
      this.logger.error('Failed to get user by UUID:', {
        error: error.message,
        uuid
      });
      throw error;
    }
  }

  async getUserById(id: number) {
    try {
      return await this.prismaService.user.findUnique({
        where: { id },
        select: {
          id: true,
          uuid: true,
          username: true,
          nickname: true,
          email: true,
          createdAt: true
        }
      });
    } catch (error: any) {
      this.logger.error('Failed to get user by id:', {
        error: error.message,
        id
      });
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.prismaService.user.findUnique({ where: { email } });
    } catch (error: any) {
      this.logger.error('Failed to get user by email:', {
        error: error.message,
        email
      });
      throw error;
    }
  }

  async getUserByUsername(username: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { username },
        select: {
          id: true,
          uuid: true,
          username: true,
          nickname: true,
          email: true,
          createdAt: true,
          passwordHash: true
        }
      });
    } catch (error: any) {
      this.logger.error('Failed to get user by username:', {
        error: error.message,
        username
      });
      throw error;
    }
  }

  async updateUser(id: number, updateData: Partial<UpdateUserDto>) {
    try {
      // Map DTO to schema fields
      const dataToUpdate: any = { ...updateData };

      if (updateData.password) {
        dataToUpdate.passwordHash = await argon.hash(updateData.password);
        delete dataToUpdate.password; // Remove password, keep passwordHash
      }

      return await this.prismaService.user.update({
        where: { id },
        data: dataToUpdate,
        select: {
          id: true,
          uuid: true,
          username: true,
          nickname: true,
          email: true,
          createdAt: true
        }
      });
    } catch (error: any) {
      this.logger.error('Failed to update user:', {
        error: error.message,
        id,
        updateFields: Object.keys(updateData)
      });
      throw error;
    }
  }
}
