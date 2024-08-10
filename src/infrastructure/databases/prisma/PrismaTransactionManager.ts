import { PrismaClient } from "@prisma/client";
import { DatabaseTransaction, DatabaseTransactionManager } from "@domain/services/DatabaseTransaction";
import { PrismaTransaction } from "./PrismaTransaction";

export class PrismaTransactionManager implements DatabaseTransactionManager {
    constructor(
        private prisma: PrismaClient
    ){}
    async startTransaction(): Promise<DatabaseTransaction> {
       await this.prisma.$begin();
       return new PrismaTransaction(this.prisma);
    }
}