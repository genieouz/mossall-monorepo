import { registerEnumType } from "@nestjs/graphql";

export enum Wallet {
    WAVE = 'wave-sn',
    // ORANGE_MONEY = 'orange-money-sn',
}

registerEnumType(Wallet, { name: 'Wallet', description: "Possible wallets" });
