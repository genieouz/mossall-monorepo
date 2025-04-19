import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLScalarType, Kind, ValueNode } from 'graphql';

@Scalar('Any')
export class Any implements CustomScalar<any, any> {
  description = 'Any type';

  private readonly scalar: GraphQLScalarType = new GraphQLScalarType({
    name: 'Any',
    description: 'Arbitrary type',
    serialize(value: any) {
      return value; // Valeur retournée au client
    },
    parseValue(value: any) {
      return value; // Valeur à partir du client
    },
    parseLiteral(ast) {
      switch (ast.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN: {
          return ast.value;
        }
        case Kind.INT:
        case Kind.FLOAT: {
          return parseFloat(ast.value);
        }
        case Kind.OBJECT: {
          throw new Error(`Not sure how to parse GraphQL type ${ast.kind}`);
        }
        default:
          return null;
      }
    },
  });

  serialize(value: any): any {
    return this.scalar.serialize(value);
  }

  parseValue(value: any): any {
    return this.scalar.parseValue(value);
  }

  parseLiteral(ast: ValueNode): any {
    return this.scalar.parseLiteral(ast, null);
  }

}
