import { Component } from 'react';

/**
 * Catches rendering errors in chart components and shows a fallback UI
 * instead of crashing the entire dashboard.
 */
export default class ChartErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ChartErrorBoundary]', error, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center" style={{ minHeight: '300px' }}>
          <div className="text-rose-400 text-sm font-semibold mb-2">Chart failed to render</div>
          <div className="text-slate-500 text-xs max-w-xs">
            {this.state.error?.message ?? 'An unexpected error occurred.'}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
