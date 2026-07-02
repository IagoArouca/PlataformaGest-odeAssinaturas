import { Amount } from '../value-objects/amount';
import { randomUUID } from 'crypto';

export interface WalletProps {
    tenantId: string;
    balance: Amount;
    currency: string;
    createdAt: Date;
    updatedAt?: Date;
}

export class Wallet {
    private _id: string;
    private props: WalletProps;

    constructor(props: WalletProps, id?: string) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
        };
    }

    public get id(): string { return this._id; }
    public get tenantId(): string { return this.props.tenantId; }
    public get balance(): Amount { return this.props.balance; }
    public get currency(): string { return this.props.currency; }
    public get createdAt(): Date { return this.props.createdAt; }
    public get updatedAt(): Date | undefined { return this.props.updatedAt; }

    public credit(amount: Amount): void {
        this.props.balance = this.props.balance.add(amount);
        this.touch();
    }

    public debit(amount: Amount): void {
        this.props.balance = this.props.balance.subtract(amount);
        this.touch();
    }

    private touch(): void {
        this.props.updatedAt = new Date();
    }
}