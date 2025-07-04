import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Router-API",
      version: "1.0.0",
      servers: [
        {
          url: "http://localhost:5100",
          description: "Local Server",
        },
      ],
    },
  },

  apis: ["./swagger/*.yml"], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
export default openapiSpecification;
