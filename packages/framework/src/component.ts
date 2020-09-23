export const ComponentSymbol = Symbol.for('fwk/Component');

export abstract class Component {

  async configure(): Promise<void> {
  }

  async dispose(): Promise<void> {
  }

}
