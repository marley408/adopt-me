import React, { Component } from 'react';
import { Link, Redirect } from '@reach/router';

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  // will run everytime it get new props or state
  componentDidUpdate() {
    if (this.state.error) {
      setTimeout(() => this.state({ redirect: true }), 5000);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click Here</Link>{' '}
          to go back to home page or wait five seconds.
        </h1>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
