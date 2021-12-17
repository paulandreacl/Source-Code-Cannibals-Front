import { render, screen } from '@testing-library/react';
import Index from'./pages/home/Index'

test('renders learn react link', () => {
  render(<Index />);
  const linkElement = screen.getByText(/Bienvenido al Gestor de Proyectos/);
  expect(linkElement).toBeInTheDocument();
});
