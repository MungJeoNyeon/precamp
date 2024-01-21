export const coffeeOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "커피 목록 조회 API",
      version: "1.0.0",
    },
  },
  apis: ["./swagger/coffee-swagger.js"],
};
