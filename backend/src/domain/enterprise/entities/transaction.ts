import { Amount } from '../value-objects/amount';
import { randomUUID } from 'crypto';

export type TransactionType = 'CREDIT' | 'DEBIT';

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface TransactionProps {
    walletId: string;
    tenantId: string;
    amount: Amount;
    type: TransactionType;
    status: TransactionStatus;
    description: string;
    createdAt: Date;
}

export class Transaction {
    private _id: string;
    private props: TransactionProps;

    constructor(props: TransactionProps, id?: string) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
        };
    }

    public get id(): string { return this._id; }
    public get walletId(): string { return this.props.walletId; }
    public get tenantId(): string { return this.props.tenantId; }
    public get amount(): Amount { return this.props.amount; }
    public get type(): TransactionType { return this.props.type; }
    public get status(): TransactionStatus { return this.props.status; }
    public get description(): string { return this.props.description; }
    public get createdAt(): Date { return this.props.createdAt; }

    public complete(): void {
        if(this.props.status !== 'PENDING') {
            throw new Error(`Não é possivel completar uma transação que está com o status: ${this.props.status}`)
        }
        this.props.status = 'COMPLETED';
    }

    public fail(): void {
        if(this.props.status !== 'PENDING') {
            throw new Error('Apenas transações pendentes podem ser marcadas como falhas.');
        }
        this.props.status = 'FAILED';
    }
}