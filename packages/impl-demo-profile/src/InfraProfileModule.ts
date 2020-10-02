import {
  AbstractModule,
  ConfigProvider,
  ConfigProviderSymbol,
  LoggerFactory,
  LoggerFactorySymbol,
  MessageBus,
  MessageBusSymbol
} from '@dorders/fwk-model-core';
import {
  PrivateProfileFactory,
  PrivateProfileFactorySymbol,
  PrivateProfileReferenceDeserializer,
  PrivateProfileReferenceDeserializerSymbol,
  PrivateProfileRepository,
  PrivateProfileRepositorySymbol,
  ProfileSynchronizerService,
  ProfileSynchronizerServiceSymbol,
  PublicProfileReferenceDeserializer,
  PublicProfileReferenceDeserializerSymbol
} from '@dorders/model-profile';
import {SimplePublicProfileReferenceDeserializer} from './public';
import {
  InMemoryPrivateProfileRepository,
  SimplePrivateProfileFactory,
  SimplePrivateProfileReferenceDeserializer
} from './private';
import {SimpleProfileSynchronizerService} from './SimpleProfileSynchronizerService';
import {ProfileConfigProvider, ProfileConfigProviderSymbol} from './ProfileConfigProvider';
import {ProfileMapsRepository, ProfileMapsRepositorySymbol} from './map';

export class InfraProfileModule extends AbstractModule {

  async configure(): Promise<void> {

    // SERVICES

    this.registry.registerFactory<ProfileConfigProvider>(
      ProfileConfigProviderSymbol,
      (registry) => new ProfileConfigProvider(
        registry.resolve<ConfigProvider>(ConfigProviderSymbol)
      ),
      {singleton: true}
    );

    this.registry.registerFactory<PublicProfileReferenceDeserializer>(
      PublicProfileReferenceDeserializerSymbol,
      () => new SimplePublicProfileReferenceDeserializer(),
      {singleton: true}
    );

    this.registry.registerFactory<PrivateProfileReferenceDeserializer>(
      PrivateProfileReferenceDeserializerSymbol,
      () => new SimplePrivateProfileReferenceDeserializer(),
      {singleton: true}
    );

    this.registry.registerFactory<ProfileSynchronizerService>(
      ProfileSynchronizerServiceSymbol,
      (registry) => new SimpleProfileSynchronizerService(
        registry.resolve<MessageBus>(MessageBusSymbol),
        registry.resolve<LoggerFactory>(LoggerFactorySymbol),
        registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol)
      ),
      {singleton: true}
    );

    // FACTORIES

    this.registry.registerFactory<PrivateProfileFactory>(
      PrivateProfileFactorySymbol,
      (registry) => new SimplePrivateProfileFactory(
        registry.resolve<ProfileConfigProvider>(ProfileConfigProviderSymbol),
        registry.resolve<ProfileMapsRepository>(ProfileMapsRepositorySymbol)
      ),
      {singleton: true}
    );

    // REPOSITORIES

    this.registry.registerFactory<PrivateProfileRepository>(
      PrivateProfileRepositorySymbol,
      () => new InMemoryPrivateProfileRepository(),
      {singleton: true}
    );

    this.registry.registerFactory<ProfileMapsRepository>(
      ProfileMapsRepositorySymbol,
      (registry) => new ProfileMapsRepository(
        registry.resolve<ProfileConfigProvider>(ProfileConfigProviderSymbol)
      ),
      {singleton: true}
    );

  }

  async dispose(): Promise<void> {
    await this.registry.resolve<InMemoryPrivateProfileRepository>(PrivateProfileRepositorySymbol).dispose();
  }

}
