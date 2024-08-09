import { PrismaClient } from '@prisma/client'
import prisma from './prisma'

type TransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

export class TransactionManager {
  static async runInTransaction<T>(
    callback: (prisma: TransactionClient) => Promise<T>
  ): Promise<T> {
    return prisma.$transaction(callback)
  }
}