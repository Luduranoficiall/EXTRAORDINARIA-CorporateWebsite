import React from 'react';

type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // TODO: hook up to analytics or remote logging
    // eslint-disable-next-line no-console
    console.error('Uncaught error in UI:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="error-boundary-root">
          <h1>Ocorreu um erro inesperado</h1>
          <p>Estamos trabalhando para resolver. Atualize a página ou contate o suporte.</p>
          <details className="error-boundary-details">
            {this.state.error?.message}
          </details>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}

export default ErrorBoundary;
