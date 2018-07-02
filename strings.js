import JSONStringsBackend from './jsonStringsBackend';
import StringsBackend from './stringsBackend';

export default class StringsFrontend {
  constructor(backend) {
    if (typeof this.backend === 'undefined' || this.backend === null) {
      throw new Error(
        'Undefined or null passed for backend to a StringsFrontend instance.'
      );
    }

    if (backend instanceof StringsBackend) {
      this.backend = backend;
    } else {
      throw new Error('Backend passed is not an instance of StringsBackend');
    }
  }

  get(key, context = this.backend.getDefaultContext()) {
    return this.backend.getString(key, context);
  }
}
