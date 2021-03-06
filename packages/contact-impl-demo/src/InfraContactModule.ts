import {
  AbstractModule,
  LoggerFactory,
  LoggerFactorySymbol,
  MessageBus,
  MessageBusSymbol
} from '@tmorin/ddd-fwk-model-core';
import {
  ContactFactory,
  ContactFactorySymbol,
  ContactRepository,
  ContactRepositorySymbol,
  ContactSynchronizationService,
  ContactSynchronizationServiceSymbol
} from '@dorders/contact-model';
import {SimpleContactFactory} from './SimpleContactFactory';
import {
  ProfileConfigProvider,
  ProfileConfigProviderSymbol,
  ProfileMapsRepository,
  ProfileMapsRepositorySymbol
} from '@dorders/profile-impl-demo';
import {SimpleContactRepository} from './SimpleContactRepository';
import {SimpleContactSynchronizationService} from './SimpleContactSynchronizationService';
import {SerializedContactRepository, SerializedContactRepositorySymbol} from './SerializedContactRepository';
import {
  PrivateProfileRepository,
  PrivateProfileRepositorySymbol,
  PublicProfileReferenceDeserializer,
  PublicProfileReferenceDeserializerSymbol
} from '@dorders/profile-model';

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
      registry.resolve<SerializedContactRepository>(SerializedContactRepositorySymbol),
      registry.resolve<LoggerFactory>(LoggerFactorySymbol)
    ), {singleton: true});

    // FACTORIES

    this.registry.registerFactory<ContactFactory>(ContactFactorySymbol, (registry) => new SimpleContactFactory(
      registry.resolve<ProfileConfigProvider>(ProfileConfigProviderSymbol),
      registry.resolve<ProfileMapsRepository>(ProfileMapsRepositorySymbol)
    ), {singleton: true});

    // SERVICES

    this.registry.registerFactory<ContactSynchronizationService>(ContactSynchronizationServiceSymbol, (registry) => new SimpleContactSynchronizationService(
      registry.resolve<MessageBus>(MessageBusSymbol),
      registry.resolve<SimpleContactRepository>(ContactRepositorySymbol),
      registry.resolve<LoggerFactory>(LoggerFactorySymbol)
    ), {singleton: true});

  }

}
