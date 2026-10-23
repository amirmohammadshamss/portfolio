import type { ComponentProps } from 'react';
import { asset } from './asset';

export function PortfolioDownload(props: Omit<ComponentProps<'a'>, 'href' | 'download'>) {
  return <a {...props} href={asset('/portfolio.pdf')} download="Amir-Mohammad-Shams-Portfolio.pdf" />;
}
