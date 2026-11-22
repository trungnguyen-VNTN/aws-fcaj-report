import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext';
import { MarkdownRenderer } from '../components/markdown/MarkdownRenderer';

afterEach(cleanup);

it('renders a workshop figure whose quoted alt text and caption contain spaces', () => {
  render(<MemoryRouter initialEntries={['/en/5-workshop']}>
    <LanguageProvider>
      <MarkdownRenderer content={':::figure{src="/images/architecture/system-overview.png" alt="AWS architecture reference" caption="Reference diagram from the project"}'} />
    </LanguageProvider>
  </MemoryRouter>);
  expect(screen.getByRole('img', { name: 'AWS architecture reference' })).toHaveAttribute('src', '/images/architecture/system-overview.png');
  expect(screen.getByText('Reference diagram from the project')).toBeInTheDocument();
});
