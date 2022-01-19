interface IService<T> {
  findAll: () => Promise<T[] | any[]>;
  findById: (id: string) => Promise<T | any>;
  create: (data: T) => Promise<string>;
  update: (id: string, data: Partial<T>) => Promise<Object>;
  patch: (id: string) => Promise<T>;
  delete: (id: string) => Promise<Object>;
}

export default IService;
