import axios from 'axios';
import { CustomersRepository } from './CustomersRepository';
import { Customer } from '../domain/Customer';

type RandomUser = {
  id: {
    value: string;
  };
  name: {
    first: string;

    last: string;
  };
  gender: string;
};

type PaginationInfo = {
  results: number;
}


export class CustomersRepositoryImpl implements CustomersRepository {
  async findByFilter(customer: Customer): Promise<Customer[]> {
    const result = await axios.get('https://randomuser.me/api/?results=100');
    const paginationInfo: PaginationInfo = result.data.info;
    const totalPorPagina = paginationInfo.results;
    if (!result.data.results) {
      return [];
    }

    return this.generateFiltersByParams(customer, result.data.results).map(
      (item: RandomUser) =>
        new Customer({
          id: item.id.value,
          name: item.name.first,
          lastName: item.name.last,
        })
    );
  }

  generateFiltersByParams(customer: Customer, data: []): any[] {
    return data.filter((item: RandomUser) => {
      let filters;
      if (customer.name)
        filters = item.name.first
          .toLowerCase()
          .startsWith(customer.name.toLowerCase());
      if (customer.lastName) {
        filters = !filters
          ? item.name.last
            .toLowerCase()
            .startsWith(customer.lastName.toLowerCase())
          : filters &&
          item.name.last
            .toLowerCase()
            .startsWith(customer.lastName.toLowerCase());
      }
      if (customer.gender)
        filters = !filters
          ? item.gender.toLowerCase().startsWith(customer.gender.toLowerCase())
          : filters &&
          item.gender.toLowerCase().startsWith(customer.gender.toLowerCase());
      return filters;
    });
  }
}
