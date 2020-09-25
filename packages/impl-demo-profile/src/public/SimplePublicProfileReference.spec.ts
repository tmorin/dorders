import {Container} from '@dorders/framework';
import {disposeContainers} from '@dorders/infra-test';
import {PublicProfileReferenceDeserializer, PublicProfileReferenceDeserializerSymbol} from '@dorders/model-profile';
import {SimplePublicProfileReference} from './SimplePublicProfileReference';
import {startDemoContainers} from '../__helpers__/container';

describe('SimplePublicProfileReference', function () {

  let container0: Container;
  beforeEach(async function () {
    [container0] = await startDemoContainers(1);
  });
  afterEach(async function () {
    await disposeContainers();
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
