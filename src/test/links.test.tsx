import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext';
import { MarkdownRenderer } from '../components/markdown/MarkdownRenderer';

afterEach(cleanup);

const renderAt = (content: string) =>
  render(
    <MemoryRouter initialEntries={['/vi/5-workshop']}>
      <LanguageProvider>
        <MarkdownRenderer content={content} />
      </LanguageProvider>
    </MemoryRouter>,
  );

it('links static files as downloads instead of client-side routes', () => {
  renderAt('[aws-architecture.drawio](/files/aws-architecture.drawio)');
  const link = screen.getByRole('link', { name: 'aws-architecture.drawio' });
  expect(link).toHaveAttribute('href', '/files/aws-architecture.drawio');
  expect(link).toHaveAttribute('download');
});

it('keeps document links as language-prefixed routes', () => {
  renderAt('[5.8](/5-workshop/5.8-testing-troubleshooting)');
  const link = screen.getByRole('link', { name: '5.8' });
  expect(link).toHaveAttribute('href', '/vi/5-workshop/5.8-testing-troubleshooting');
  expect(link).not.toHaveAttribute('download');
});
