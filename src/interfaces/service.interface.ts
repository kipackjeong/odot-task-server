interface IService<T> {
  findAll: () => Promise<T[]>;
  findById: (id: string) => Promise<T | null>;
  create: (data: T) => Promise<string>;
  update: (id: string, data: Partial<T>) => Promise<Object>;
  patch: (id: string) => Promise<T>;
  delete: (id: string) => Promise<Object>;
}

export default IService;
