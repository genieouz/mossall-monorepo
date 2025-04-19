"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const graphql_1 = require("@nestjs/graphql");
var Wallet;
(function (Wallet) {
    Wallet["WAVE"] = "wave-sn";
    Wallet["ORANGE_MONEY"] = "orange-money-sn";
})(Wallet = exports.Wallet || (exports.Wallet = {}));
(0, graphql_1.registerEnumType)(Wallet, { name: 'Wallet', description: "Possible wallets" });
//# sourceMappingURL=wallet.enum.js.map