import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext';
import { Sidebar } from '../components/layout/Sidebar';

afterEach(() => {
  cleanup();
});

function NavigationFixture() {
  const navigate = useNavigate();
  return <>
    <button onClick={() => navigate('/en/5-workshop/5.3-core-infra/5.3.2-database')}>Open RDS route</button>
    <Sidebar isOpen onClose={vi.fn()} onOpenSearch={vi.fn()} />
  </>;
}

describe('three-level workshop navigation', () => {
  it.each([
    ['en', 'Core infrastructure', 'Create the VPC network', 'Collapse ', 'Expand '],
    ['vi', 'Hạ tầng cốt lõi', 'Tạo mạng VPC', 'Thu gọn ', 'Mở rộng '],
  ])('opens the active ancestors and toggles nested sections in %s', (lang, group, title, collapse, expand) => {
    render(<MemoryRouter initialEntries={[`/${lang}/5-workshop/5.3-core-infra/5.3.1-network`]}>
      <LanguageProvider><Sidebar isOpen onClose={vi.fn()} onOpenSearch={vi.fn()} /></LanguageProvider>
    </MemoryRouter>);
    const link = screen.getByRole('link', { name: new RegExp(title) });
    expect(link).toHaveAttribute('href', `/${lang}/5-workshop/5.3-core-infra/5.3.1-network`);
    expect(link).toHaveAttribute('aria-current', 'page');
    fireEvent.click(screen.getByRole('button', { name: collapse + group }));
    expect(screen.queryByRole('link', { name: new RegExp(title) })).not.toBeInTheDocument();
    const toggle = screen.getByRole('button', { name: expand + group });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(screen.getByRole('link', { name: new RegExp(title) })).toBeInTheDocument();
  });

  it('reopens ancestors when navigating to a deep route after collapsing Workshop', () => {
    render(<MemoryRouter initialEntries={['/en/5-workshop']}>
      <LanguageProvider><NavigationFixture /></LanguageProvider>
    </MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Collapse Workshop' }));
    fireEvent.click(screen.getByRole('button', { name: 'Open RDS route' }));
    expect(screen.getByRole('link', { name: /Create the RDS database/ })).toHaveAttribute('aria-current', 'page');
  });
});
