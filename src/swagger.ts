import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
        title: "GeoSaúde API",
        version: "1.0.0",
        description: "Documentação das rotas",
        },
        servers: [
        { url: "http://localhost:3000" }
        ],
    },
    apis: ["./src/routes/**/*.ts"],
});