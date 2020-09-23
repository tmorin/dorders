import {InMemoryConfigProvider} from '.';

describe('InMemoryConfigProvider', function () {

  it('should patch configuration', async function () {
    const configProvider = new InMemoryConfigProvider();
    expect(configProvider).toBeTruthy();

    await configProvider.patch('scope0', {
      key0: 'value0',
      key1: 'value1',
      array0: ['item0', 'item1'],
      array1: ['item0', 'item1']
    });
    const iteration0 = configProvider.get('scope0');
    expect(iteration0.key0).toEqual('value0');
    expect(iteration0.key1).toEqual('value1');
    expect(iteration0.array0).toEqual(['item0', 'item1']);
    expect(iteration0.array1).toEqual(['item0', 'item1']);

    await configProvider.patch('scope0', {
      key1: 'value1bis',
      array0: ['item0bis'],
      array1: ['item1', 'item2', 'item3']
    });
    const iteration1 = configProvider.get('scope0');
    expect(iteration1.key1).toEqual('value1bis');
    expect(iteration1.array0).toEqual(['item0bis', 'item1']);
    expect(iteration1.array1).toEqual(['item1', 'item2', 'item3']);
  });

})
