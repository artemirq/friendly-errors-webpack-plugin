import { Plugin, Compiler } from 'webpack';

declare class FriendlyErrorsWebpackPlugin extends Plugin {
  constructor(options?: FriendlyErrorsWebpackPlugin.Options);

  apply(compiler: Compiler): void;
}

declare namespace FriendlyErrorsWebpackPlugin {
  type Severity = 'error' | 'warning' | 'success' | 'info' | 'note';

  interface Options {
    compilationSuccessInfo?: {
      messages?: string[];
      notes?: string[];
    };
    onErrors?(severity: Severity, errors: string): void;
    clearConsole?: boolean;
    additionalFormatters?: Array<
      (errors: WebpackError[], type: Severity) => string[]
      >;
    additionalTransformers?: Array<(error: any) => any>;
  }

  interface WebpackError {
    message: string;
    file: string;
    origin: string;
    name: string;
    severity: Severity;
    webpackError: any;
  }

  interface Debugger {
    info(msg: string): void;
    note(msg: string): void;
    title(severity: Severity, title: string, subtitle: string): void;
    clearConsole(): void;
  }
}

declare const output: FriendlyErrorsWebpackPlugin.Debugger;

export { FriendlyErrorsWebpackPlugin, output };