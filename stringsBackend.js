export default class StringsBackend {
  constructor(defaultContext) {
    this.context = defaultContext;
  }

  getDefaultContext() {
    return this.context;
  }

  _getString(key, context) {
    return null;
  }

  getString(key, context = this.getDefaultContext()) {
    return this._getString(key, context);
  }
}
