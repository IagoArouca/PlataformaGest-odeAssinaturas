import { CreateWalletUseCase } from './create-wallet';
import { InMemoryWalletsRepository } from '../../../../test/repositories/in-memory-wallets-repository';

describe('Caso de Uso - Criar Carteira (wallet)',() => {
    let inMemoryWalletsRepository: InMemoryWalletsRepository;
    let sut: CreateWalletUseCase;

    beforeEach(() => {
        inMemoryWalletsRepository = new InMemoryWalletsRepository();
        sut = new CreateWalletUseCase(inMemoryWalletsRepository);
    });

    it('deve ser capaz de criar uma nova carteira financeira com saldo zerado', async () => {
        const { wallet } = await sut.execute({
            tenantId: 'empresa-cliente-xyz',
            currency: 'BRL',
        });

        expect(wallet.id).toBeDefined();
        expect(wallet.tenantId).toEqual('empresa-cliente-xyz');
        expect(wallet.balance.valueInCents).toEqual(0);
        expect(wallet.currency).toEqual('BRL');

        expect(inMemoryWalletsRepository.items).toHaveLength(1);
        expect(inMemoryWalletsRepository.items[0]).toEqual(wallet);
    });

    it('deve ser capaz de criar uma carteira informando um saldo inicial customizado', async () => {
        const { wallet } = await sut.execute({
            tenantId: 'empresa-premium',
            currency: 'USD',
            initialBalanceInCents: 150050,
        });

        expect(wallet.balance.valueInCents).toEqual(150050);
        expect(wallet.balance.valueInFloat).toEqual(1500.50);
    });
});