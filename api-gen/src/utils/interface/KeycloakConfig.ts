export default interface KeycloakConfig {
    cliendId: string | undefined;
    bearerOnly: boolean;
    serverUrl: string | undefined;
    realm: string | undefined;
    credentials: Credentials
}

export interface Credentials {
    secret: string | undefined
}