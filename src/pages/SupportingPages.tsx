import { ArrowDownToLine, ArrowUpRight, BookOpen, BriefcaseBusiness, Building2, ChevronDown, Compass, FileText, Music2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowLink, BottomCallout, Eyebrow, Note, PageIntro } from '../components/ui';
import { stageGuidance } from '../data/course';

const cvUrl = `${import.meta.env.BASE_URL}documents/cv-mats-de-roon.pdf`;

export function AboutPage() {
  return <>
    <PageIntro number="01" label="OVER MIJ" title="Ik ben Mats." accent="Mijn verhaal krijgt vorm.">
      <p>19 jaar. Eerstejaars student. En aan het begin van mijn ontwikkeling als ondernemer.</p>
    </PageIntro>

    <section className="container page-section two-columns">
      <div className="profile-card">
        <span className="panel-label">AANGENAAM,</span>
        <div className="monogram-large" aria-label="Initialen van Mats de Roon">MR<span className="orange">.</span></div>
        <div><h2>Mats de Roon</h2><p>Student Ondernemerschap &amp; Retail Management</p></div>
      </div>
      <div className="about-story">
        <Eyebrow>DIT IS MIJN VERTREKPUNT</Eyebrow>
        <h2 className="section-title">Een studie. Een nieuw hoofdstuk.</h2>
        <p>Ik ben Mats de Roon, 19 jaar, en ik studeer HBO Ondernemerschap &amp; Retail Management aan Hogeschool Rotterdam. Op deze website verzamel ik mijn persoonlijke en professionele ontwikkeling tijdens mijn eerste studiejaar.</p>
        <p>Ik heb bij Facilicom op de BT-servicedesk gewerkt. Daar hielp ik mensen telefonisch bij computerproblemen en aan de balie met laptops, telefoons en andere apparatuur.</p>
        <p>Later wil ik een eigen bedrijf beginnen, het liefst met de verkoop van een product. Welk product dat wordt, wil ik tijdens mijn opleiding verder ontdekken. Dit portfolio laat zien welke stappen ik onderweg zet.</p>
        <dl className="facts-list">
          <div><dt>Naam</dt><dd>Mats de Roon</dd></div>
          <div><dt>Leeftijd</dt><dd>19 jaar</dd></div>
          <div><dt>Opleiding</dt><dd>Ondernemerschap &amp; Retail Management</dd></div>
          <div><dt>Hogeschool</dt><dd>Hogeschool Rotterdam</dd></div>
          <div><dt>Studiejaar</dt><dd>2026–2027 · Jaar 1</dd></div>
        </dl>
        <ArrowLink to="/cv">Bekijk mijn CV</ArrowLink>
      </div>
    </section>

    <section className="container page-section">
      <div className="section-heading"><div><Eyebrow>DIT HOORT OOK BIJ MIJ</Eyebrow><h2 className="section-title">Meer dan mijn studie.</h2></div></div>
      <div className="three-columns">
        <article className="panel"><BriefcaseBusiness className="feature-icon" size={26} aria-hidden="true" /><h3>Mijn werkervaring</h3><p>Bij de BT-servicedesk van Facilicom deed ik ervaring op met IT-ondersteuning en contact met mensen. Ik hielp bij vragen en problemen en gaf apparatuur uit, wisselde die om en nam die weer in.</p><ArrowLink to="/cv">Bekijk mijn werkervaring</ArrowLink></article>
        <article className="panel"><Music2 className="feature-icon" size={26} aria-hidden="true" /><h3>Buiten de studie</h3><p>Ik sport graag: ik ga naar de gym en voetbal. Ook speel ik piano en breng ik graag tijd door met vrienden en familie. Af en toe game ik, het liefst samen met vrienden.</p><div className="interest-list" aria-label="Mijn interesses">{['Gymmen', 'Voetbal', 'Piano', 'Vrienden & familie', 'Gamen'].map(interest => <span className="interest-tag" key={interest}>{interest}</span>)}</div></article>
        <article className="panel"><Compass className="feature-icon" size={26} aria-hidden="true" /><h3>Mijn toekomst</h3><p>Mijn ambitie is om een eigen bedrijf te starten en een product te verkopen. Mijn opleiding is de plek om te onderzoeken welk product en welke onderneming bij mij passen.</p><ArrowLink to="/talentontwikkeling">Volg mijn ontwikkeling</ArrowLink></article>
      </div>
    </section>
    <BottomCallout />
  </>;
}

export function CvPage() {
  return <>
    <PageIntro number="02" label="MIJN CV" title="Een begin met" accent="ruimte om te groeien.">
      <p>Mijn opleiding, werkervaring en interesses, overzichtelijk bij elkaar. Dit CV groeit mee met de stappen die ik zet.</p>
    </PageIntro>

    <section className="container page-section two-columns cv-layout">
      <aside className="panel cv-profile">
        <span className="panel-label">CURRICULUM VITAE</span>
        <h2>Mats de Roon<span className="orange">.</span></h2>
        <p>Student Ondernemerschap &amp; Retail Management</p>
        <dl className="facts-list">
          <div><dt>Leeftijd</dt><dd>19 jaar</dd></div>
          <div><dt>Niveau</dt><dd>HBO · Bachelor</dd></div>
          <div><dt>Studiejaar</dt><dd>2026–2027 · Jaar 1</dd></div>
        </dl>
        <a className="button button-primary" href={cvUrl} download="CV-Mats-de-Roon.pdf">Download mijn CV<ArrowDownToLine size={18} aria-hidden="true" /></a>
        <p className="muted small-text">PDF · Eerste versie · november 2026</p>
      </aside>

      <div className="cv-sections">
        <section className="cv-section">
          <Eyebrow>01 / OPLEIDING</Eyebrow>
          <div className="timeline"><div className="timeline-item"><div className="timeline-date">2026–2027</div><div className="timeline-content"><h3>Ondernemerschap &amp; Retail Management</h3><p>Hogeschool Rotterdam · HBO · Eerste studiejaar</p><span className="tag tag-soft">In opleiding</span></div></div></div>
        </section>
        <section className="cv-section">
          <Eyebrow>02 / WERKERVARING</Eyebrow>
          <div className="timeline"><div className="timeline-item"><div className="timeline-date">Periode nog aan te vullen</div><div className="timeline-content"><h3>BT-servicedesk</h3><p>Facilicom</p><ul className="detail-list"><li>Telefonische ondersteuning bij computerproblemen.</li><li>Mensen aan de balie helpen met laptops, telefoons en andere apparatuur.</li><li>Nieuwe apparatuur uitgeven, apparatuur inwisselen en innemen.</li></ul></div></div></div>
        </section>
        <section className="cv-section">
          <Eyebrow>03 / VAARDIGHEDEN &amp; INTERESSES</Eyebrow>
          <h3>Ervaring vanuit de servicedesk.</h3>
          <div className="interest-list" aria-label="Werkgebieden">{['IT-ondersteuning', 'Klantcontact', 'Apparatuuruitgifte'].map(skill => <span className="interest-tag" key={skill}>{skill}</span>)}</div>
          <p>In mijn vrije tijd ga ik graag naar de gym, voetbal ik en speel ik piano. Ik breng graag tijd door met vrienden en familie en game af en toe, het liefst samen met vrienden.</p>
        </section>
        <Note>Contactgegevens en de periode van mijn werk bij Facilicom worden nog toegevoegd. De download bevat mijn opleiding, werkervaring en interesses.</Note>
      </div>
    </section>
    <BottomCallout title="Leren krijgt betekenis in de praktijk." copy="Op de stagepagina komen mijn voorbereiding, opdrachten en praktijkervaringen samen." to="/snuffelstage" link="Bekijk mijn snuffelstage" />
  </>;
}

export function StagePage() {
  return <>
    <PageIntro number="04" label="SNUFFELSTAGE" title="Van de collegezaal" accent="naar de praktijk.">
      <p>Een eigen plek voor mijn stagevoorbereiding, opdrachten en ervaringen. De inhoud groeit mee zodra mijn snuffelstage concreet wordt.</p>
    </PageIntro>

    <section className="container page-section">
      <div className="panel stage-intro-panel">
        <div className="feature-icon"><Building2 size={28} aria-hidden="true" /></div>
        <div><span className="tag tag-soft">Nog in te vullen</span><h2>Mijn stagebedrijf</h2><p>Het bedrijf, mijn stageperiode en mijn werkzaamheden worden hier toegevoegd zodra ze bekend zijn.</p></div>
      </div>
    </section>

    <section className="container page-section">
      <div className="section-heading"><div><Eyebrow>MIJN STAGEPORTFOLIO</Eyebrow><h2 className="section-title">De praktijk, stap voor stap.</h2></div></div>
      <p className="muted">Deze indeling biedt ruimte voor mijn stagewerk. De officiële opdrachten voeg ik toe op basis van de aparte stagehandleiding.</p>
      <div className="stage-accordion">
        <details className="panel" open>
          <summary><span className="panel-label">01</span><span>Mijn voorbereiding</span><ChevronDown size={21} aria-hidden="true" /></summary>
          <div className="accordion-content"><p>Mijn CV en motivatiebrief voor de snuffelstage.</p>
            <a className="document-row" href={cvUrl} download="CV-Mats-de-Roon.pdf"><FileText size={22} aria-hidden="true" /><span><strong>CV — Mats de Roon</strong><small>Eerste versie · PDF</small></span><ArrowDownToLine size={19} aria-hidden="true" /></a>
            <div className="document-row"><FileText size={22} aria-hidden="true" /><span><strong>Motivatiebrief</strong><small>Nog toe te voegen</small></span><span className="tag tag-soft">Gepland</span></div>
          </div>
        </details>
        <details className="panel">
          <summary><span className="panel-label">02</span><span>Mijn stageopdrachten</span><ChevronDown size={21} aria-hidden="true" /></summary>
          <div className="accordion-content"><p>Hier komen alle officiële stageopdrachten, inclusief mijn eigen uitwerkingen en bijbehorende bewijsstukken.</p><Note>{stageGuidance.summary}</Note></div>
        </details>
        <details className="panel">
          <summary><span className="panel-label">03</span><span>Ervaringen &amp; reflectie</span><ChevronDown size={21} aria-hidden="true" /></summary>
          <div className="accordion-content"><p>Ruimte voor mijn werkzaamheden, feedback en wat ik meeneem uit de praktijk. Reflecties en ervaringen voeg ik zelf toe na mijn stage.</p><span className="tag tag-soft">Nog geen ervaringen toegevoegd</span></div>
        </details>
      </div>
    </section>

    <section className="container page-section two-columns">
      <div className="panel"><Eyebrow>UIT DE TOW-HANDLEIDING</Eyebrow><h3>Wat staat al vast?</h3><ul className="detail-list">{stageGuidance.confirmedRequirements.map(item => <li key={item}>{item}</li>)}</ul></div>
      <div className="panel"><Eyebrow>NOG AAN TE VULLEN</Eyebrow><h3>De volgende informatie ontbreekt nog.</h3><ul className="detail-list">{stageGuidance.missing.map(item => <li key={item}>{item}</li>)}</ul><p className="muted small-text">De precieze stagevereisten neem ik over uit de stagehandleiding zodra die beschikbaar is.</p></div>
    </section>
    <div className="container page-section"><Note><strong>Planning nog te bevestigen.</strong> {stageGuidance.planningNote}</Note></div>
    <BottomCallout />
  </>;
}

const experienceTypes = [
  { number: '01', title: 'Mijn studentbedrijf', subtitle: 'Van een idee naar een onderneming.', icon: Building2, description: 'Hier komt het verhaal van mijn studentbedrijf: het idee, mijn rol, de website en wat ik onderweg leer.', items: ['Naam en website van het studentbedrijf', 'Mijn rol en bijdrage aan het team', 'Eigen resultaten, foto’s en leerervaringen'] },
  { number: '02', title: 'Mijn keuzevak', subtitle: 'Leren vanuit een andere invalshoek.', icon: BookOpen, description: 'Hier komt mijn gekozen vak, waarom ik ervoor kies en wat het toevoegt aan mijn ontwikkeling.', items: ['Naam en inhoud van het keuzevak', 'Mijn motivatie en leerdoelen', 'Werk, ervaringen en een persoonlijke terugblik'] },
  { number: '03', title: 'Belevenisweken', subtitle: 'Nieuwe ervaringen, nieuwe inzichten.', icon: Compass, description: 'Een plek voor de belevenisweken: wat ik doe, welke mensen ik ontmoet en wat mij bijblijft.', items: ['De activiteiten waaraan ik deelneem', 'Eigen foto’s en korte verslagen', 'Wat ik leer en meeneem naar mijn studie'] },
];

export function MorePage() {
  return <>
    <PageIntro number="05" label="MEER DAN DE STUDIE" title="Ook buiten de les" accent="blijf ik ontdekken.">
      <p>Een onderneming, een keuzevak, een nieuwe ervaring. Hier verzamel ik wat bijdraagt aan mijn persoonlijke en professionele ontwikkeling.</p>
    </PageIntro>

    <section className="container page-section">
      <div className="three-columns experience-grid">{experienceTypes.map(({ number, title, subtitle, icon: Icon, description, items }) => <article className="panel experience-card" key={number}>
        <div className="experience-card-top"><Icon size={29} className="feature-icon" aria-hidden="true" /><span className="panel-label">{number}</span></div>
        <span className="tag tag-soft">Binnenkort meer</span><h2>{title}</h2><p className="experience-subtitle">{subtitle}</p><p>{description}</p>
        <details><summary>Wat komt hier te staan?<ChevronDown size={18} aria-hidden="true" /></summary><ul className="detail-list">{items.map(item => <li key={item}>{item}</li>)}</ul></details>
      </article>)}</div>
    </section>

    <section className="container page-section two-columns">
      <div><Eyebrow>ERVARINGEN DIE BIJBLIJVEN</Eyebrow><h2 className="section-title">Een portfolio mag meegroeien.</h2><p>Foto’s, links en korte verslagen maken zichtbaar wat ik buiten de verplichte opdrachten leer. Zodra er eigen materiaal is, krijgt dat hier een plek.</p></div>
      <div className="panel"><Sparkles className="feature-icon" size={25} aria-hidden="true" /><h3>Netwerk- en alumni-events</h3><p>De minimaal twee events voor Talentontwikkeling hebben een eigen plek bij opdracht 6. Daar komen mijn eigen beelden, tops, tips en leerervaringen samen.</p><ArrowLink to="/talentontwikkeling/events">Naar de eventopdracht</ArrowLink></div>
    </section>
    <BottomCallout title="De rode draad? Mijn ontwikkeling." />
  </>;
}

export function ColophonPage() {
  return <>
    <PageIntro number="06" label="COLOFON" title="Over dit portfolio." accent="Helder over de herkomst.">
      <p>Wie de informatie aanlevert, welke bronnen zijn gebruikt en hoe deze website tot stand komt.</p>
    </PageIntro>
    <section className="container page-section two-columns">
      <article className="panel"><Eyebrow>INHOUD &amp; BRONNEN</Eyebrow><h2>Mijn portfolio</h2><p>Deze website is het digitale portfolio van Mats de Roon voor Talentontwikkeling, jaar 1 van de opleiding Ondernemerschap &amp; Retail Management aan Hogeschool Rotterdam.</p><p>De beschreven opdrachtvereisten komen uit de <em>Cursushandleiding Talentontwikkeling 2026–2027</em>, cursus ENTTOW01J1. De zeven TOW-opdrachten staan op pagina 23–28; het deadlineoverzicht op pagina 15.</p><p>Opdrachtbeschrijvingen zijn samenvattingen van wat de opleiding vraagt. Ze zijn geen persoonlijke uitwerkingen of bewijs van afgeronde opdrachten. Eigen resultaten, reflecties en ervaringen worden door Mats toegevoegd.</p></article>
      <article className="panel"><Eyebrow>ONTWERP &amp; TECHNIEK</Eyebrow><h2>Gemaakt met ondersteuning</h2><p>Bij het ontwerp, de structuur, de basisteksten en de code van deze website is AI-ondersteuning gebruikt. Mats controleert de inhoud en vult het portfolio aan met zijn eigen werk.</p><p>Het Rotterdamse beeld op de landingspagina is een met AI gemaakte architectuurimpressie van de Erasmusbrug. Het is geen eigen foto of bewijs van een persoonlijke ervaring.</p><p>De website gebruikt React, Vite en Lucide-iconen. De lettertypen DM Sans en Manrope worden lokaal geladen.</p></article>
    </section>
    <div className="container page-section"><Note>Er worden geen bezoekersstatistieken of trackingcookies gebruikt. De conceptwerkruimte bewaart tekst alleen in de lokale opslag van je eigen browser; er wordt niets naar een server verstuurd. Persoonlijke uitwerkingen en contactgegevens worden alleen toegevoegd wanneer Mats die aanlevert.</Note><p className="colophon-back"><Link className="text-link" to="/">Terug naar de landingspagina<ArrowUpRight size={18} aria-hidden="true" /></Link></p></div>
  </>;
}
