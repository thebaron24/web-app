type GenericFunction = (...args: unknown[]) => unknown;

type PickByTypeKeyFilter<T, C> = {
  [K in keyof T]: T[K] extends C ? K : never;
};

type KeysByType<T, C> = PickByTypeKeyFilter<T, C>[keyof T];

type ValuesByType<T, C> = {
  [K in keyof T]: T[K] extends C ? T[K] : never;
};

type PickByType<T, C> = Pick<ValuesByType<T, C>, KeysByType<T, C>>;

type MethodsOf<T> = KeysByType<Required<T>, GenericFunction>;

type InterfaceOf<T> = PickByType<T, GenericFunction>;

type PartiallyMockedInterfaceOf<T> = {
  [K in MethodsOf<T>]?: jest.Mock<InterfaceOf<T>[K]>;
};

export function mock<T>(...mockedMethods: MethodsOf<T>[]): jest.Mocked<T> {
  const partiallyMocked: PartiallyMockedInterfaceOf<T> = {};
  mockedMethods.forEach((mockedMethod) => (partiallyMocked[mockedMethod] = jest.fn()));
  return partiallyMocked as jest.Mocked<T>;
}

export function mockProps<T>(partiallyMocked: jest.Mocked<T>, mockedProps: InterfaceOf<T>): jest.Mocked<T> {
  for (const prop in mockedProps) {
    if (Object.prototype.hasOwnProperty.call(mockedProps, prop)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      partiallyMocked[prop] = mockedProps[prop];
    }
  }

  return partiallyMocked as jest.Mocked<T>;
}
