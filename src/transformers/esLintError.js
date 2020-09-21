'use strict';

function isEslintError (e) {
  if (e.message.includes("eslint-loader")) {
    return true;
  }

  return e.originalStack
    .some(stackframe => stackframe.fileName && stackframe.fileName.includes("eslint-loader"));
}

function cleanMessage(msg) {
  return msg.replace(/Module (Error|Warning) \(from .+\):\n/, '');
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
