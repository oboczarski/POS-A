import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders dashboard shell and core sections', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /POS-A Positional Tide Dashboard/i
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/Single-Page Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Analysis Callouts/i)).toBeInTheDocument();
    expect(screen.getByText(/Forecast Framing/i)).toBeInTheDocument();
  });
});
