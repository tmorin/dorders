import {Container} from '@tmorin/ddd-fwk-model-core';
import {PrivateProfileReferenceDeserializer, PrivateProfileReferenceDeserializerSymbol} from '@dorders/profile-model';
import {SimplePrivateProfileReference} from './SimplePrivateProfileReference';
import {DemoContainers} from '../__helpers__/container';

describe('SimplePrivateProfileReference', function () {

  let containers: DemoContainers;
  let container0: Container;
  beforeEach(async function () {
    containers = new DemoContainers();
    [container0] = await containers.startContainers(1);
  });
  afterEach(async function () {
    await containers.disposeContainers();
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
