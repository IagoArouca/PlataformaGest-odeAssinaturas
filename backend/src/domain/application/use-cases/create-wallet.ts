import { Wallet } from '../../enterprise/entities/wallet';
import { Amount } from '../../enterprise/value-objects/amount';
import { WalletsRepository } from '../repositories/wallets-repository';

interface CreateWalletUseCaseRequest {
    tenantId: string;
    currency: string;
    initialBalanceInCents?: number;
}

interface CreateWalletUseCaseResponse {
    wallet: Wallet;
}

export class CreateWalletUseCase {
    constructor(private walletsRepository: WalletsRepository) {}

    async execute({
        tenantId,
        currency,
        initialBalanceInCents = 0,
    }: CreateWalletUseCaseRequest): Promise<CreateWalletUseCaseResponse> {

        const balance = Amount.fromCents(initialBalanceInCents);

        const wallet = new Wallet({
            tenantId,
            currency: currency.toUpperCase(),
            balance,
            createdAt: new Date(),
        });

        await this.walletsRepository.create(wallet);

        return {
            wallet,
        };
    }
}

