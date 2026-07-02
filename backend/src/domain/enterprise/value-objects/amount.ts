export class Amount {

    private readonly cents: number;

    private constructor(cents: number) {
        if(!Number.isInteger(cents)) {
            throw new Error('O valor monetário precisa ser fornecido estritamente em centavos inteiros. ');
        }

        if(cents < 0) {
            throw new Error('O valor monetário não pode ser negativo. ');
        }
        this.cents = cents;
    }

    public static fromCents(cents: number): Amount {
        return new Amount(cents);
    }

    public static fromFloat(value: number): Amount {
        const cents = Math.round(value * 100);
        return new Amount(cents);
    }

    public get valueInCents(): number {
        return this.cents;
    }

    public get valueInFloat(): number {
        return this.cents / 100;
    }

    public add(other: Amount): Amount {
        return new Amount(this.cents + other.valueInCents);
    }

    public subtract(other: Amount): Amount {
        const result = this.cents - other.valueInCents;
        if(result < 0) {
            throw new Error('Saldo insuficiente para realizar essa operação de subtração. ');
        }
        return new Amount(result);
    }
}