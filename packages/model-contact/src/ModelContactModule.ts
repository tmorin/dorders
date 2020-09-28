import {
  AbstractModule,
  CommandHandlerSymbol,
  ComponentSymbol,
  LoggerFactory,
  LoggerFactorySymbol,
  MessageBus,
  MessageBusSymbol
} from '@dorders/framework';
import {ContactsClearer} from './ContactsClearer';
import {ContactsLoader} from './ContactsLoader';
import {ContactsSynchronizer} from './ContactsSynchronizer';
import {ContactSynchronizer} from './ContactSynchronizer';
import {AddContactHandler} from './AddContact';
import {RemoveContactHandler} from './RemoveContact';
import {RenameContactHandler} from './RenameContact';
import {ContactFactory, ContactFactorySymbol} from './ContactFactory';
import {ContactRepository, ContactRepositorySymbol} from './ContactRepository';
import {PublicProfileReferenceDeserializer, PublicProfileReferenceDeserializerSymbol} from '@dorders/model-profile';
import {ContactSynchronizationService, ContactSynchronizationServiceSymbol} from './ContactSynchronizationService';

export class ModelContactModule extends AbstractModule {
  async configure(): Promise<void> {

    // COMMANDS

    this.registry.registerFactory<AddContactHandler>(
      CommandHandlerSymbol,
      registry => new AddContactHandler(
        registry.resolve<ContactFactory>(ContactFactorySymbol),
        registry.resolve<ContactRepository>(ContactRepositorySymbol),
        registry.resolve<PublicProfileReferenceDeserializer>(PublicProfileReferenceDeserializerSymbol)
      ),
      {
        singleton: true
      }
    );

    this.registry.registerFactory<RemoveContactHandler>(
      CommandHandlerSymbol,
      registry => new RemoveContactHandler(
        registry.resolve<ContactFactory>(ContactFactorySymbol),
        registry.resolve<ContactRepository>(ContactRepositorySymbol)
      ),
      {
        singleton: true
      }
    );

    this.registry.registerFactory<RenameContactHandler>(
      CommandHandlerSymbol,
      registry => new RenameContactHandler(
        registry.resolve<ContactFactory>(ContactFactorySymbol),
        registry.resolve<ContactRepository>(ContactRepositorySymbol)
      ),
      {
        singleton: true
      }
    );

    // COMPONENTS

    this.registry.registerFactory<ContactsClearer>(
      ComponentSymbol,
      registry => new ContactsClearer(
        registry.resolve<MessageBus>(MessageBusSymbol),
        registry.resolve<ContactRepository>(ContactRepositorySymbol),
        registry.resolve<LoggerFactory>(LoggerFactorySymbol)
      ),
      {
        singleton: true
      }
    );

    this.registry.registerFactory<ContactsLoader>(
      ComponentSymbol,
      registry => new ContactsLoader(
        registry.resolve<MessageBus>(MessageBusSymbol),
        registry.resolve<ContactRepository>(ContactRepositorySymbol),
        registry.resolve<LoggerFactory>(LoggerFactorySymbol)
      ),
      {
        singleton: true
      }
    );

    this.registry.registerFactory<ContactsSynchronizer>(
      ComponentSymbol,
      registry => new ContactsSynchronizer(
        registry.resolve<MessageBus>(MessageBusSymbol),
        registry.resolve<ContactSynchronizationService>(ContactSynchronizationServiceSymbol),
        registry.resolve<LoggerFactory>(LoggerFactorySymbol)
      ),
      {
        singleton: true
      }
    );

    this.registry.registerFactory<ContactSynchronizer>(
      ComponentSymbol,
      registry => new ContactSynchronizer(
        registry.resolve<MessageBus>(MessageBusSymbol),
        registry.resolve<ContactSynchronizationService>(ContactSynchronizationServiceSymbol),
        registry.resolve<LoggerFactory>(LoggerFactorySymbol)
      ),
      {
        singleton: true
      }
    );

  }
}
