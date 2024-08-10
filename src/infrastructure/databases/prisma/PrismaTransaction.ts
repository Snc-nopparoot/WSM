import { PrismaClient } from "@prisma/client";
import { DatabaseTransaction } from "@domain/services/DatabaseTransaction";

export class PrismaTransaction implements DatabaseTransaction {
    constructor(private prisma: PrismaClient) {}

    async commit(): Promise<void> {
        await this.prisma.$commit();
    }

    async rollback(): Promise<void> {
       await this.prisma.$rollback();
    }
}