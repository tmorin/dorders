import {Container} from '@dorders/framework';
import {disposeContainers} from '@dorders/infra-test';
import {PrivateProfileReferenceDeserializer, PrivateProfileReferenceDeserializerSymbol} from '@dorders/model-profile';
import {SimplePrivateProfileReference} from './SimplePrivateProfileReference';
import {startDemoContainers} from '../__helpers__/container';

describe('SimplePrivateProfileReference', function () {

  let container0: Container;
  beforeEach(async function () {
    [container0] = await startDemoContainers(1);
  });
  afterEach(async function () {
    await disposeContainers();
  });

  it('should be serialized and deserialized', async function () {
    const privateProfileReference = new SimplePrivateProfileReference(
      'profileId'
    );
    const privateProfileReferenceDeserializer = container0.registry.resolve<PrivateProfileReferenceDeserializer>(PrivateProfileReferenceDeserializerSymbol);
    const serializedValue = await privateProfileReference.serialize();
    const deserializedValue = await privateProfileReferenceDeserializer.deserialize(serializedValue);
    const reserializedValue = await deserializedValue.serialize();
    expect(reserializedValue).toBe(serializedValue);
  })

})
