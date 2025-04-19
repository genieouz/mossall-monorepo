"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Any = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
let Any = class Any {
    constructor() {
        this.description = 'Any type';
        this.scalar = new graphql_2.GraphQLScalarType({
            name: 'Any',
            description: 'Arbitrary type',
            serialize(value) {
                return value;
            },
            parseValue(value) {
                return value;
            },
            parseLiteral(ast) {
                switch (ast.kind) {
                    case graphql_2.Kind.STRING:
                    case graphql_2.Kind.BOOLEAN: {
                        return ast.value;
                    }
                    case graphql_2.Kind.INT:
                    case graphql_2.Kind.FLOAT: {
                        return parseFloat(ast.value);
                    }
                    case graphql_2.Kind.OBJECT: {
                        throw new Error(`Not sure how to parse GraphQL type ${ast.kind}`);
                    }
                    default:
                        return null;
                }
            },
        });
    }
    serialize(value) {
        return this.scalar.serialize(value);
    }
    parseValue(value) {
        return this.scalar.parseValue(value);
    }
    parseLiteral(ast) {
        return this.scalar.parseLiteral(ast, null);
    }
};
Any = __decorate([
    (0, graphql_1.Scalar)('Any')
], Any);
exports.Any = Any;
//# sourceMappingURL=any.scalar.js.map