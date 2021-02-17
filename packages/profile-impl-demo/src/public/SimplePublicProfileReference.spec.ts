import {Container} from '@tmorin/ddd-fwk-model-core';
import {PublicProfileReferenceDeserializer, PublicProfileReferenceDeserializerSymbol} from '@dorders/profile-model';
import {SimplePublicProfileReference} from './SimplePublicProfileReference';
import {DemoContainers} from '../__helpers__/container';

describe('SimplePublicProfileReference', function () {

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
    const publicProfileReference = new SimplePublicProfileReference(
      'profileId',
      'name'
    );
    const publicProfileReferenceDeserializer = container0.registry.resolve<PublicProfileReferenceDeserializer>(PublicProfileReferenceDeserializerSymbol);
    const serializedValue = await publicProfileReference.serialize();
    const deserializedValue = await publicProfileReferenceDeserializer.deserialize(serializedValue);
    const reserializedValue = await deserializedValue.serialize();
    expect(reserializedValue).toBe(serializedValue);
  })

})
