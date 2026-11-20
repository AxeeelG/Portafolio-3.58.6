import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import {
  ArrowDownToLine,
  ArrowUpRight,
  Bot,
  Braces,
  ChevronRight,
  CircleDot,
  Code2,
  Download,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Home,
  Laptop2,
  Layers3,
  Linkedin,
  Mail,
  Map,
  Menu,
  Monitor,
  Network,
  Radio,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  UserRound,
  Wifi,
  X,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type StationId = 'home' | 'projects' | 'about' | 'skills' | 'education' | 'cv' | 'contact';

type Station = {
  id: StationId;
  label: string;
  eyebrow: string;
  icon: LucideIcon;
  position: string;
  accent: 'cyan' | 'blue' | 'lime';
};

type Project = {
  name: string;
  tag: string;
  description: string;
  color: 'cyan' | 'blue' | 'lime';
  icon: LucideIcon;
};

const stations: Station[] = [
  { id: 'home', label: 'Inicio', eyebrow: 'Punto de entrada', icon: Home, position: 'home-position', accent: 'cyan' },
  { id: 'projects', label: 'Proyectos', eyebrow: 'Lab de producto', icon: Server, position: 'projects-position', accent: 'blue' },
  { id: 'about', label: 'Sobre mí', eyebrow: 'Perfil profesional', icon: Monitor, position: 'about-position', accent: 'cyan' },
  { id: 'skills', label: 'Habilidades', eyebrow: 'Stack tecnológico', icon: Braces, position: 'skills-position', accent: 'lime' },
  { id: 'education', label: 'Formación', eyebrow: 'Aprendizaje continuo', icon: GraduationCap, position: 'education-position', accent: 'blue' },
  { id: 'cv', label: 'CV', eyebrow: 'Trayectoria', icon: FileText, position: 'cv-position', accent: 'cyan' },
  { id: 'contact', label: 'Contacto', eyebrow: 'Conecta conmigo', icon: Radio, position: 'contact-position', accent: 'blue' },
];

const projects: Project[] = [
  { name: 'Erandi', tag: 'Preview de proyecto', description: 'La descripción, tecnologías y enlaces de este proyecto se agregarán cuando estén disponibles.', color: 'cyan', icon: Bot },
  { name: 'HakaShoes', tag: 'Preview de proyecto', description: 'La descripción, tecnologías y enlaces de este proyecto se agregarán cuando estén disponibles.', color: 'blue', icon: Zap },
  { name: 'Bip Bip Papel', tag: 'Preview de proyecto', description: 'La descripción, tecnologías y enlaces de este proyecto se agregarán cuando estén disponibles.', color: 'lime', icon: Sparkles },
];

const navItems: Array<{ id: StationId; label: string; icon: LucideIcon }> = [
  { id: 'home', label: 'Inicio', icon: Home },
  { id: 'projects', label: 'Proyectos', icon: Layers3 },
  { id: 'about', label: 'Sobre mí', icon: UserRound },
  { id: 'skills', label: 'Habilidades', icon: Terminal },
  { id: 'education', label: 'Formación', icon: GraduationCap },
  { id: 'cv', label: 'CV', icon: FileText },
  { id: 'contact', label: 'Contacto', icon: Mail },
];

function App() {
  const [selectedId, setSelectedId] = useState<StationId | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const selectedStation = stations.find((station) => station.id === selectedId);

  useEffect(() => {
    if (!selectedId) return;
    document.getElementById('detail-panel')?.focus();
    if (window.matchMedia('(max-width: 780px)').matches) {
      document.getElementById(`station-${selectedId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedId(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectStation = (id: StationId) => {
    setSelectedId(id);
    if (id !== 'projects') setSelectedProject(null);
    setMenuOpen(false);
  };

  const selectProject = (project: Project) => {
    setSelectedProject(project);
    selectStation('projects');
  };

  return (
    <main className="portfolio-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="scanline" />

      <header className="topbar">
        <button className="brand-mark" onClick={() => selectStation('home')} aria-label="Volver al inicio">
          <span className="brand-symbol"><Code2 size={27} strokeWidth={2.4} /></span>
          <span className="brand-copy">
            <strong>AXEL<span>.DEV</span></strong>
            <small>Portafolio · Full Stack Developer</small>
          </span>
        </button>

        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Abrir navegación" aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Navegación principal">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button key={id} className={selectedId === id ? 'nav-item active' : 'nav-item'} onClick={() => selectStation(id)} aria-current={selectedId === id ? 'page' : undefined}>
              <Icon size={16} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </header>

      <section className="hero-copy" aria-label="Presentación">
        <p className="section-kicker"><span className="status-dot" /> Sistema online · exploración abierta</p>
        <h1>Un desarrollador,<br /><em>un universo digital.</em></h1>
        <p className="hero-description">Explora las estaciones de mi sistema para conocer los proyectos, habilidades y experiencias que construyen mi forma de crear.</p>
        <button className="explore-button" onClick={() => selectStation('projects')}>
          <Map size={16} /> Explorar el mapa <ArrowUpRight size={16} />
        </button>
      </section>

      <section className="world-wrap" aria-label="Mapa interactivo del portafolio">
        <div className={`world-map ${selectedId ? 'has-selection' : ''}`}>
          <div className="map-grid" aria-hidden="true" />
          <div className="grid-haze" aria-hidden="true" />
          <svg className="circuit-map" viewBox="0 0 1200 620" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="circuitGlow" x1="0" x2="1">
                <stop offset="0" stopColor="#00d9ff" stopOpacity=".28" />
                <stop offset=".5" stopColor="#4e7dff" stopOpacity=".95" />
                <stop offset="1" stopColor="#00d9ff" stopOpacity=".32" />
              </linearGradient>
              <filter id="softGlow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <g className="circuit-lines" fill="none" stroke="url(#circuitGlow)" strokeWidth="2" filter="url(#softGlow)">
              <path d="M113 390 H215 L290 330 H430 L490 280" />
              <path d="M270 155 V232 L360 287 H490" />
              <path d="M350 495 V425 L458 360" />
              <path d="M710 308 H832 L914 245 V160" />
              <path d="M680 385 L780 445 H875 L930 505" />
              <path d="M545 422 V500 H615" />
            </g>
            <g className="circuit-nodes" fill="#9bf6ff">
              <circle cx="113" cy="390" r="4" /><circle cx="270" cy="155" r="4" /><circle cx="350" cy="495" r="4" />
              <circle cx="914" cy="160" r="4" /><circle cx="930" cy="505" r="4" /><circle cx="615" cy="500" r="4" />
            </g>
          </svg>

          <div className="map-label label-projects">03 / BUILDS</div>
          <div className="map-label label-contact">UPLINK / 07</div>
          <div className="map-label label-skills">CORE STACK</div>
          <div className="map-label label-education">LEARNING NODE</div>

          <div className="central-core" aria-label="Núcleo del sistema">
            <div className="core-chip"><Code2 size={42} strokeWidth={1.8} /></div>
            <div className="chip-pin pin-one" /><div className="chip-pin pin-two" /><div className="chip-pin pin-three" /><div className="chip-pin pin-four" />
            <span className="core-label">AXEL.DEV <i>CORE</i></span>
          </div>

          {stations.map((station, index) => (
            <StationNode key={station.id} station={station} index={index} selected={selectedId === station.id} onSelect={selectStation} onSelectProject={selectProject} />
          ))}
        </div>
      </section>

      <div className="map-footer">
        <span><Wifi size={13} /> conexión estable</span>
        <span className="footer-divider" />
        <span>07 estaciones activas</span>
        <span className="footer-hint"><CircleDot size={12} /> selecciona una estación para acceder</span>
      </div>

      {selectedStation && <DetailPanel station={selectedStation} project={selectedProject} onClose={() => { setSelectedId(null); setSelectedProject(null); }} onNavigate={selectStation} onSelectProject={selectProject} onClearProject={() => setSelectedProject(null)} />}
    </main>
  );
}

function StationNode({ station, index, selected, onSelect, onSelectProject }: { station: Station; index: number; selected: boolean; onSelect: (id: StationId) => void; onSelectProject: (project: Project) => void }) {
  const Icon = station.icon;
  return (
    <div
      id={`station-${station.id}`}
      className={`station ${station.position} accent-${station.accent} ${selected ? 'selected' : ''}`}
      style={{ '--station-delay': `${index * 90}ms` } as CSSProperties}
    >
      <button className="station-main-hit" type="button" onClick={() => onSelect(station.id)} aria-label={`Abrir ${station.label}`} aria-pressed={selected} />
      <span className="station-halo" />
      <span className="station-art">
        {station.id === 'home' && <Laptop2 className="home-art" size={52} strokeWidth={1.3} />}
        {station.id === 'projects' && <ProjectShowcase onSelectProject={onSelectProject} />}
        {station.id === 'about' && <Workstation />}
        {station.id === 'skills' && <SkillStack />}
        {station.id === 'education' && <EducationStack />}
        {station.id === 'cv' && <CvDocument />}
        {station.id === 'contact' && <ContactDish />}
      </span>
      <button className="station-caption" type="button" onClick={() => onSelect(station.id)} aria-label={`Abrir ${station.label}`}>
        <span className="caption-icon"><Icon size={15} /></span>
        <span><small>{station.eyebrow}</small><strong>{station.label}</strong></span>
        <ChevronRight className="caption-arrow" size={16} />
      </button>
    </div>
  );
}

function ProjectShowcase({ onSelectProject }: { onSelectProject: (project: Project) => void }) {
  return <span className="project-showcase"><span className="showcase-rack"><span className="rack-beam rack-top" /><span className="rack-beam rack-bottom" />{projects.map((project) => <ProjectPreview key={project.name} project={project} onSelectProject={onSelectProject} />)}</span></span>;
}

function ProjectPreview({ project, onSelectProject }: { project: Project; onSelectProject: (project: Project) => void }) {
  const Icon = project.icon;
  return <button className={`project-preview preview-${project.color}`} type="button" onClick={() => onSelectProject(project)} aria-label={`Ver preview de ${project.name}`}><span className="preview-window"><span className="preview-bar"><i /><i /><i /></span><span className="preview-art"><Icon size={20} /></span><span className="preview-lines"><i /><i /><i /></span></span><strong>{project.name}</strong></button>;
}

function Workstation() {
  return <span className="workstation"><span className="monitor monitor-left"><Terminal size={26} /></span><span className="monitor monitor-right"><Braces size={23} /></span><span className="desk-line" /><span className="desk-screen" /><span className="desk-leg" /></span>;
}

function SkillStack() {
  return <span className="skill-stack"><span className="skill-shelf"><span className="shelf-level shelf-level-top"><span className="tech-module module-java">Java</span><span className="tech-module module-react">React</span></span><span className="shelf-level shelf-level-bottom"><span className="tech-module module-ts">TS</span><span className="tech-module module-sql">SQL</span><span className="tech-module module-api">API</span></span></span><RobotArm /></span>;
}

function RobotArm() {
  return <svg className="robot-arm-3d" viewBox="0 0 116 116" fill="none" aria-hidden="true"><defs><linearGradient id="robotMetal" x1="12" y1="8" x2="95" y2="105" gradientUnits="userSpaceOnUse"><stop stopColor="#8ba8ff" /><stop offset=".38" stopColor="#29477b" /><stop offset=".7" stopColor="#101e3f" /><stop offset="1" stopColor="#4feaff" /></linearGradient><linearGradient id="robotLight" x1="0" x2="1"><stop stopColor="#34e4ff" /><stop offset="1" stopColor="#6486ff" /></linearGradient></defs><ellipse cx="61" cy="105" rx="38" ry="7" fill="#0a2040" stroke="#46e6ff" strokeOpacity=".7" /><path d="M28 99h62" stroke="url(#robotLight)" strokeWidth="3" strokeLinecap="round" /><path d="M61 94V77" stroke="url(#robotMetal)" strokeWidth="14" strokeLinecap="round" /><circle cx="61" cy="76" r="12" fill="#152b58" stroke="#6aeaff" strokeWidth="2" /><path d="M61 69 31 45" stroke="url(#robotMetal)" strokeWidth="13" strokeLinecap="round" /><circle cx="29" cy="44" r="10" fill="#10234a" stroke="#5ae9ff" strokeWidth="2" /><path d="m28 37 25-22" stroke="url(#robotMetal)" strokeWidth="11" strokeLinecap="round" /><circle cx="53" cy="15" r="8" fill="#172d5d" stroke="#9fb6ff" strokeWidth="2" /><path d="m58 12 18 5-7 12-14-8M76 17l15 4-7 8-9-5" stroke="url(#robotMetal)" strokeWidth="5" strokeLinejoin="round" /><circle cx="53" cy="15" r="3" fill="#c4ff5b" /><circle cx="61" cy="76" r="4" fill="#c4ff5b" /><circle cx="29" cy="44" r="3" fill="#48e8ff" /></svg>;
}

function EducationStack() {
  return <span className="education-stack"><span className="book book-bottom" /><span className="book book-middle" /><span className="book book-top" /><span className="cap"><span className="cap-top" /><span className="cap-tassel" /></span></span>;
}

function CvDocument() {
  return <span className="cv-document"><span className="cv-sheet"><FileText size={28} /><i /><i /><i /></span><span className="download-orb"><Download size={18} /></span></span>;
}

function ContactDish() {
  return <span className="contact-dish"><span className="dish-base" /><span className="dish-stem" /><span className="dish"><Radio size={43} /><i /><i /></span><span className="signal signal-one" /><span className="signal signal-two" /></span>;
}

function DetailPanel({ station, project, onClose, onNavigate, onSelectProject, onClearProject }: { station: Station; project: Project | null; onClose: () => void; onNavigate: (id: StationId) => void; onSelectProject: (project: Project) => void; onClearProject: () => void }) {
  const content: Record<StationId, { title: string; description: string; detail: ReactNode }> = {
    home: {
      title: 'Bienvenido al sistema.',
      description: 'Este mapa reúne la forma en la que pienso, diseño y construyo productos digitales con intención.',
      detail: <div className="panel-stats"><span><strong>07</strong><small>estaciones</small></span><span><strong>∞</strong><small>curiosidad</small></span><span><strong>01</strong><small>visión</small></span></div>,
    },
    projects: {
      title: 'Ideas convertidas en producto.',
      description: 'Una selección de proyectos donde la tecnología se vuelve clara, útil y memorable.',
      detail: <div className="project-list">{projects.map((projectItem) => <ProjectRow key={projectItem.name} project={projectItem} onSelectProject={onSelectProject} />)}</div>,
    },
    about: {
      title: 'Diseño con lógica. Código con criterio.',
      description: 'Soy Axel Yahir, desarrollador Java Full Stack Jr. Me gusta convertir problemas complejos en experiencias digitales simples, sólidas y humanas.',
      detail: <div className="about-signals"><span><ShieldCheck size={15} /> Código mantenible</span><span><Sparkles size={15} /> Detalle visual</span><span><Network size={15} /> Pensamiento de producto</span></div>,
    },
    skills: {
      title: 'Las herramientas detrás de cada idea.',
      description: 'Un stack en evolución constante, con foco en construir bases sólidas y experiencias que se sienten fluidas.',
      detail: <div className="skill-cloud"><span>Java</span><span>Spring Boot</span><span>React</span><span>TypeScript</span><span>SQL</span><span>Git</span><span>REST APIs</span><span>UX thinking</span></div>,
    },
    education: {
      title: 'Aprender también es construir.',
      description: 'Mi formación combina fundamentos de ingeniería, práctica constante y el hábito de seguir haciendo preguntas.',
      detail: <div className="timeline"><span><b>01</b><span><strong>Ingeniería de Software</strong><small>Fundamentos · arquitectura · desarrollo</small></span></span><span><b>02</b><span><strong>Aprendizaje continuo</strong><small>Full Stack · producto · nuevas herramientas</small></span></span></div>,
    },
    cv: {
      title: 'Mi recorrido, en una página.',
      description: 'Descarga una vista completa de mi experiencia, formación y las tecnologías con las que trabajo.',
      detail: <div className="cv-state"><div className="cv-state-copy"><FileText size={19} /><span><strong>Archivo de CV no cargado</strong><small>La vista y descarga se habilitarán al añadir el documento.</small></span></div><button className="panel-download" type="button" disabled><Download size={17} /> Descargar CV <ArrowDownToLine size={16} /></button></div>,
    },
    contact: {
      title: 'Abramos un canal.',
      description: '¿Tienes una idea, un reto o simplemente quieres conversar sobre tecnología? Estoy a un mensaje de distancia.',
      detail: <div className="contact-links"><a href="mailto:hola@axel.dev"><Mail size={16} /> hola@axel.dev <ArrowUpRight size={14} /></a><a href="https://github.com" target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ExternalLink size={14} /></a><a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ExternalLink size={14} /></a></div>,
    },
  };

  const stationContent = content[station.id];
  const currentIndex = stations.findIndex((item) => item.id === station.id);
  const nextStation = stations[(currentIndex + 1) % stations.length];

  return (
    <aside id="detail-panel" className="detail-panel" tabIndex={-1} role="dialog" aria-modal="false" aria-labelledby="detail-title" aria-describedby="detail-description">
      <div className="panel-beam" />
      <div className="panel-head">
        <span className="panel-code">NODE / 0{currentIndex + 1}</span>
        <button className="close-panel" onClick={onClose} aria-label="Volver al mapa" title="Volver al mapa"><X size={17} /><span>mapa</span></button>
      </div>
      <div className="panel-body">
        <p className="panel-eyebrow"><span className="status-dot" /> {station.eyebrow}</p>
        <h2 id="detail-title">{stationContent.title}</h2>
        <p id="detail-description" className="panel-description">{stationContent.description}</p>
        {project && station.id === 'projects' ? <ProjectDetail project={project} onBack={onClearProject} /> : stationContent.detail}
      </div>
      <button className="next-node" onClick={() => onNavigate(nextStation.id)}><span>Siguiente estación</span><strong>{nextStation.label} <ChevronRight size={15} /></strong></button>
    </aside>
  );
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  const Icon = project.icon;
  return <div className="project-detail"><div className={`project-detail-visual project-${project.color}`}><span className="detail-visual-grid" /><span className="detail-visual-icon"><Icon size={34} /></span><strong>{project.name}</strong><small>vista previa visual</small></div><p className="project-detail-copy">{project.description}</p><div className="project-detail-section"><span>TECNOLOGÍAS</span><strong>Información pendiente de cargar</strong></div><div className="project-detail-section"><span>CAPTURAS Y ENLACES</span><strong>No hay archivos o enlaces disponibles todavía</strong></div><button className="project-back" type="button" onClick={onBack}><ChevronRight size={15} className="back-chevron" /> Volver a proyectos</button></div>;
}

function ProjectRow({ project, onSelectProject }: { project: Project; onSelectProject: (project: Project) => void }) {
  const Icon = project.icon;
  return <button className={`project-row project-${project.color}`} type="button" onClick={() => onSelectProject(project)}><span className="project-icon"><Icon size={21} /></span><span className="project-copy"><small>{project.tag}</small><strong>{project.name}</strong><em>{project.description}</em></span><ArrowUpRight className="project-arrow" size={17} /></button>;
}

export default App;
