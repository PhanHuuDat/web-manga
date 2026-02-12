import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText(/Featured Manga/i)).toBeInTheDocument();
  });
});
