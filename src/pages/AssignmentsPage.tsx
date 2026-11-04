import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowDownToLine, ArrowLeft, ArrowUpRight, CalendarDays, Check, CheckCircle2, ChevronDown, FileText, PenLine, Save, X } from 'lucide-react';
import { assignments } from '../data/course';
import { ArrowLink, BottomCallout, Eyebrow, Note, PageIntro } from '../components/ui';

export function AssignmentsPage() {
  const [period, setPeriod] = useState('Alle opdrachten');
  const [query, setQuery] = useState('');
  const filtered = assignments.filter(item => (period === 'Alle opdrachten' || item.period === period) && `${item.title} ${item.summary}`.toLocaleLowerCase('nl').includes(query.toLocaleLowerCase('nl')));
  return <><PageIntro number="02" label="TALENTONTWIKKELING" title="Ontdekken wat ik kan." accent="Groeien in wie ik ben."><p>Zeven opdrachten. Eén persoonlijke reis. Hier verzamel ik mijn TOW-opdrachten en volg ik mijn ontwikkeling in het eerste studiejaar.</p></PageIntro>
    <section className="container page-section"><div className="course-overview"><div><span className="live-dot" /><strong>Mijn ondernemersreis</strong><span>Studiejaar 2026–2027</span></div><div className="course-status"><span className="tag tag-orange">1 in ontwikkeling</span><span className="tag tag-soft">6 gepland</span></div></div><div className="assignment-toolbar"><div className="filter-tabs" role="group" aria-label="Filter opdrachten op periode">{['Alle opdrachten', 'Periode 1', 'Periode 2', 'Periode 4', 'Doorlopend'].map(item => <button key={item} className={item === period ? 'selected' : ''} aria-pressed={item === period} onClick={() => setPeriod(item)}>{item}</button>)}</div><input className="search-input" type="search" placeholder="Zoek een opdracht…" aria-label="Zoek een opdracht" value={query} onChange={e => setQuery(e.target.value)} /></div><div className="assignments-list">{filtered.map(item => <Link className="assignment-row" key={item.id} to={`/talentontwikkeling/${item.id}`}><span className="assignment-number">0{item.number}</span><div className="assignment-info"><span className="panel-label">{item.period}</span><h2>{item.title}</h2><p>{item.summary}</p></div><span className={`tag ${item.status === 'in-progress' ? 'tag-orange' : 'tag-soft'}`}><span className="tag-dot" />{item.status === 'in-progress' ? 'In ontwikkeling' : 'Gepland'}</span><span className="round-arrow"><ArrowUpRight size={22} strokeWidth={1.5} /></span></Link>)}{filtered.length === 0 && <div className="empty-state"><FileText size={30} /><h2>Geen opdrachten gevonden.</h2><p>Probeer een andere zoekterm of kies alle opdrachten.</p><button className="button button-outline" onClick={() => { setQuery(''); setPeriod('Alle opdrachten'); }}>Filters wissen<X size={17} /></button></div>}</div><Note><strong>Een portfolio in ontwikkeling.</strong> De opdrachtbeschrijvingen komen uit de cursushandleiding. Mijn persoonlijke uitwerkingen, resultaten en bewijsstukken voeg ik gedurende het jaar toe. De voortgang in Brightspace staat hier los van.</Note></section><BottomCallout title="Van de collegezaal naar de praktijk." copy="Ook mijn snuffelstage krijgt hier een eigen plek." to="/snuffelstage" link="Ontdek mijn snuffelstage" /></>;
}

const draftKey = (id: string) => `mats-portfolio-draft-v1:${id}`;

function DraftEditor({ id, title }: { id: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [feedback, setFeedback] = useState('');
  const [changed, setChanged] = useState(false);
  const area = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    try { setDraft(localStorage.getItem(draftKey(id)) || ''); } catch { setFeedback('Browseropslag is niet beschikbaar. Je kunt je tekst wel downloaden.'); }
    setChanged(false); setOpen(false);
  }, [id]);
  useEffect(() => {
    const guard = (event: BeforeUnloadEvent) => { if (changed) event.preventDefault(); };
    window.addEventListener('beforeunload', guard);
    return () => window.removeEventListener('beforeunload', guard);
  }, [changed]);
  function save() {
    try { localStorage.setItem(draftKey(id), draft); setFeedback('Opgeslagen in deze browser. Je uitwerking staat nog niet online.'); setChanged(false); }
    catch { setFeedback('Opslaan is niet gelukt. Download je concept om je werk te bewaren.'); }
  }
  function download() {
    const blob = new Blob([`# ${title}\n\nConcept van Mats de Roon\n\n${draft}\n`], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob); const anchor = document.createElement('a');
    anchor.href = url; anchor.download = `concept-${id}.md`; anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback('Concept gedownload. Bewaar het bestand als reservekopie.');
  }
  return <div className="draft-editor"><button className="draft-toggle" aria-expanded={open} aria-controls="draft-panel" onClick={() => { setOpen(!open); if (!open) window.setTimeout(() => area.current?.focus(), 50); }}><span><PenLine size={19} /><span>Mijn conceptwerkruimte<small>Schrijf hier alvast je eigen uitwerking.</small></span></span><ChevronDown size={20} className={open ? 'rotated' : ''} /></button>{open && <div className="draft-panel" id="draft-panel"><p>Alleen voor je eigen concept. Je tekst wordt uitsluitend bewaard in deze browser, op dit apparaat. Opslaan publiceert niets. Download een reservekopie en lever je definitieve werk ook in op Brightspace.</p><label htmlFor="draft-content">Mijn eigen uitwerking — {title}</label><textarea id="draft-content" ref={area} value={draft} placeholder="Wat heb je gedaan, wat heb je ontdekt en wat neem je mee? Schrijf vanuit je eigen ervaringen…" onChange={e => { setDraft(e.target.value); setChanged(true); setFeedback(''); }} rows={10} /><div className="draft-meta"><span>{draft.trim() ? draft.trim().split(/\s+/u).length : 0} woorden{changed ? ' · Niet opgeslagen' : ''}</span><div><button className="button button-outline" onClick={download} disabled={!draft.trim()}><ArrowDownToLine size={16} />Download concept</button><button className="button button-primary" onClick={save}><Save size={16} />Bewaar op dit apparaat</button></div></div><p className="save-feedback" role="status">{feedback}</p></div>}</div>;
}

export function AssignmentPage() {
  const { id } = useParams();
  const assignment = assignments.find(item => item.id === id);
  if (!assignment) return <section className="container not-found"><h1>Deze opdracht bestaat niet.</h1><ArrowLink to="/talentontwikkeling">Terug naar de opdrachten</ArrowLink></section>;
  const next = assignments[assignment.number % assignments.length];
  return <><section className="container assignment-detail-header"><Link className="back-link" to="/talentontwikkeling"><ArrowLeft size={17} />Alle TOW-opdrachten</Link><div className="detail-heading"><div><Eyebrow>TOW · OPDRACHT 0{assignment.number} / {assignment.period.toUpperCase()}</Eyebrow><h1>{assignment.title}<span className="orange">.</span></h1><p>{assignment.summary}</p></div><span className={`tag ${assignment.status === 'in-progress' ? 'tag-orange' : 'tag-soft'}`}>{assignment.status === 'in-progress' ? 'In ontwikkeling' : 'Gepland'}</span></div></section><section className="container page-section detail-grid"><div><div className="panel requirements-panel"><span className="feature-icon"><CheckCircle2 size={23} strokeWidth={1.5} /></span><h2>Wat vraagt deze opdracht?</h2><p className="muted">De kern uit de cursushandleiding, als houvast voor mijn uitwerking.</p><ul className="check-list">{assignment.deliverables.map(text => <li key={text}><Check size={17} /><span>{text}</span></li>)}</ul><p className="source-line">Bron: Cursushandleiding Talentontwikkeling 2026–2027, p. {assignment.sourcePage}. Deadlines: p. 15.</p></div><div className="panel personal-work"><div className="section-heading"><h2>Mijn uitwerking</h2><span className="tag tag-soft">{assignment.number === 1 ? 'Eerste versie' : 'Nog toe te voegen'}</span></div>{assignment.number === 1 ? <><p>Dit portfolio is de eerste versie van mijn personal branding-opdracht. De website brengt mijn profiel, CV, talentontwikkeling en toekomstige stage-ervaringen samen op één plek.</p><p>De structuur staat. Mijn persoonlijke voorbeelden, interesses, leerdoelen en bewijsstukken maken het portfolio gedurende het jaar steeds meer van mij.</p><div className="inline-links"><ArrowLink to="/over-mij">Over mij</ArrowLink><ArrowLink to="/cv">Mijn CV</ArrowLink></div></> : <><FileText size={30} className="empty-icon" strokeWidth={1.2} /><p>Hier komt mijn eigen uitwerking, met de ervaringen en inzichten die bij deze opdracht horen.</p><p className="muted">Er is nog geen definitieve uitwerking of bewijsstuk aan dit portfolio toegevoegd.</p></>}</div><DraftEditor key={assignment.id} id={assignment.id} title={assignment.title} /></div><aside className="assignment-aside"><div className="panel deadline-panel"><CalendarDays size={23} strokeWidth={1.5} /><span className="panel-label">INLEVERMOMENT</span><h3>Een stap met een deadline.</h3><p>{assignment.deadline}</p><span className="small-muted">Controleer je actuele planning ook op Brightspace.</span></div><div className="aside-note"><span className="panel-label">VAN MIJ, VOOR MIJN ONTWIKKELING</span><p>Mijn eigen ervaringen vormen de basis. De opdrachtbeschrijving is het vertrekpunt.</p></div></aside></section><section className="container next-assignment"><span className="panel-label">{assignment.number === 7 ? 'TERUG NAAR HET BEGIN' : 'VOLGENDE OPDRACHT'}</span><ArrowLink to={`/talentontwikkeling/${next.id}`}>{next.title}</ArrowLink></section></>;
}
