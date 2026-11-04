/**
 * Opdrachtinformatie uit de Cursushandleiding Talentontwikkeling 2026–2027.
 * Beschrijft wat de opleiding vraagt; dit zijn geen ingeleverde uitwerkingen.
 * Persoonlijke resultaten en ervaringen worden door Mats zelf toegevoegd.
 */
export type AssignmentStatus = 'in-progress' | 'planned';

export interface Assignment {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  period: string;
  summary: string;
  deliverables: string[];
  sourcePage: number;
  status: AssignmentStatus;
  deadline: string;
}

export const assignments: Assignment[] = [
  {
    id: 'personal-branding',
    number: 1,
    title: 'Personal branding',
    shortTitle: 'Mijn persoonlijke merk',
    period: 'Periode 1',
    summary:
      'Een eigen website als digitaal portfolio: wie ik ben, wat ik doe en hoe ik mij tijdens het eerste studiejaar persoonlijk en professioneel ontwikkel.',
    deliverables: [
      'Een verzorgde landingspagina, een pagina Over mij en een CV.',
      'Alle TOW-opdrachten en stageopdrachten overzichtelijk verzamelen.',
      'Ruimte voor het studentbedrijf, het keuzevak, belevenisweken en andere relevante ervaringen.',
      'De werkende websitelink op Brightspace inleveren en het portfolio gedurende het jaar bijwerken.',
    ],
    sourcePage: 23,
    status: 'in-progress',
    deadline: 'Eerste versie: 18 december 2026, 23.59 uur. Eindversie: 7 mei 2027, 23.59 uur.',
  },
  {
    id: 'ondernemend',
    number: 2,
    title: 'Hoe ondernemend ben jij?',
    shortTitle: 'Mijn ondernemersprofiel',
    period: 'Periode 1',
    summary:
      'Met de Wondernemerscan mijn ondernemende mindset onderzoeken en de uitkomsten vergelijken met mijn eigen ervaringen, sterke kanten en ontwikkelpunten.',
    deliverables: [
      'De Wondernemerscan maken en het testresultaat bewaren als screenshot, rapport of overzicht.',
      'De testresultaten analyseren in ongeveer 300–500 woorden, met een onderbouwde reactie op de uitkomsten.',
      'Minimaal drie persoonlijke leerdoelen formuleren als basis voor opdracht 3.',
      'De uitwerking plaatsen op de website én Brightspace.',
    ],
    sourcePage: 24,
    status: 'planned',
    deadline: 'Twee dagen vóór het eerste TOW-gesprek.',
  },
  {
    id: 'leerdoelen',
    number: 3,
    title: 'Leerdoelen & goede voornemens',
    shortTitle: 'Van inzicht naar actie',
    period: 'Periode 1',
    summary:
      'Mijn leerdoelen concreet en SMART maken, koppelen aan EntreComp en vertalen naar een uitvoerbaar plan dat ik tijdens het jaar evalueer.',
    deliverables: [
      'Minimaal drie persoonlijke of professionele SMART-leerdoelen formuleren en toelichten in ongeveer 250–400 woorden.',
      'De doelen koppelen aan EntreComp-competenties en een groeimindset.',
      'Het werkformulier Goede voornemens invullen: vragen 1–7 beantwoorden en het formulier ondertekenen.',
      'Vragen 8 en 9 gebruiken om de voortgang bij de TOW-gesprekken te evalueren.',
      'De volledige uitwerking bevat volgens de checklist minimaal 750 woorden en komt op de website én Brightspace.',
    ],
    sourcePage: 24,
    status: 'planned',
    deadline: 'Twee dagen vóór het eerste TOW-gesprek; evaluaties bij de volgende gesprekken.',
  },
  {
    id: 'toekomstbrief',
    number: 4,
    title: 'Schrijf een brief uit de nabije toekomst aan jezelf',
    shortTitle: 'Een brief aan later',
    period: 'Periode 2',
    summary:
      'Vanuit het einde van het studiejaar terugkijken op een denkbeeldige ondernemersreis: wat ik hoop te bereiken, welke keuzes ik maak en hoe ik wil groeien.',
    deliverables: [
      'Een persoonlijke toekomstbrief van minimaal 300 woorden schrijven.',
      'Ingaan op bereikte doelen, stappen, obstakels, bepalende keuzes en gevoelens als student en ondernemer.',
      'Een geloofwaardig toekomstbeeld beschrijven met aandacht voor persoonlijke groei en waardecreatie.',
      'De brief plaatsen op de website én Brightspace.',
    ],
    sourcePage: 25,
    status: 'planned',
    deadline: 'Twee dagen vóór het tweede TOW-gesprek.',
  },
  {
    id: 'tow-gesprekken',
    number: 5,
    title: 'TOW-gesprekken met je TOW-docent',
    shortTitle: 'In gesprek over groei',
    period: 'Doorlopend',
    summary:
      'Minimaal drie reflectiegesprekken voorbereiden en vastleggen om mijn ontwikkeling te bespreken, feedback te verwerken en concrete vervolgstappen af te spreken.',
    deliverables: [
      'Voor ieder gesprek een agenda voorbereiden.',
      'Minimaal drie gespreksverslagen van elk minimaal 300 woorden schrijven.',
      'Per verslag een inleiding, samenvatting per agendapunt, conclusies en een actiepuntenlijst opnemen.',
      'Vragen 8 en 9 van het werkformulier Goede voornemens beantwoorden.',
      'Elk verslag op de website én Brightspace plaatsen.',
    ],
    sourcePage: 26,
    status: 'planned',
    deadline: 'Uiterlijk één werkdag na ieder TOW-gesprek.',
  },
  {
    id: 'events',
    number: 6,
    title: 'Deelname aan minimaal 2 events',
    shortTitle: 'Leren buiten de les',
    period: 'Doorlopend',
    summary:
      'Minimaal twee fysieke netwerk- of alumni-events bezoeken en mijn ervaringen, contacten en leerpunten vastleggen in een vlog of creatieve fotocollage.',
    deliverables: [
      'Minimaal twee passende fysieke events bezoeken; online bijeenkomsten tellen niet mee.',
      'Per event een vlog van maximaal vijf minuten óf een creatieve fotocollage met een inhoudelijke samenvatting maken.',
      'Mijn eigen aanwezigheid zichtbaar maken met beeld van vóór, tijdens en na het event.',
      'Per event drie tops en drie tips beschrijven en relevant bewijsmateriaal toevoegen.',
      'De uitwerkingen op de website en Brightspace plaatsen; voor een vlog de verborgen YouTube-link in een Word-document inleveren.',
    ],
    sourcePage: 27,
    status: 'planned',
    deadline: 'Binnen één week na elk event, uiterlijk 3 mei 2027, 23.59 uur.',
  },
  {
    id: 'ondernemersreis',
    number: 7,
    title: 'Terugblik op mijn ondernemersreis',
    shortTitle: 'Terugkijken, vooruitgaan',
    period: 'Periode 4',
    summary:
      'Aan het einde van het jaar terugblikken op mijn toekomstbrief, leerdoelen en ervaringen, en beschrijven hoe ik als persoon en ondernemer ben gegroeid.',
    deliverables: [
      'De ingevulde checklist uit bijlage 9.4 als eerste pagina opnemen.',
      'Een reflectieverslag van ongeveer 750–1000 woorden maken, eventueel in een creatieve vorm.',
      'Terugkijken op mijn toekomstbrief, ondernemersprofiel en persoonlijke leerdoelen.',
      'Mijn lessen over ondernemen en persoonlijke groei onderbouwen met eigen concrete ervaringen.',
      'Eventueel vooruitkijken naar het volgende studiejaar; de uitwerking op de website én Brightspace plaatsen.',
    ],
    sourcePage: 28,
    status: 'planned',
    deadline: '7 mei 2027, 23.59 uur.',
  },
];

export const stageGuidance = {
  title: 'Snuffelstage',
  summary:
    'De stage krijgt een eigen plek in dit portfolio. De precieze stageopdrachten en beoordelingscriteria staan in een aparte stagehandleiding, die nog niet is aangeleverd.',
  confirmedRequirements: [
    'Een eigen pagina met alle stageopdrachten is verplicht voor het portfolio (pagina 23).',
    'De checklist noemt een CV en motivatiebrief voor de snuffelstage (pagina 40).',
    'Het gecombineerde eindassessment duurt twintig minuten en vindt plaats op Hogeschool Rotterdam; ongeveer 25% gaat over TOW en 75% over stage (pagina 13).',
  ],
  missing: [
    'De aparte stagehandleiding met alle stageopdrachten en de rubric.',
    'Naam van het stagebedrijf, stageperiode, werkzaamheden en eigen ervaringen.',
  ],
  planningNote:
    'De handleiding noemt 10 mei tot en met 4 juni 2027 als stageperiode, maar 7 mei 2027 als deadline voor de website inclusief stageopdrachten. Deze planning moet met de docent of de stagehandleiding worden bevestigd.',
  sourcePages: [11, 13, 16, 23, 40],
};
