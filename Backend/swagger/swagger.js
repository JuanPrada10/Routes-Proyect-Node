import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Routes-API",
      version: "1.0.0",
      description: "API para la gestion de pedidos",
    },
  },
  apis: ["./swagger/*.yml"],
};

const specs = swaggerJsdoc(options);
export default specs;
