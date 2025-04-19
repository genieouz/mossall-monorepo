import { CustomScalar } from '@nestjs/graphql';
import { ValueNode } from 'graphql';
export declare class Any implements CustomScalar<any, any> {
    description: string;
    private readonly scalar;
    serialize(value: any): any;
    parseValue(value: any): any;
    parseLiteral(ast: ValueNode): any;
}
