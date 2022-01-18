// @Decorator
// import { NextFunction, Request, Response } from 'express';
// import 'reflect-metadata';
// export const tryCatcher = (options?) => {
//   return function (target: Object, propertyKey: string, descriptor?: PropertyDescriptor): PropertyDescriptor {
//     const originalMethod: Function = descriptor.value;
//     descriptor.value = function (...args: any[]) {
//       console.log(originalMethod);
//       try {
//         originalMethod.apply(this, args);
//       } catch (error) {
//         args[0].next(this, error);
//       }
//     };
//     return descriptor;
//   };
// };

export const asyncHandler = (fn: Function) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
