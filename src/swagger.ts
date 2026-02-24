import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
        title: "GeoSaúde API",
        version: "1.0.0",
        description: "Documentação das rotas",
        contact:{
            email:"joaopedrodelimacarlos@gmail.com"
        }
        },
        servers: [
        { 
            url: "https://geosaudeapi.onrender.com",
            description:"Development server",
        }
        ],
        "paths":{
            "/user/agent/register":{},
            "/user/supervisor/register":{},
            
        }
    },
    apis: [
        "./src/routes/auth.routes.ts",
        "./src/routes/user.routes.ts",
    ],
});