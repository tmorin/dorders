import {
  AbstractModule,
  CommandHandlerSymbol,
  ComponentSymbol,
  LoggerFactory,
  LoggerFactorySymbol,
  MessageBus,
  MessageBusSymbol,
  QueryHandlerSymbol
} from '@tmorin/ddd-fwk-model-core';
import {CreateProfileHandler} from './CreateProfile';
import {PrivateProfileFactory, PrivateProfileFactorySymbol} from './PrivateProfileFactory';
import {PrivateProfileRepository, PrivateProfileRepositorySymbol} from './PrivateProfileRepository';
import {DeleteProfileHandler} from './DeleteProfile';
import {ImportProfileHandler} from './ImportProfile';
import {
  PrivateProfileReferenceDeserializer,
  PrivateProfileReferenceDeserializerSymbol
} from './PrivateProfileReferenceDeserializer';
import {UpdateProfileCardHandler} from './UpdateProfileCard';
import {ProfilesLoader} from './ProfilesLoader';
import {ProfileSynchronizer} from './ProfileSynchronizer';
import {ProfileSynchronizerService, ProfileSynchronizerServiceSymbol} from './ProfileSynchronizerService';
import {GetProfileHandler} from './GetProfile';
import {ListProfilesHandler} from './ListProfiles';

export class ModelProfileModule extends AbstractModule {

  async configure(): Promise<void> {

    // COMMANDS

    this.registry.registerFactory<CreateProfileHandler>(
      CommandHandlerSymbol,
      registry => new CreateProfileHandler(
        registry.resolve<PrivateProfileFactory>(PrivateProfileFactorySymbol),
        registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol)
      ), {singleton: true}
    );

    this.registry.registerFactory<DeleteProfileHandler>(
      CommandHandlerSymbol,
      registry => new DeleteProfileHandler(
        registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol)
      ), {singleton: true}
    );

    this.registry.registerFactory<ImportProfileHandler>(
      CommandHandlerSymbol,
      registry => new ImportProfileHandler(
        registry.resolve<PrivateProfileReferenceDeserializer>(PrivateProfileReferenceDeserializerSymbol),
        registry.resolve<PrivateProfileFactory>(PrivateProfileFactorySymbol),
        registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol)
      ), {singleton: true}
    );

    this.registry.registerFactory<UpdateProfileCardHandler>(
      CommandHandlerSymbol,
      registry => new UpdateProfileCardHandler(
        registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol)
      ), {singleton: true}
    );

    // QUERIES

    this.registry.registerFactory<GetProfileHandler>(
      QueryHandlerSymbol,
      registry => new GetProfileHandler(
        registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol)
      ), {singleton: true}
    );

    this.registry.registerFactory<ListProfilesHandler>(
      QueryHandlerSymbol,
      registry => new ListProfilesHandler(
        registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol)
      ), {singleton: true}
    );

    // COMPONENTS

    this.registry.registerFactory<ProfilesLoader>(
      ComponentSymbol,
      registry => new ProfilesLoader(
        registry.resolve<MessageBus>(MessageBusSymbol),
        registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol),
        registry.resolve<LoggerFactory>(LoggerFactorySymbol)
      ), {singleton: true}
    );

    this.registry.registerFactory<ProfileSynchronizer>(
      ComponentSymbol,
      registry => new ProfileSynchronizer(
        registry.resolve<MessageBus>(MessageBusSymbol),
        registry.resolve<PrivateProfileRepository>(PrivateProfileRepositorySymbol),
        registry.resolve<ProfileSynchronizerService>(ProfileSynchronizerServiceSymbol),
        registry.resolve<LoggerFactory>(LoggerFactorySymbol)
      ), {singleton: true}
    );

  }
}
