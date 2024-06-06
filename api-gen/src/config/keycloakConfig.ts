import KeycloakConfig from "../utils/interface/KeycloakConfig";

const session = require("express-session");
const keycloak = require("keycloak-connect");

const logger = require("../utils/log/logger");

let _keycloak;

let keycloakConfig: KeycloakConfig = {
    cliendId: process.env.API_GEN_KEYCLOAK_CLIENT_ID,
    bearerOnly: true,
    serverUrl: process.env.API_GEN_KEYCLOAK_AUTH_URL ,
    realm: process.env.API_GEN_KEYCLOAK_REALM,
    credentials: {
        secret: process.env.API_GEN_KEYCLOAK_CLIENT_SECRET
    }
}


const initKeycloak = () => {
    if (_keycloak) {
        logger.warn("Trying to initialise keycloak again!")
        
    }
}