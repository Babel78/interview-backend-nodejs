import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersController } from '../CustomersController';
import { CustomersService } from '../../service/CustomersService';

describe('CustomersController', () => {
  describe('findByFilter', () => {
    it('should return customers with only name filter', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              email: 'email',
            },
          ])
        ),
      } as unknown as CustomersService;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          name: 'A',
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 200,
        isBase64Encoded: false,
        body: '[{"id":"customerId","name":"name","lastName":"lastName","email":"email"}]',
      });
      expect(service.findByFilter).toBeCalledWith({
        name: 'A',
      });
    });

    it('should return customers with only lastname filter', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              email: 'email',
            },
          ])
        ),
      } as unknown as CustomersService;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          lastname: 'B',
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 200,
        isBase64Encoded: false,
        body: '[{"id":"customerId","name":"name","lastName":"lastName","email":"email"}]',
      });
      expect(service.findByFilter).toBeCalledWith({
        lastName: 'B',
      });
    });

    it('should return customers with both name and lastname filter', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              email: 'email',
            },
          ])
        ),
      } as unknown as CustomersService;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          name: 'A',
          lastname: 'B',
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 200,
        isBase64Encoded: false,
        body: '[{"id":"customerId","name":"name","lastName":"lastName","email":"email"}]',
      });
      expect(service.findByFilter).toBeCalledWith({
        name: 'A',
        lastName: 'B',
      });
    });


    it('should return customers with only gender filter', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              email: 'email',
            },
          ])
        ),
      } as unknown as CustomersService;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          gender: 'male',
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 200,
        isBase64Encoded: false,
        body: '[{"id":"customerId","name":"name","lastName":"lastName","email":"email"}]',
      });
      expect(service.findByFilter).toBeCalledWith({
        gender: 'male',
      });
    });
  });
});
