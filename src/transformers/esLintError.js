'use strict';

function isEslintError (e) {
  return e.originalStack
    .some(stackframe => stackframe.fileName && stackframe.fileName.indexOf('eslint-loader') > 0);
}

function cleanMessage(msg) {
  if (msg.startsWith('Module Warning')) {
    return msg.split('\n').slice(1).join('\n').trimLeft();
  }

  return msg;
}

function transform(error) {
  if (isEslintError(error)) {
    return Object.assign({}, error, {
      message: cleanMessage(error.message),
      name: 'Lint error',
      type: 'lint-error',
    });
  }

  return error;
}

module.exports = transform;
