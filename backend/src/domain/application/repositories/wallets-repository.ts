import { Wallet } from '../../enterprise/entities/wallet';

export interface WalletsRepository {
    create(wallet: Wallet): Promise<void>;
    findById(id: string): Promise<Wallet | null>;
    findByTenantId(tenantId: string): Promise<Wallet[]>;
    save(wallet: Wallet): Promise<void>;
}