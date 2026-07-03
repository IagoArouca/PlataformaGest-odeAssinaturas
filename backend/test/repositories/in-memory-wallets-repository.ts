import { Wallet } from '../../src/domain/enterprise/entities/wallet';
import { WalletsRepository } from '../../src/domain/application/repositories/wallets-repository';

export class InMemoryWalletsRepository implements WalletsRepository {
  public items: Wallet[] = [];

  async create(wallet: Wallet): Promise<void> {
    this.items.push(wallet);
  }

  async findById(id: string): Promise<Wallet | null> {
    const wallet = this.items.find(
      (item) => item.id.toString() === id,
    );

    return wallet ?? null;
  }

  async findByTenantId(tenantId: string): Promise<Wallet[]> {
    return this.items.filter(
      (item) => item.tenantId === tenantId,
    );
  }

  async save(wallet: Wallet): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === wallet.id.toString(),
    );

    if (itemIndex >= 0) {
      this.items[itemIndex] = wallet;
    }
  }
}