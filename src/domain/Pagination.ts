import { Customer } from './Customer';

export class Pagination {
  total: number;

  totalPorPagina: number;

  pagina: number;

  data: Customer[];

  constructor(data?: Partial<Pagination>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
