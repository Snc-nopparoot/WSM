export interface DatabaseTransaction {
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

export interface DatabaseTransactionManager {
  startTransaction(): Promise<DatabaseTransaction>;
}
