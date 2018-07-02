import JSONStringsBackend from './jsonStringsBackend';
import StringsBackend from './stringsBackend';

export const DEFAULT_CONTEXT = 'default';

class StringsFrontend {
  constructor(backend) {
    if (backend instanceof StringsBackend) {
      this.backend = backend;
    } else {
      throw new Error('Not a StringsBackend');
    }
  }

  get(key, context = DEFAULT_CONTEXT) {
    if (typeof this.backend === 'undefined') {
      //todo
    }

    this.backend.getString(key, context);
  }
}

//todo
export const Strings = new StringsFrontend(new JSONStringsBackend());
