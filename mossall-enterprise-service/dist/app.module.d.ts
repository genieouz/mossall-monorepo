import { ConfigService } from '@nestjs/config';
export declare class AppModule {
    private readonly configService;
    static port: number;
    static apiVersion: string;
    static apiPrefix: string;
    static corsAllowedOrigins: string[];
    static corsAllowedMethods: string[];
    constructor(configService: ConfigService);
}
