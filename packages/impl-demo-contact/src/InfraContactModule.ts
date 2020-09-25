import {AbstractModule, MessageBus, MessageBusSymbol} from '@dorders/framework';
import {
  ContactFactory,
  ContactFactorySymbol,
  ContactRepository,
  ContactRepositorySymbol,
  ContactSynchronizationService,
  ContactSynchronizationServiceSymbol
} from '@dorders/model-contact';
import {SimpleContactFactory} from './SimpleContactFactory';
import {
  ProfileConfigProvider,
  ProfileConfigProviderSymbol,
  ProfileMapsRepository,
  ProfileMapsRepositorySymbol
} from '@dorders/impl-demo-profile';
import {SimpleContactRepository} from './SimpleContactRepository';
import {SimpleContactSynchronizationService} from './SimpleContactSynchronizationService';
import {SerializedContactRepository, SerializedContactRepositorySymbol} from './SerializedContactRepository';
import {
  PrivateProfileRepository,
  PrivateProfileRepositorySymbol,
  PublicProfileReferenceDeserializer,
  PublicProfileReferenceDeserializerSymbol
} from '@dorders/model-profile';

export class InfraContactModule extends AbstractModule {

  async configure(): Promise<void> {
    // COMMANDS
    // COMPONENTS

    // REPOSITORIES

    this.registry.registerFactory<SerializedContactRepository>(SerializedContactRepositorySymbol, (registry) => new SerializedContactRepository(
      registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol),
      registry.resolve<PublicProfileReferenceDeserializer>(PublicProfileReferenceDeserializerSymbol),
      registry.resolve<ContactFactory>(ContactFactorySymbol)
    ), {singleton: true});

    this.registry.registerFactory<ContactRepository>(ContactRepositorySymbol, (registry) => new SimpleContactRepository(
      registry.resolve<SerializedContactRepository>(SerializedContactRepositorySymbol)
    ), {singleton: true});

    // FACTORIES

    this.registry.registerFactory<ContactFactory>(ContactFactorySymbol, (registry) => new SimpleContactFactory(
      registry.resolve<ProfileConfigProvider>(ProfileConfigProviderSymbol),
      registry.resolve<ProfileMapsRepository>(ProfileMapsRepositorySymbol)
    ), {singleton: true});

    // SERVICES

    this.registry.registerFactory<ContactSynchronizationService>(ContactSynchronizationServiceSymbol, (registry) => new SimpleContactSynchronizationService(
      registry.resolve<MessageBus>(MessageBusSymbol),
      registry.resolve<SimpleContactRepository>(ContactRepositorySymbol)
    ), {singleton: true});

  }

}
