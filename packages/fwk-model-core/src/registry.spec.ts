import {DefaultRegistry, Registry} from './registry';

describe('registry', function () {

  let registry: Registry;
  beforeEach(function () {
    registry = new DefaultRegistry();
  })

  it('should replies if contained', function () {
    registry = new DefaultRegistry(new Map());
    expect(registry.contains('value')).toBeFalsy();
  });

  it('should register values', function () {
    registry.registerValue('value', 'the value #0');
    registry.registerValue('value', 'the value #1');
    registry.registerValue('value', 'the value #2');
    expect(registry.resolve('value')).toBe('the value #2');
    const values = registry.resolveAll<string>('value');
    expect(values).toStrictEqual(['the value #2', 'the value #1', 'the value #0']);
  });

  it('should failed when not resolve values', function () {
    expect(()=>registry.resolve('value')).toThrowError('unable to resolve an entry with the key (value)');
    expect(()=>registry.resolveAll('value')).toThrowError('unable to resolve an entry with the key (value)');
  });

  it('should register factory', function () {
    let cnt = 0;
    registry.registerFactory('factory', () => (cnt++));
    registry.registerFactory('factory', () => (cnt++));
    expect(registry.resolve('factory')).toBe(0);
    expect(registry.resolve('factory')).toBe(1);
    expect(registry.resolve('factory')).toBe(2);
  });

  it('should register factory as singleton', function () {
    let cnt = 0;
    registry.registerFactory('factory', () => (cnt++), {singleton: true});
    expect(registry.resolve('factory')).toBe(0);
    expect(registry.resolve('factory')).toBe(0);
    expect(registry.resolve('factory')).toBe(0);
  });

})
