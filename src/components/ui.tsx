import { ArrowUpRight, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow"><span className="tiny-line" />{children}</p>;
}

export function PageIntro({ number, label, title, accent, children }: { number: string; label: string; title: string; accent?: string; children: ReactNode }) {
  return <section className="page-intro container"><Eyebrow>{number} / {label}</Eyebrow><h1>{title}{accent && <><br /><span className="orange">{accent}</span></>}</h1><div className="page-intro-copy">{children}</div></section>;
}

export function ArrowLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return <Link className={`text-link ${className}`} to={to}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}

export function ButtonLink({ to, children, secondary = false }: { to: string; children: ReactNode; secondary?: boolean }) {
  return <Link to={to} className={`button ${secondary ? 'button-outline' : 'button-primary'}`}>{children}<MoveRight size={19} aria-hidden="true" /></Link>;
}

export function Note({ children }: { children: ReactNode }) {
  return <div className="note"><span className="note-dot" /> <div>{children}</div></div>;
}

export function BottomCallout({ title = 'Een jaar vol eerste stappen.', copy = 'Volg mijn ontwikkeling, van de eerste opdracht tot nieuwe ervaringen in de praktijk.', to = '/talentontwikkeling', link = 'Ontdek mijn ontwikkeling' }: { title?: string; copy?: string; to?: string; link?: string }) {
  return <section className="bottom-callout container"><div><Eyebrow>DE VOLGENDE STAP</Eyebrow><h2>{title}</h2><p>{copy}</p></div><ButtonLink to={to}>{link}</ButtonLink></section>;
}
