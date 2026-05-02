import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Chart section crashed:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-[#2D2450] dark:bg-[#1A1033] dark:text-purple-200">
          We could not load this section right now. Please refresh the page.
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
