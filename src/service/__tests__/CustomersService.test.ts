import { CustomersServiceImpl } from '../CustomersServiceImpl';
import { Customer } from '../../domain/Customer';
import { CustomersRepository } from '../../repository/CustomersRepository';

describe('CustomersServiceImpl', () => {
  describe('findByFilter', () => {
    it('should return customers with only name filter', async () => {
      // Prepare
      const repository = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
            },
          ])
        ),
      } as unknown as CustomersRepository;

      const service = new CustomersServiceImpl(repository);

      // Execute
      const response = await service.findByFilter(new Customer({ name: 'A' }));
      // Validate
      expect(response).toEqual([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'nlastName@ihfintech.com.pe',
        },
      ]);
      expect(repository.findByFilter).toBeCalledWith({
        name: 'A',
      });
    });

    it('should return customers with only lastname filter', async () => {
      // Prepare
      const repository = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
            },
          ])
        ),
      } as unknown as CustomersRepository;

      const service = new CustomersServiceImpl(repository);

      // Execute
      const response = await service.findByFilter(new Customer({ lastName: 'A' }));
      // Validate
      expect(response).toEqual([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'nlastName@ihfintech.com.pe',
        },
      ]);
      expect(repository.findByFilter).toBeCalledWith({
        lastName: 'A',
      });
    });

    it('should return customers with both name and lastname filter', async () => {
      // Prepare
      const repository = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
            },
          ])
        ),
      } as unknown as CustomersRepository;

      const service = new CustomersServiceImpl(repository);

      // Execute
      const response = await service.findByFilter(new Customer({ name: 'A', lastName: 'A' }));
      // Validate
      expect(response).toEqual([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'nlastName@ihfintech.com.pe',
        },
      ]);
      expect(repository.findByFilter).toBeCalledWith({
        name: 'A',
        lastName: 'A',
      });
    });

    it('should return customers with only gender filter', async () => {
      // Prepare
      const repository = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
            },
          ])
        ),
      } as unknown as CustomersRepository;

      const service = new CustomersServiceImpl(repository);

      // Execute
      const response = await service.findByFilter(new Customer({ gender: 'male' }));
      // Validate
      expect(response).toEqual([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'nlastName@ihfintech.com.pe',
        },
      ]);
      expect(repository.findByFilter).toBeCalledWith({
        gender: 'male',
      });
    });
  });
});
