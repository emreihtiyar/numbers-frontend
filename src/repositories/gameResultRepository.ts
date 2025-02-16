import { prisma } from '@/lib/db/prisma';
import type { PrismaClient } from '@prisma/client';

type GameResult = NonNullable<Awaited<ReturnType<PrismaClient['gameResult']['findUnique']>>>;

export interface PaginatedResults<T> {
  results: T[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

export class GameResultRepository {
  async create(data: Pick<GameResult, 'username' | 'lastNumber' | 'time'>): Promise<GameResult> {
    return prisma.gameResult.create({
      data,
    });
  }

  async findAll(page: number, size: number): Promise<PaginatedResults<GameResult>> {
    const skip = page * size;
    const take = size;

    const [results, total] = await Promise.all([
      prisma.gameResult.findMany({
        skip,
        take,
        orderBy: {
          lastNumber: 'desc',
        },
      }),
      prisma.gameResult.count(),
    ]);

    return {
      results,
      total,
      page,
      size,
      totalPages: Math.ceil(total / size),
    };
  }
} 