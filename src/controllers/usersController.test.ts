import { Request } from "express";
import { makeMockResponse } from "../mocks/mockResponse";
import { UsersController } from "./usersController";
describe("Users Controller", () => {
  const usersController = new UsersController();

  const mockRequest = {} as Request;
  const mockResponse = makeMockResponse();

  it("Deve retornar a lista de usuários", () => {
    usersController.listUsers(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(200);
    expect(mockResponse.state.json).toHaveLength(4);
  });

  it("Deve Criar um novo usuário", () => {
    mockRequest.body = {
      name: "valdir",
    };
    usersController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(201);
    expect(mockResponse.state.json).toMatchObject({
      mensagem: `Usuário valdir criado`,
    });
  });

  it("Não deve criar um usuário sem nome", () => {
    mockRequest.body = {
      name: "",
    };
    usersController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(403);
    expect(mockResponse.state.json).toMatchObject({
      mensagem: "Não é possível criar usuário sem nome",
    });
  });
});
