import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  BookOpen, 
  Activity, 
  RefreshCw, 
  Download, 
  CheckCircle, 
  Layers, 
  Database, 
  Sparkles, 
  Grid, 
  Camera, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  Cpu, 
  ShieldCheck, 
  SmartphoneNfc,
  Heart,
  ExternalLink,
  Plus,
  Trash2,
  FileSpreadsheet,
  Check,
  AlertCircle,
  Search,
  Filter,
  FolderOpen,
  Copy,
  Terminal,
  Twitter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Interfaces for our interactive widgets
interface VocabItem {
  word: string;
  article: 'der' | 'die' | 'das' | '';
  plural: string;
  english: string;
  example: string;
}

const SAMPLE_VOCAB: Record<string, VocabItem[]> = {
  'A1': [
    { word: 'Apfel', article: 'der', plural: 'Äpfel', english: 'apple', example: 'Ich esse einen roten Apfel.' },
    { word: 'Schule', article: 'die', plural: 'Schulen', english: 'school', example: 'Die Schule ist sehr groß.' },
    { word: 'Buch', article: 'das', plural: 'Bücher', english: 'book', example: 'Das Buch liegt auf dem Tisch.' }
  ],
  'A2': [
    { word: 'Entscheidung', article: 'die', plural: 'Entscheidungen', english: 'decision', example: 'Das ist eine schwere Entscheidung.' },
    { word: 'Erfolg', article: 'der', plural: 'Erfolge', english: 'success', example: 'Fleiß bringt oft Erfolg.' },
    { word: 'Geheimnis', article: 'das', plural: 'Geheimnisse', english: 'secret', example: 'Ich habe ein kleines Geheimnis.' }
  ],
  'B1': [
    { word: 'Verantwortung', article: 'die', plural: 'Verantwortungen', english: 'responsibility', example: 'Wir tragen die Verantwortung für die Umwelt.' },
    { word: 'ausgezeichnet', article: '', plural: '', english: 'excellent', example: 'Ihre Deutschkenntnisse sind ausgezeichnet.' },
    { word: 'Herausforderung', article: 'die', plural: 'Herausforderungen', english: 'challenge', example: 'Das neue Projekt ist eine Herausforderung.' }
  ],
  'B2': [
    { word: 'Voraussetzung', article: 'die', plural: 'Voraussetzungen', english: 'requirement / prerequisite', example: 'Gute Noten sind eine Voraussetzung für das Stipendium.' },
    { word: 'nachhaltig', article: '', plural: '', english: 'sustainable', example: 'Wir müssen nachhaltiger leben.' },
    { word: 'missverstehen', article: '', plural: '', english: 'to misunderstand', example: 'Bitte missverstehen Sie mich nicht.' }
  ],
  'C1': [
    { word: 'Gewährleisten', article: '', plural: '', english: 'to guarantee / ensure', example: 'Wir müssen die Sicherheit gewährleisten.' },
    { word: 'Beeinträchtigung', article: 'die', plural: 'Beeinträchtigungen', english: 'impairment / disruption', example: 'Es gibt keine Beeinträchtigungen im Zugverkehr.' },
    { word: 'kontrovers', article: '', plural: '', english: 'controversial', example: 'Über dieses Thema wird kontrovers diskutiert.' }
  ]
};

const SCREENSHOTS_DATA = [
  {
    id: 'dashboard',
    title: 'Home Dashboard',
    desc: 'The centralized hub for your German study session. Keep tabs on daily goals, current streaks, due review items, and live statistics at a single glance.',
    badge: 'Home',
    image: 'assets/preview/Home.png'
  },
  {
    id: 'profile',
    title: 'Personal Profile',
    desc: 'Track your personal details, highest learning streaks, total XP achievements, mastered items count, and overall progress stats.',
    badge: 'Profile',
    image: 'assets/preview/Profile.png'
  },
  {
    id: 'learn-1',
    title: 'Structured Lessons',
    desc: 'Navigate topic levels and complete interactive German curriculum tasks designed precisely to step up your vocabulary skills.',
    badge: 'Learn Path',
    image: 'assets/preview/Learn-1.png'
  },
  {
    id: 'learn-2',
    title: 'Vocabulary Card Details',
    desc: 'Examine vocabulary details with voice pronunciations, English/Bangla meanings, and example sentences. Rate recall difficulty instantly.',
    badge: 'Study Card',
    image: 'assets/preview/Learn-2.png'
  },
  {
    id: 'practice',
    title: 'Practice Hub',
    desc: 'Complete focused workouts including noun recall, verb conjugation patterns, and adjective declension drills.',
    badge: 'Practice',
    image: 'assets/preview/Practice.png'
  },
  {
    id: 'revision',
    title: 'Revision System',
    desc: 'Access your pending spaced repetitions, review confused words, and lock in long-term retention of learned elements.',
    badge: 'Revision',
    image: 'assets/preview/revision.png'
  },
  {
    id: 'stats',
    title: 'Learning Statistics',
    desc: 'Beautifully visualized weekly charts, learning heatmaps, progression metrics, and proficiency benchmarks.',
    badge: 'Statistics',
    image: 'assets/preview/Stats.png'
  },
  {
    id: 'workspace',
    title: 'Study Workspace',
    desc: 'An efficient area to organize custom study folders, attach notes to complex words, and group words together.',
    badge: 'Workspace',
    image: 'assets/preview/study-workspace.png'
  },
  {
    id: 'learned',
    title: 'Learned Vocabulary',
    desc: 'Keep track of all vocabulary you have fully mastered and moved to your completed dictionary archive.',
    badge: 'Mastery',
    image: 'assets/preview/Learned.png'
  },
  {
    id: 'vocab',
    title: 'Vocabulary Manager',
    desc: 'A comprehensive dictionary browser with robust search, filtering by level, manual addition, batch import, and OCR scan tools.',
    badge: 'Manager',
    image: 'assets/preview/vocab-manager.png'
  },
  {
    id: 'backup',
    title: 'Backup & Restore',
    desc: 'Seamlessly export full backup files or import CSV/JSON custom word spreadsheets to keep your data portable.',
    badge: 'Backup',
    image: 'assets/preview/Backup&restore.png'
  }
];

const VOCAB_FORMATS = {
  Noun: `WORD: der Tisch
PLURAL: die Tische
PATTERN: + -e
EN: table
BN: own language
EXAMPLE: Der Tisch ist groß. / own language
LEVEL: A1/A2...`,

  Verb: `WORD: machen
PRÄT: machte
PERFEKT: hat gemacht
EN: to do / make
BN: own language
GRAMMAR: Object + Akk
EXAMPLE: Ich mache Hausaufgaben. / own language
LEVEL: A1/A2...`,

  Adjective: `WORD: gut
COMPARATIVE: besser
SUPERLATIVE: am besten
EN: good
BN: own language
EXAMPLE: Milch ist gut für Kinder. / own language
LEVEL: A1/A2...`,

  Others: `WORD: schnell
EN: fast / quickly
BN: own language
EXAMPLE: Er läuft schnell. / own language
TYPE: Adverb
LEVEL: A1/A2...`
};

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'dashboard' | 'screenshots'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interactive Dashboard Level Selector
  const [selectedCefr, setSelectedCefr] = useState<string>('B1');
  const [userXp, setUserXp] = useState<number>(340);
  const [streakCount, setStreakCount] = useState<number>(14);
  const [completedDailyGoals, setCompletedDailyGoals] = useState<boolean>(false);
  const [dueReviews, setDueReviews] = useState<number>(8);

  // Vocabulary list state (simulating real app state)
  const [userVocabulary, setUserVocabulary] = useState<VocabItem[]>(SAMPLE_VOCAB['B1']);
  const [newWord, setNewWord] = useState('');
  const [newEnglish, setNewEnglish] = useState('');
  const [newArticle, setNewArticle] = useState<'der' | 'die' | 'das' | ''>('');
  const [vocabSearch, setVocabSearch] = useState('');

  // Screenshot slider state
  const [currentScreenIdx, setCurrentScreenIdx] = useState(0);

  // User uploaded screenshot persisted in localStorage
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(() => {
    return localStorage.getItem('sprachx_screenshot') || null;
  });
  const [isDragging, setIsDragging] = useState(false);

  const handleScreenshotUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setScreenshotUrl(base64String);
      localStorage.setItem('sprachx_screenshot', base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleScreenshotUpload(file);
    }
  };

  // Spaced Repetition Flashcard Interactive
  const [currentFlashcardIdx, setCurrentFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewCountToday, setReviewCountToday] = useState(dueReviews);

  // Data port simulation state
  const [importStatus, setImportStatus] = useState<'idle' | 'importing' | 'success'>('idle');
  const [importCount, setImportCount] = useState(0);

  // AI Generator simulation state
  const [aiPrompt, setAiPrompt] = useState('Verkehr und Reise');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiGeneratedList, setAiGeneratedList] = useState<VocabItem[]>([]);

  // OCR simulation state
  const [ocrStatus, setOcrStatus] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [scannedWord, setScannedWord] = useState<VocabItem | null>(null);

  // Download simulation state
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [downloadStep, setDownloadStep] = useState<'idle' | 'preparing' | 'ready'>('idle');
  const [downloadProgress, setDownloadProgress] = useState(0);

  // FAQ states
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Lightbox and Copy states
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Watch level change to load appropriate list
  useEffect(() => {
    setUserVocabulary(SAMPLE_VOCAB[selectedCefr] || SAMPLE_VOCAB['B1']);
  }, [selectedCefr]);

  // Manage Flashcard swipe and simulation
  const handleReviewScore = (quality: 'easy' | 'good' | 'hard') => {
    setIsFlipped(false);
    setTimeout(() => {
      if (reviewCountToday > 0) {
        setReviewCountToday(prev => prev - 1);
        setUserXp(prev => prev + 15);
      }
      setCurrentFlashcardIdx((prev) => (prev + 1) % userVocabulary.length);
    }, 200);
  };

  // Simulate AI vocabulary generation
  const handleAiGeneration = () => {
    if (aiGenerating) return;
    setAiGenerating(true);
    setTimeout(() => {
      const generated: VocabItem[] = [
        { word: 'Fahrkarte', article: 'die', plural: 'Fahrkarten', english: 'ticket', example: 'Hast du eine Fahrkarte gekauft?' },
        { word: 'Verspätung', article: 'die', plural: 'Verspätungen', english: 'delay', example: 'Der Zug hat leider 15 Minuten Verspätung.' },
        { word: 'Gleis', article: 'das', plural: 'Gleise', english: 'platform / track', example: 'Der ICE fährt heute von Gleis 4 ab.' }
      ];
      setAiGeneratedList(generated);
      setAiGenerating(false);
      setUserXp(prev => prev + 25);
    }, 1500);
  };

  const addGeneratedToCollection = (item: VocabItem) => {
    setUserVocabulary(prev => [item, ...prev]);
    setAiGeneratedList(prev => prev.filter(i => i.word !== item.word));
  };

  // Simulate OCR Scan from image
  const handleOcrScan = () => {
    if (ocrStatus === 'scanning') return;
    setOcrStatus('scanning');
    setTimeout(() => {
      setScannedWord({
        word: 'Gebrauchsanweisung',
        article: 'die',
        plural: 'Gebrauchsanweisungen',
        english: 'instruction manual',
        example: 'Lies bitte zuerst die Gebrauchsanweisung.'
      });
      setOcrStatus('success');
    }, 1800);
  };

  const addOcrToCollection = () => {
    if (scannedWord) {
      setUserVocabulary(prev => [scannedWord, ...prev]);
      setScannedWord(null);
      setOcrStatus('idle');
      setUserXp(prev => prev + 10);
    }
  };

  // Simulate JSON/CSV Import
  const handleDataImport = () => {
    if (importStatus === 'importing') return;
    setImportStatus('importing');
    setTimeout(() => {
      const imported: VocabItem[] = [
        { word: 'Zufriedenheit', article: 'die', plural: 'Zufriedenheiten', english: 'satisfaction', example: 'Kunden-Zufriedenheit ist uns sehr wichtig.' },
        { word: 'Unternehmen', article: 'das', plural: 'Unternehmen', english: 'company / enterprise', example: 'Das Unternehmen hat 500 Mitarbeiter.' },
        { word: 'Ziel', article: 'das', plural: 'Ziele', english: 'goal / destination', example: 'Wir haben unser Ziel pünktlich erreicht.' }
      ];
      setUserVocabulary(prev => [...imported, ...prev]);
      setImportCount(imported.length);
      setImportStatus('success');
      setUserXp(prev => prev + 30);
      setTimeout(() => setImportStatus('idle'), 4000);
    }, 1500);
  };

  // Simulated Download process
  const triggerApkDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Save lead to mock local storage
    const leads = JSON.parse(localStorage.getItem('sprachx_leads') || '[]');
    leads.push({ email, date: new Date().toISOString() });
    localStorage.setItem('sprachx_leads', JSON.stringify(leads));

    setDownloadStep('preparing');
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadStep('ready');
          
          // Trigger file download simulation
          const element = document.createElement("a");
          const file = new Blob(["Mock SprachX Premium APK File"], {type: 'text/plain'});
          element.href = URL.createObjectURL(file);
          element.download = "sprachx-v1.2.4-free.apk";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Manual word addition
  const handleAddCustomWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord || !newEnglish) return;
    const added: VocabItem = {
      word: newWord,
      article: newArticle,
      plural: '',
      english: newEnglish,
      example: `Das ist ein Beispielsatz für ${newWord}.`
    };
    setUserVocabulary(prev => [added, ...prev]);
    setNewWord('');
    setNewEnglish('');
    setNewArticle('');
    setUserXp(prev => prev + 10);
  };

  const handleDeleteWord = (wordToDelete: string) => {
    setUserVocabulary(prev => prev.filter(v => v.word !== wordToDelete));
  };

  const filteredVocab = userVocabulary.filter(v => 
    v.word.toLowerCase().includes(vocabSearch.toLowerCase()) || 
    v.english.toLowerCase().includes(vocabSearch.toLowerCase())
  );

  const handleCopyFormat = (text: string, formatName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(formatName);
    setTimeout(() => {
      setCopiedFormat(null);
    }, 2000);
  };

  const activeScreenshot = SCREENSHOTS_DATA[currentScreenIdx];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white flex flex-col font-sans selection:bg-[#F5A623] selection:text-black">
      
      {/* BACKGROUND GRAPHICS */}
      <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-[#F5A623]/10 via-[#0B0F17]/0 to-[#0B0F17]/0 pointer-events-none" />
      <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-[#F5A623]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[450px] h-[450px] bg-[#F5A623]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* HEADER NAVBAR */}
      <nav id="navbar-main" className="sticky top-0 z-40 bg-[#0B0F17]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 md:px-12 flex justify-between items-center">
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <img 
            src="assets/logo.png" 
            alt="SprachX Logo" 
            className="h-10 w-auto object-contain block shrink-0"
            referrerPolicy="no-referrer"
          />
          <span className="text-2xl font-bold tracking-tight font-display flex items-center">
            Sprach<span className="text-[#F5A623]">X</span>
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8 text-sm text-slate-300 font-medium">
          <a href="#hero-section" className="hover:text-[#F5A623] transition-colors">Home</a>
          <a href="#features-section" className="hover:text-[#F5A623] transition-colors">Features</a>
          <a href="#screenshots-section" className="hover:text-[#F5A623] transition-colors">Preview</a>
          <a href="#statistics-section" className="hover:text-[#F5A623] transition-colors">Statistics</a>
          <a href="#why-section" className="hover:text-[#F5A623] transition-colors">Why SprachX</a>
          <a href="#download-section" className="hover:text-[#F5A623] transition-colors">Download</a>
          <a href="#faq-section" className="hover:text-[#F5A623] transition-colors">FAQ</a>
        </div>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-4">
          <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-slate-400 font-medium">
            Android supported
          </span>
          <button 
            onClick={() => setIsDownloadOpen(true)}
            className="px-5 py-2.5 bg-[#F5A623] hover:bg-amber-500 active:scale-95 text-black font-semibold text-sm rounded-lg shadow-lg shadow-[#F5A623]/25 hover:shadow-[#F5A623]/40 transition-all cursor-pointer"
          >
            Download APK
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? (
            <span className="text-sm font-bold tracking-wider uppercase">Close</span>
          ) : (
            <span className="text-sm font-bold tracking-wider uppercase">Menu</span>
          )}
        </button>
      </nav>

      {/* MOBILE MENU PANEL */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden fixed top-[69px] inset-x-0 bg-[#0E131F]/95 backdrop-blur-lg border-b border-white/10 z-30 p-6 flex flex-col gap-4 shadow-xl"
          >
            <a href="#hero-section" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-200 font-medium hover:text-[#F5A623]">Home</a>
            <a href="#features-section" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-200 font-medium hover:text-[#F5A623]">Features</a>
            <a href="#screenshots-section" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-200 font-medium hover:text-[#F5A623]">Preview</a>
            <a href="#statistics-section" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-200 font-medium hover:text-[#F5A623]">Statistics</a>
            <a href="#why-section" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-200 font-medium hover:text-[#F5A623]">Why SprachX</a>
            <a href="#download-section" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-200 font-medium hover:text-[#F5A623]">Download</a>
            <a href="#faq-section" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-200 font-medium hover:text-[#F5A623]">FAQ</a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setIsDownloadOpen(true);
              }}
              className="w-full text-center py-3 bg-[#F5A623] text-black font-bold rounded-lg mt-2 shadow-lg"
            >
              Download SprachX APK
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header id="hero-section" className="relative w-full max-w-7xl mx-auto px-6 pt-16 pb-24 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column info */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          
          {/* Accent Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5A623]/10 border border-[#F5A623]/25 rounded-full text-[#F5A623] text-xs font-semibold uppercase tracking-wider mx-auto lg:mx-0">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Independent & Privacy-Focused Workspace</span>
          </div>

          {/* Epic Title */}
          <h1 className="text-4xl sm:text-6xl xl:text-[4.75rem] font-black font-display tracking-tight leading-[1.05] text-white">
            Learn German. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] via-amber-400 to-yellow-500">Smarter.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light font-sans">
            SprachX combines vocabulary, grammar, spaced repetition, and sentence practice into one focused learning experience.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-2">
            <button 
              onClick={() => setIsDownloadOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-[#F5A623] hover:bg-amber-500 text-black font-bold text-sm rounded-xl shadow-xl shadow-[#F5A623]/20 hover:scale-[1.02] transform transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download APK
            </button>
            <a 
              href="#features-section"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm rounded-xl text-center hover:scale-[1.02] transform transition-all"
            >
              Explore Features
            </a>
          </div>

          {/* Product Highlights Badges */}
          <div className="pt-6 border-t border-white/5 flex flex-wrap justify-center lg:justify-start items-center gap-2 max-w-2xl">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] border border-white/10 rounded-full text-xs font-medium text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></span>
              Vocabulary Manager
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] border border-white/10 rounded-full text-xs font-medium text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></span>
              Grammar Practice
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] border border-[#F5A623]/20 rounded-full text-xs font-medium text-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse"></span>
              Smart Reviews
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5A623]/5 border border-[#F5A623]/20 rounded-full text-xs font-bold text-amber-400">
              CEFR A1–C1
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] border border-white/10 rounded-full text-xs font-medium text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></span>
              Progress Tracking
            </span>
          </div>

        </div>

        {/* Right column: Interactive App Dashboard Phone Mockup */}
        <div className="lg:col-span-5 relative flex justify-center" style={{ perspective: '1500px' }}>
          
          {/* Light Ambient backdrop aura */}
          <div className="absolute inset-0 bg-[#F5A623]/5 rounded-full blur-3xl pointer-events-none transform translate-y-12"></div>

          {/* Phone container */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative w-[310px] h-[610px] bg-[#0c101b] rounded-[44px] p-3.5 border-[6px] transition-all duration-500 ${
              isDragging ? 'border-[#F5A623] bg-[#1a1c24] ring-8 ring-[#F5A623]/10' : 'border-slate-800/90'
            }`}
            style={{
              transform: isDragging ? 'none' : 'rotateX(10deg) rotateY(-16deg) rotateZ(3deg)',
              transformStyle: 'preserve-3d',
              boxShadow: '-32px 32px 64px rgba(0, 0, 0, 0.85), -12px 12px 24px rgba(245, 166, 35, 0.04)',
            }}
          >
            
            {/* Hardware buttons */}
            <div className="absolute top-28 -left-[9px] w-[3px] h-10 bg-slate-800 rounded-l-md border-l border-y border-white/10" style={{ transform: 'translateZ(-5px)' }}></div>
            <div className="absolute top-44 -left-[9px] w-[3px] h-10 bg-slate-800 rounded-l-md border-l border-y border-white/10" style={{ transform: 'translateZ(-5px)' }}></div>
            <div className="absolute top-36 -right-[9px] w-[3px] h-12 bg-slate-800 rounded-r-md border-r border-y border-white/10" style={{ transform: 'translateZ(-5px)' }}></div>

            {/* Glass reflection overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent z-25 rounded-[38px]" />

            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-800 rounded-b-2xl z-20"></div>

            {/* Inner Phone Screen */}
            <div className="w-full h-full bg-[#080B11] rounded-[32px] overflow-hidden flex flex-col p-4 text-white text-xs select-none relative group/screen">
              
              {/* DRAG OVERLAY */}
              {isDragging && (
                <div className="absolute inset-0 z-30 bg-black/90 flex flex-col items-center justify-center p-4 text-center border-2 border-dashed border-[#F5A623] rounded-[32px] animate-pulse">
                  <Download className="w-8 h-8 text-[#F5A623] mb-2 animate-bounce" />
                  <span className="text-xs font-bold text-[#F5A623] uppercase tracking-wider">Drop Screenshot</span>
                  <span className="text-[9px] text-slate-400 mt-1">To load your SprachX Home Dashboard</span>
                </div>
              )}

              {/* IMAGE OVERLAY: If custom screenshot uploaded */}
              {screenshotUrl ? (
                <div className="absolute inset-0 z-10 bg-[#080B11] rounded-[32px] overflow-hidden flex flex-col">
                  <img 
                    src={screenshotUrl} 
                    alt="SprachX Dashboard Screenshot" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle hover option to change or remove */}
                  <div className="absolute inset-0 bg-black/90 opacity-0 group-hover/screen:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 text-center z-20">
                    <span className="text-[11px] font-bold text-white">Using Custom Screenshot</span>
                    <label className="px-3 py-1.5 bg-[#F5A623] hover:bg-amber-500 text-black font-semibold rounded text-[10px] cursor-pointer transition-all">
                      Change Screenshot
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleScreenshotUpload(file);
                          }
                        }}
                      />
                    </label>
                    <button 
                      onClick={() => {
                        setScreenshotUrl(null);
                        localStorage.removeItem('sprachx_screenshot');
                      }}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded text-[10px] transition-all cursor-pointer"
                    >
                      Reset to Mockup
                    </button>
                  </div>
                </div>
              ) : (
                /* GORGEOUS REAL SCREENSHOT DISPLAY */
                <div className="absolute inset-0 z-10 bg-[#080B11] rounded-[32px] overflow-hidden flex flex-col">
                  <img 
                    src="assets/preview/Home.png" 
                    alt="SprachX Home Dashboard" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* UPLOADER ACTION OVERLAY */}
                  <label className="absolute bottom-12 right-2 z-20 w-8 h-8 rounded-full bg-[#F5A623] text-black shadow-lg hover:bg-amber-500 flex items-center justify-center cursor-pointer transition-all hover:scale-110" title="Upload actual dashboard screenshot">
                    <Camera className="w-4 h-4" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleScreenshotUpload(file);
                        }
                      }}
                    />
                  </label>
                </div>
              )}

              {/* Home Indicator */}
              <div className="mt-3 flex justify-center">
                <div className="w-24 h-1 bg-slate-700 rounded-full"></div>
              </div>

            </div>

          </div>

          {/* Left/Right Floating specs */}
          <div className="absolute top-20 -left-12 bg-[#121824]/90 border border-white/10 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-2xl backdrop-blur-md hidden xl:flex">
            <Layers className="w-4 h-4 text-[#F5A623]" />
            <div>
              <p className="font-bold">CEFR A1-C1</p>
              <p className="text-[10px] text-slate-400">Complete curriculum</p>
            </div>
          </div>

          <div className="absolute bottom-24 -right-12 bg-[#121824]/90 border border-white/10 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-2xl backdrop-blur-md hidden xl:flex">
            <Database className="w-4 h-4 text-[#F5A623]" />
            <div>
              <p className="font-bold">Offline Database</p>
              <p className="text-[10px] text-slate-400">Secure storage</p>
            </div>
          </div>

        </div>

      </header>

      {/* CORE HIGHLIGHT INFO BANNER */}
      <section className="bg-[#0C111D] border-y border-white/5 py-12">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-[#F5A623] font-display">Structured CEFR Curriculum</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Absorb German naturally. Navigate high-fidelity progress paths from A1 up to C1 structured levels, built precisely for continuous vocabulary development.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-[#F5A623] font-display">Flexible Data Control</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your collection belongs entirely to you. Import existing dictionary spreadsheets and export secure backup packages anytime for full data portability.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-[#F5A623] font-display">Deliberate Study Workspaces</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Learn without clutter. Organize vocabularies in custom folders, attach contextual reference notes, and review items using smart interval cards.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION (Beautiful modern cards from the actual app modules) */}
      <section id="features-section" className="w-full max-w-7xl mx-auto px-6 py-20 md:px-12 border-b border-white/5">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">Explore SprachX Modules</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-display text-white">
            Everything you need for masterclass German study.
          </h2>
          <p className="text-base text-slate-400 leading-relaxed font-light">
            Each feature represents the verified layout and capabilities of the real application. Experience structured workspaces built specifically for effective language study.
          </p>
        </div>

        {/* 10 Real App Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Feature 1: Smart Dashboard */}
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 hover:border-[#F5A623]/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#F5A623] group-hover:scale-110 transition-transform">
                  <Grid className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Module 01</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">Smart Dashboard</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your centralized command center. View active study progress, navigate CEFR curriculum bases, and inspect daily review slots at a single glance.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <span>Home Hub</span>
              <span className="text-[#F5A623]">Active</span>
            </div>
          </div>

          {/* Feature 2: Personal Progress */}
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 hover:border-[#F5A623]/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#F5A623] group-hover:scale-110 transition-transform">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Module 02</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">Personal Progress</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Stay updated on your accomplishments. Track your total milestones and customize profiles to keep up-to-date with your overall studying rhythm.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <span>Profile Hub</span>
              <span className="text-[#F5A623]">Milestones</span>
            </div>
          </div>

          {/* Feature 3: Vocabulary Learning */}
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 hover:border-[#F5A623]/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#F5A623] group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Module 03</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">Vocabulary Learning</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Absorb vocabularies with card layouts detailing pronunciations, translations, example sentences, and responsive response quality levels.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <span>Card Modules</span>
              <span className="text-[#F5A623]">High Fidelity</span>
            </div>
          </div>

          {/* Feature 4: Practice Hub */}
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 hover:border-[#F5A623]/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#F5A623] group-hover:scale-110 transition-transform">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Module 04</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">Practice Hub</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Test your skills with interactive exercises. Review genders, decline adjectives, conjugate verbs, and sharpen translation accuracies instantly.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <span>Drill Workouts</span>
              <span className="text-[#F5A623]">Interactive</span>
            </div>
          </div>

          {/* Feature 5: Revision System */}
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 hover:border-[#F5A623]/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#F5A623] group-hover:scale-110 transition-transform">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Module 05</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">Revision System</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Smart spacing ensures vocabulary is reviewed right on time. Monitor pending tasks and isolate challenging elements to lock in long-term masteries.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <span>Spacing Queue</span>
              <span className="text-[#F5A623]">Calibrated</span>
            </div>
          </div>

          {/* Feature 6: Learning Statistics */}
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 hover:border-[#F5A623]/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#F5A623] group-hover:scale-110 transition-transform">
                  <SmartphoneNfc className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Module 06</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">Learning Statistics</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                A visual journal detailing your performance. Analyze streaks and progression parameters to review exactly how your knowledge scales.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <span>Heatmap Metrics</span>
              <span className="text-[#F5A623]">Analytical</span>
            </div>
          </div>

          {/* Feature 7: Study Workspace */}
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 hover:border-[#F5A623]/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#F5A623] group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Module 07</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">Study Workspace</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Stay organized and clutter-free. Bundle words into folders, log contextual grammar tips, and catalog your study materials neatly.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <span>Workspace Directory</span>
              <span className="text-[#F5A623]">Organized</span>
            </div>
          </div>

          {/* Feature 8: Learned Vocabulary */}
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 hover:border-[#F5A623]/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#F5A623] group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Module 08</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">Learned Vocabulary</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                A dedicated space for fully memorized terms. Filter collections and reference items that you have completely incorporated into your active vocabulary.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <span>Mastery Archive</span>
              <span className="text-[#F5A623]">Locked-In</span>
            </div>
          </div>

          {/* Feature 9: Vocabulary Manager */}
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 hover:border-[#F5A623]/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#F5A623] group-hover:scale-110 transition-transform">
                  <Database className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Module 09</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">Vocabulary Manager</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                The core engine to catalog your dictionary files. Search and filter item list groups, trigger scanning parameters, and generate structured word definitions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <span>Verified Layout</span>
              <span className="text-[#F5A623]">Database</span>
            </div>
          </div>

          {/* Feature 10: Backup & Restore */}
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 hover:border-[#F5A623]/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#F5A623] group-hover:scale-110 transition-transform">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Module 10</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">Backup & Restore</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Own your hard-earned studying collection. Complete exports to standard file architectures or load backups safely.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <span>Backup utility</span>
              <span className="text-[#F5A623]">Database Portability</span>
            </div>
          </div>

        </div>

      </section>

      {/* SMART DASHBOARD PREVIEW / INTERACTIVE DRILLS */}
      <section id="dashboard-section" className="w-full max-w-7xl mx-auto px-6 py-20 md:px-12 border-b border-white/5">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Interactive controls info */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">Interactive Control Hub</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight text-white">
              Simulate and fine-tune your workspace dashboard
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Use these real-time sliders and switches to preview how the SprachX engine and indicators adapt immediately to your study velocity, statistics, and CEFR level targets.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/5">
              
              {/* Streak controller */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Learning Streak</span>
                  <span className="font-bold text-[#F5A623]">{streakCount} Days</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="90" 
                  value={streakCount}
                  onChange={(e) => setStreakCount(parseInt(e.target.value))}
                  className="w-full accent-[#F5A623] bg-slate-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>

              {/* XP progress controller */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Cumulative Experience (XP)</span>
                  <span className="font-bold text-[#F5A623]">{userXp} XP</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="1200" 
                  value={userXp}
                  onChange={(e) => setUserXp(parseInt(e.target.value))}
                  className="w-full accent-[#F5A623] bg-slate-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>

              {/* CEFR Level buttons */}
              <div className="space-y-2">
                <span className="text-xs text-slate-400 block font-semibold">Active Curriculum Base:</span>
                <div className="flex gap-1.5">
                  {['A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => (
                    <button
                      key={`drill-lvl-${lvl}`}
                      onClick={() => setSelectedCefr(lvl)}
                      className={`px-3 py-1.5 rounded font-bold text-xs cursor-pointer transition-colors ${
                        selectedCefr === lvl 
                          ? 'bg-[#F5A623] text-black font-extrabold' 
                          : 'bg-white/5 hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Elegant mock dashboard viewport */}
          <div className="lg:col-span-8 bg-[#0E131F]/90 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-mono tracking-wider">WORKSPACE SCREEN PREVIEW</span>
                <h3 className="text-xl font-bold font-display text-white">Smart Study Dashboard</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs text-slate-400 font-medium">Local SQLite Sync Active</span>
              </div>
            </div>

            {/* Dashboard grid mock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Daily word goal widget */}
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-medium">Daily Word Goal</span>
                  <span className="text-xs font-bold text-[#F5A623]">12 / 15 Words</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#F5A623] h-full" style={{ width: '80%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>90% score accuracy</span>
                  <span>3 words remaining</span>
                </div>
              </div>

              {/* Quick continue lesson */}
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl space-y-2.5 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Quick Continue Lesson</span>
                  <h4 className="text-sm font-bold text-slate-200 mt-1">Conjunctions & Clauses</h4>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Section 4.2</span>
                  <span className="text-[#F5A623] font-bold flex items-center">Continue <ChevronRight className="w-3.5 h-3.5" /></span>
                </div>
              </div>

              {/* Today's due reviews widget */}
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex justify-between items-center sm:col-span-2 lg:col-span-1">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Today's Due Reviews</span>
                  <h4 className="text-2xl font-bold text-[#F5A623] font-mono mt-1">{reviewCountToday} Words</h4>
                  <span className="text-[10px] text-slate-500 block">Spaced repetition queue</span>
                </div>
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <RefreshCw className="w-5 h-5 text-amber-400" />
                </div>
              </div>

            </div>

            {/* Mini Vocabulary Search Widget inside Mock */}
            <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h4 className="text-sm font-bold text-white">Active Vocabulary List</h4>
                  <p className="text-xs text-slate-400">CEFR level: <span className="text-[#F5A623] font-bold">{selectedCefr}</span></p>
                </div>
                <input 
                  type="text" 
                  placeholder="Search active vocab..." 
                  value={vocabSearch}
                  onChange={(e) => setVocabSearch(e.target.value)}
                  className="bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none w-full sm:w-48"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[160px] overflow-y-auto pr-1">
                {filteredVocab.map((item, idx) => (
                  <div key={`mock-vocab-item-${idx}`} className="bg-white/[0.02] border border-white/5 p-3 rounded-lg flex justify-between items-start group">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        {item.article && (
                          <span className={`text-[8px] px-1 py-0.2 rounded font-bold uppercase ${
                            item.article === 'der' ? 'bg-blue-500/10 text-blue-400' :
                            item.article === 'die' ? 'bg-pink-500/10 text-pink-400' : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {item.article}
                          </span>
                        )}
                        <span className="font-bold text-slate-200 text-sm">{item.word}</span>
                      </div>
                      <p className="text-xs text-slate-400 font-medium">{item.english}</p>
                      <p className="text-[10px] text-slate-500 italic mt-0.5">"{item.example}"</p>
                    </div>
                    
                    <button 
                      onClick={() => handleDeleteWord(item.word)}
                      className="text-slate-600 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* CEFR Level status */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
              <div className="space-y-1">
                <span className="text-[10px] uppercase text-slate-500 block font-semibold">Active Level Progression</span>
                <p className="text-sm font-semibold text-slate-300">Targeting CEFR A1 through C1 fluencies</p>
              </div>
              <div className="flex gap-1.5">
                {['A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => {
                  const isCurrent = selectedCefr === lvl;
                  return (
                    <div 
                      key={`prog-lvl-${lvl}`}
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                        isCurrent 
                          ? 'bg-[#F5A623] text-black ring-4 ring-[#F5A623]/25' 
                          : 'bg-white/5 text-slate-400 border border-white/5'
                      }`}
                    >
                      {lvl}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* CORE DATABASE & VOCABULARY MANAGER HUB (Showcases replaced) */}
      <section id="showcases-section" className="w-full max-w-7xl mx-auto px-6 py-20 md:px-12 border-b border-white/5 space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">Database Curation Engine</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-display text-white">
            Vocabulary Manager Hub
          </h2>
          <p className="text-base text-slate-400 leading-relaxed font-light">
            Maintain absolute oversight over your customized dictionary database. Explore, filter, curate, and scale your personal study folders with robust AI and import helpers.
          </p>
        </div>

        {/* Dual Grid Layout: Capabilities & Documentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Capabilities & Process */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Capabilities List */}
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
              <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Database className="w-5 h-5 text-[#F5A623]" />
                Manager Capabilities
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                curate and grow your personalized database utilizing a full suite of curation utilities:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#F5A623] shrink-0" />
                  <span>Browse Vocabulary</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#F5A623] shrink-0" />
                  <span>Search Vocabulary</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#F5A623] shrink-0" />
                  <span>Filter by CEFR Level</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#F5A623] shrink-0" />
                  <span>Organize Vocabulary</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#F5A623] shrink-0" />
                  <span>Import Vocabulary</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#F5A623] shrink-0" />
                  <span>AI Generation</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#F5A623] shrink-0" />
                  <span>Batch Import</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#F5A623] shrink-0" />
                  <span>OCR Import</span>
                </div>
              </div>
            </div>

            {/* Vocabulary Add Process */}
            <div className="bg-white/[0.01] border border-[#F5A623]/10 rounded-2xl p-6 md:p-8 space-y-4">
              <span className="text-[10px] uppercase bg-[#F5A623]/10 border border-[#F5A623]/20 px-2 py-0.5 rounded text-[#F5A623] font-bold font-mono tracking-wide inline-block">
                AI Generation Integration
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Vocabulary Add Process
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Generate high-fidelity vocabulary using ChatGPT, Gemini, Grok or any other AI model. Simply instruct your preferred AI to structure output following our system configurations, copy the template block, and import into SprachX.
              </p>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg text-xs font-semibold text-slate-300">
                • Prompt apply ChatGPT, Gemini, Grok etc. .
              </div>
            </div>

          </div>

          {/* Right Column: Copyable Format Standards */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#F5A623]" />
                Supported Vocabulary Formats
              </h3>
              <span className="text-xs text-slate-500 font-mono">Click copy icon to use template</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Noun Format Card */}
              <div className="bg-[#080B11] border border-white/5 rounded-xl p-4 flex flex-col justify-between space-y-3 relative group/card hover:border-white/10 transition-colors">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Noun Template</span>
                  <button 
                    onClick={() => handleCopyFormat(VOCAB_FORMATS.Noun, 'Noun')}
                    className="p-1.5 hover:bg-white/5 rounded text-slate-400 hover:text-[#F5A623] transition-all flex items-center gap-1 text-[10px]"
                    title="Copy Noun Template"
                  >
                    {copiedFormat === 'Noun' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-mono">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="font-mono">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[10px] text-slate-300 font-mono bg-[#05070A] p-3 rounded-lg overflow-x-auto leading-relaxed whitespace-pre">
                  {VOCAB_FORMATS.Noun}
                </pre>
              </div>

              {/* Verb Format Card */}
              <div className="bg-[#080B11] border border-white/5 rounded-xl p-4 flex flex-col justify-between space-y-3 relative group/card hover:border-white/10 transition-colors">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Verb Template</span>
                  <button 
                    onClick={() => handleCopyFormat(VOCAB_FORMATS.Verb, 'Verb')}
                    className="p-1.5 hover:bg-white/5 rounded text-slate-400 hover:text-[#F5A623] transition-all flex items-center gap-1 text-[10px]"
                    title="Copy Verb Template"
                  >
                    {copiedFormat === 'Verb' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-mono">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="font-mono">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[10px] text-slate-300 font-mono bg-[#05070A] p-3 rounded-lg overflow-x-auto leading-relaxed whitespace-pre">
                  {VOCAB_FORMATS.Verb}
                </pre>
              </div>

              {/* Adjective Format Card */}
              <div className="bg-[#080B11] border border-white/5 rounded-xl p-4 flex flex-col justify-between space-y-3 relative group/card hover:border-white/10 transition-colors">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Adjective Template</span>
                  <button 
                    onClick={() => handleCopyFormat(VOCAB_FORMATS.Adjective, 'Adjective')}
                    className="p-1.5 hover:bg-white/5 rounded text-slate-400 hover:text-[#F5A623] transition-all flex items-center gap-1 text-[10px]"
                    title="Copy Adjective Template"
                  >
                    {copiedFormat === 'Adjective' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-mono">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="font-mono">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[10px] text-slate-300 font-mono bg-[#05070A] p-3 rounded-lg overflow-x-auto leading-relaxed whitespace-pre">
                  {VOCAB_FORMATS.Adjective}
                </pre>
              </div>

              {/* Others Format Card */}
              <div className="bg-[#080B11] border border-white/5 rounded-xl p-4 flex flex-col justify-between space-y-3 relative group/card hover:border-white/10 transition-colors">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Others Template</span>
                  <button 
                    onClick={() => handleCopyFormat(VOCAB_FORMATS.Others, 'Others')}
                    className="p-1.5 hover:bg-white/5 rounded text-slate-400 hover:text-[#F5A623] transition-all flex items-center gap-1 text-[10px]"
                    title="Copy Others Template"
                  >
                    {copiedFormat === 'Others' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-mono">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="font-mono">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[10px] text-slate-300 font-mono bg-[#05070A] p-3 rounded-lg overflow-x-auto leading-relaxed whitespace-pre">
                  {VOCAB_FORMATS.Others}
                </pre>
              </div>

            </div>

          </div>

        </div>

        {/* Interactive Playgrounds Sandbox Panel */}
        <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 md:p-8 space-y-8 mt-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">Simulation Panel</span>
              <h3 className="text-xl font-bold text-white font-display">Interactive Workspace Simulators</h3>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              Test how actual database inputs, AI generators, OCR models, and imports compute inside SprachX.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Simulator 1: Add Custom Word */}
            <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-[#F5A623]/10 flex items-center justify-center text-[#F5A623]">
                    <Plus className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wider font-mono">1. Manual Word Addition</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Directly input individual dictionary items to save inside active curriculum study slots.
                </p>
                <form onSubmit={handleAddCustomWord} className="space-y-2 pt-2">
                  <div className="grid grid-cols-3 gap-1">
                    <select 
                      value={newArticle} 
                      onChange={(e) => setNewArticle(e.target.value as any)}
                      className="bg-slate-900 border border-white/10 rounded px-1 text-[10px] text-slate-300 focus:outline-none"
                    >
                      <option value="">-</option>
                      <option value="der">der</option>
                      <option value="die">die</option>
                      <option value="das">das</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder="e.g. Zug" 
                      value={newWord}
                      onChange={(e) => setNewWord(e.target.value)}
                      className="bg-slate-900 border border-white/10 rounded px-2 py-1 text-[10px] text-slate-300 col-span-2 focus:outline-none"
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Translation (e.g. train)" 
                    value={newEnglish}
                    onChange={(e) => setNewEnglish(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded px-2 py-1 text-[10px] text-slate-300 focus:outline-none"
                  />
                  <button 
                    type="submit" 
                    className="w-full py-1.5 bg-[#F5A623] hover:bg-amber-500 text-black font-bold rounded text-[10px] uppercase tracking-wider cursor-pointer"
                  >
                    Add to active list
                  </button>
                </form>
              </div>
            </div>

            {/* Simulator 2: AI Word Generator */}
            <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-[#F5A623]/10 flex items-center justify-center text-[#F5A623]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wider font-mono">2. AI Word Generator</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Enter a theme prefix to trigger automated, structured German word definitions.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex gap-1.5">
                    <input 
                      type="text" 
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="bg-slate-900 border border-white/10 rounded px-2 py-1.5 text-[10px] text-slate-300 w-full focus:outline-none"
                      placeholder="Topic: e.g. Restaurant"
                    />
                    <button 
                      onClick={handleAiGeneration}
                      disabled={aiGenerating}
                      className="px-3 bg-[#F5A623] text-black font-bold rounded text-[10px] cursor-pointer whitespace-nowrap hover:bg-amber-500"
                    >
                      {aiGenerating ? '...' : 'Generate'}
                    </button>
                  </div>

                  {aiGeneratedList.length > 0 && (
                    <div className="bg-slate-900 border border-white/10 rounded p-1.5 space-y-1.5 max-h-[85px] overflow-y-auto">
                      {aiGeneratedList.map((item, idx) => (
                        <div key={`ai-gen-${idx}`} className="flex justify-between items-center text-[9px] border-b border-white/5 pb-1 last:border-0 last:pb-0">
                          <div>
                            <span className="font-bold text-[#F5A623]">{item.word}</span>
                            <span className="text-slate-400 text-[8px] block">{item.english}</span>
                          </div>
                          <button 
                            onClick={() => addGeneratedToCollection(item)}
                            className="p-1 bg-emerald-500/20 text-emerald-400 rounded hover:bg-emerald-500 hover:text-black font-bold"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Simulator 3: OCR scanner */}
            <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-[#F5A623]/10 flex items-center justify-center text-[#F5A623]">
                    <Camera className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wider font-mono">3. OCR Text Scanner</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Extract and import words instantly by scanning printed documentation with a device camera.
                </p>
                <div className="space-y-2 pt-2">
                  <button 
                    onClick={handleOcrScan}
                    disabled={ocrStatus === 'scanning'}
                    className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-bold text-[10px] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#F5A623]" />
                    {ocrStatus === 'scanning' ? 'Scanning...' : 'Simulate Camera OCR'}
                  </button>

                  {scannedWord && (
                    <div className="bg-slate-900 border border-emerald-500/20 rounded p-2 flex justify-between items-center">
                      <div>
                        <span className="text-[8px] uppercase text-emerald-400 font-bold font-mono">Scanned word</span>
                        <span className="block font-bold text-slate-100 text-[10px]">{scannedWord.word}</span>
                      </div>
                      <button 
                        onClick={addOcrToCollection}
                        className="px-2.5 py-1 bg-emerald-500 text-black font-bold text-[9px] rounded hover:bg-emerald-400"
                      >
                        Import
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Simulator 4: Spreadsheet JSON/CSV Import */}
            <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-[#F5A623]/10 flex items-center justify-center text-[#F5A623]">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wider font-mono">4. Spreadsheet Import</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Perform bulk database load procedures by restoring files formatted in CSV/JSON templates.
                </p>
                <div className="space-y-2 pt-2 text-xs">
                  <button 
                    onClick={handleDataImport}
                    disabled={importStatus === 'importing'}
                    className="w-full py-2 bg-slate-900 border border-white/10 hover:border-[#F5A623]/40 text-white hover:text-[#F5A623] text-[10px] font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    {importStatus === 'importing' ? 'Importing...' : 'Simulate CSV/JSON Import'}
                  </button>
                  {importStatus === 'success' && (
                    <p className="text-[10px] text-emerald-400 text-center animate-pulse font-mono font-medium pt-1">
                      ✓ Restored {importCount} items successfully!
                    </p>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* SCREENSHOTS SECTION */}
      <section id="screenshots-section" className="w-full max-w-7xl mx-auto px-6 py-20 md:px-12 border-b border-white/5 bg-gradient-to-b from-[#0B0F17] to-[#0A0D14]">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">Intuitive Interface Layout</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-display text-white">
            Designed for seamless study sessions
          </h2>
          <p className="text-base text-slate-400 leading-relaxed font-light">
            Take a look at how each module inside SprachX is laid out. High contrast, optimized grid lists, and minimalist cards keep distractions away.
          </p>
        </div>

        {/* Screenshot slide widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Navigation thumbnails list */}
          <div className="lg:col-span-4 space-y-3 order-2 lg:order-1">
            {SCREENSHOTS_DATA.map((screen, idx) => {
              const isSelected = currentScreenIdx === idx;
              return (
                <button
                  key={screen.id}
                  onClick={() => setCurrentScreenIdx(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 cursor-pointer ${
                    isSelected 
                      ? 'bg-white/[0.04] border-[#F5A623]/30 shadow-lg' 
                      : 'bg-transparent border-transparent hover:bg-white/[0.02]'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center font-mono font-bold text-xs ${
                    isSelected ? 'bg-[#F5A623] text-black' : 'bg-white/5 text-slate-400'
                  }`}>
                    0{idx + 1}
                  </span>
                  <div className="space-y-1">
                    <h4 className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                      {screen.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{screen.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Large display screen mockup area */}
          <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
            
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
              
              {/* Real App Screenshot Showcase */}
              <div 
                onClick={() => setLightboxImg(activeScreenshot.image)}
                className="relative w-[250px] h-[490px] bg-[#0c101b] rounded-[32px] p-2 border-[4px] border-slate-800 shadow-2xl overflow-hidden shrink-0 select-none cursor-pointer group/screenshot"
              >
                <div className="absolute inset-0 bg-black/0 group-hover/screenshot:bg-black/30 flex items-center justify-center transition-colors z-10">
                  <span className="text-[10px] font-mono font-bold text-[#F5A623] tracking-wider bg-black/70 px-3 py-1.5 rounded-full border border-[#F5A623]/20 opacity-0 group-hover/screenshot:opacity-100 transition-all">
                    CLICK TO EXPAND
                  </span>
                </div>
                <img 
                  src={activeScreenshot.image} 
                  alt={activeScreenshot.title} 
                  className="w-full h-full object-cover rounded-[24px]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text explanations */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase bg-[#F5A623]/10 border border-[#F5A623]/25 px-2 py-0.5 rounded text-[#F5A623] font-bold">
                  {activeScreenshot.badge} View
                </span>
                <h3 className="text-2xl font-bold font-display text-white">
                  {activeScreenshot.title} Module
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                  {activeScreenshot.desc}
                </p>
                <div className="pt-4 flex gap-4">
                  <button 
                    onClick={() => setCurrentScreenIdx((prev) => (prev === 0 ? SCREENSHOTS_DATA.length - 1 : prev - 1))}
                    className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setCurrentScreenIdx((prev) => (prev === SCREENSHOTS_DATA.length - 1 ? 0 : prev + 1))}
                    className="p-2.5 bg-[#F5A623] hover:bg-amber-500 text-black rounded-full cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* STATISTICS GRID */}
      <section id="statistics-section" className="bg-[#0C111D] border-y border-white/5 py-20">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 text-center">
            
            <div className="space-y-1.5 col-span-2 lg:col-span-1 text-center">
              <h4 className="text-lg sm:text-xl font-black text-[#F5A623] font-display tracking-tight leading-tight">Unlimited Vocabulary</h4>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-[160px] mx-auto">Users can create and organize unlimited vocabulary according to CEFR levels.</p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-3xl sm:text-4xl font-extrabold text-white font-mono">A1–C1</h4>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">CEFR Progression</p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-3xl sm:text-4xl font-extrabold text-white font-mono">Secure</h4>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Local Databases</p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-3xl sm:text-4xl font-extrabold text-[#F5A623] font-mono">Active</h4>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Smart Reviews</p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-3xl sm:text-4xl font-extrabold text-white font-mono">JSON/CSV</h4>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Vocabulary Import</p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-3xl sm:text-4xl font-extrabold text-[#F5A623] font-mono">Local</h4>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">AI Tools</p>
            </div>

          </div>

        </div>
      </section>

      {/* WHY SPRACHX SECTION */}
      <section id="why-section" className="w-full max-w-7xl mx-auto px-6 py-20 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-white/5">
        
        <div className="lg:col-span-5 relative">
          {/* Accent block decorative card styling */}
          <div className="absolute top-0 left-0 w-full h-full bg-[#F5A623]/5 rounded-2xl blur-2xl pointer-events-none"></div>
          <div className="relative bg-[#0E1321] border border-[#F5A623]/20 p-8 rounded-2xl space-y-4">
            <span className="text-5xl font-serif text-[#F5A623] font-bold">“</span>
            <p className="text-lg text-slate-300 font-medium italic leading-relaxed">
              "As a language learner myself, I realized that modern language applications suffer from extreme bloat. They are cluttered with microtransactions, heavy notifications, and useless games. SprachX is my answer to that—a completely private, powerful, and local-first workspace designed purely to help you absorb vocabulary and grammar structures seamlessly."
            </p>
            <div>
              <h4 className="font-bold text-white text-base">Md Najmul Haque</h4>
              <p className="text-xs text-[#F5A623]">Founder & Developer of SprachX</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 lg:pl-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">The Philosophy</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-display text-white">
            Built by a learner, for learners.
          </h2>
          <p className="text-base text-slate-400 leading-relaxed font-light">
            Designed to make German learning simple, distraction-free and enjoyable. SprachX doesn't lock your progression behind complex login matrices or payment requirements. Your language collection remains stored locally on your physical device, completely secure and always accessible.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#F5A623] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm">Minimalist & Fluid</h4>
                <p className="text-xs text-slate-400 mt-1">Slick interface allowing you to navigate vocabularies without load times.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#F5A623] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-sm">Full Ownership</h4>
                <p className="text-xs text-slate-400 mt-1">Import/export anytime. You are not locked into any proprietary system database.</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* DOWNLOAD / PROMPT SECTION */}
      <section id="download-section" className="w-full max-w-7xl mx-auto px-6 py-20 md:px-12 text-center relative overflow-hidden">
        
        {/* Subtle background overlay banner */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#121824] to-[#0A0D14] rounded-3xl -z-10 border border-white/5"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5A623]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl mx-auto space-y-8 py-10">
          <span className="text-xs bg-[#F5A623]/15 border border-[#F5A623]/25 px-3 py-1 rounded-full text-[#F5A623] font-bold uppercase tracking-wider inline-block">
            Start Learning German Today
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white leading-tight">
            Get the full SprachX experience on Android.
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto font-light">
            Enjoy full privacy, robust data portability, and structured local workspace storage. Download the secure APK package file directly and install on any device running Android 8+.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm font-semibold text-slate-300 max-w-lg mx-auto">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#F5A623]" />
              <span>Android support</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#F5A623]" />
              <span>Local Database Security</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#F5A623]" />
              <span>Complete Data Ownership</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col justify-center items-center gap-4">
            <button 
              onClick={() => setIsDownloadOpen(true)}
              className="px-10 py-5 bg-[#F5A623] hover:bg-[#e09217] text-black font-extrabold rounded-xl shadow-2xl shadow-[#F5A623]/30 text-base transform hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download APK Package
            </button>
            <span className="text-xs text-slate-500 font-mono">Ver v1.2.4-beta | sprachx-v1.2.4-free.apk</span>
          </div>
        </div>

      </section>

      {/* FAQ SECTION */}
      <section id="faq-section" className="w-full max-w-4xl mx-auto px-6 py-20 md:px-12 border-t border-white/5">
        
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">Answers to Common Queries</span>
          <h2 className="text-3xl font-bold font-display text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          
          {[
            {
              q: "What is the core focus of the SprachX study tool?",
              a: "SprachX is designed as a focused, premium workspace for learners who want high-fidelity German vocabulary acquisition, customized folder structure, and spaced repetition card review cycles to accelerate retention."
            },
            {
              q: "How is my vocabulary data structured and stored?",
              a: "All of your personalized vocabulary lists, custom folders, structural notes, review indexes, and learning statistics are stored securely on your local device. This local-first architecture keeps your studies fast, private, and always responsive."
            },
            {
              q: "Can I import and export my vocabulary database?",
              a: "Absolutely. SprachX provides full data control with seamless import from custom CSV and JSON list files, as well as easy backup export. You maintain complete ownership of your learning lists."
            },
            {
              q: "What Android version does the application require?",
              a: "The application is fully compatible with smartphones running Android 8 (Oreo) or above, offering a lightweight and highly optimized experience with native device integration."
            },
            {
              q: "How does the spaced repetition review system work?",
              a: "SprachX tracks your review intervals and targets specific words right before your memory retention begins to fade. It ensures you focus only on the elements that need reinforcement."
            }
          ].map((faq, idx) => {
            const isOpen = faqOpen === idx;
            return (
              <div 
                key={`faq-item-${idx}`}
                className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setFaqOpen(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-white/[0.01] transition-colors cursor-pointer"
                >
                  <span className="font-bold text-slate-200 text-sm md:text-base">{faq.q}</span>
                  <span className={`text-[#F5A623] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5"
                    >
                      <p className="px-6 py-5 text-sm text-slate-400 leading-relaxed font-light">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-[#070A10] border-t border-white/5 mt-auto">
        <div className="w-full max-w-7xl mx-auto px-6 py-16 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo & description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img 
                src="assets/logo.png" 
                alt="SprachX Logo" 
                className="h-8 w-auto object-contain block shrink-0"
                referrerPolicy="no-referrer"
              />
              <span className="text-xl font-bold font-display text-white flex items-center">SprachX</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Premium independent German vocabulary, grammar, and spacing study workspace. Redefining your native progress with secure local-device storage.
            </p>
            <p className="text-xs text-slate-500">
              © 2026 Md Najmul Haque. All rights reserved.
            </p>
          </div>

          {/* Links 1: Product */}
          <div className="space-y-4 text-xs">
            <h5 className="font-bold text-white uppercase tracking-wider">Product</h5>
            <div className="flex flex-col gap-2.5 text-slate-400 font-medium">
              <a href="#features-section" className="hover:text-[#F5A623] transition-colors">Features</a>
              <a href="#screenshots-section" className="hover:text-[#F5A623] transition-colors">Screenshots</a>
              <a href="#download-section" className="hover:text-[#F5A623] transition-colors">Download</a>
            </div>
          </div>

          {/* Links 2: Support */}
          <div className="space-y-4 text-xs">
            <h5 className="font-bold text-white uppercase tracking-wider">Support</h5>
            <div className="flex flex-col gap-2.5 text-slate-400 font-medium">
              <a href="#faq-section" className="hover:text-[#F5A623] transition-colors">FAQ</a>
              <a href="#download-section" className="hover:text-[#F5A623] transition-colors">Privacy Policy</a>
              <a href="mailto:nmd757827@gmail.com" className="hover:text-[#F5A623] transition-colors flex items-center gap-1">
                Contact Developer <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Links 3: Connect */}
          <div className="space-y-4 text-xs">
            <h5 className="font-bold text-white uppercase tracking-wider">Connect</h5>
            <div className="flex flex-col gap-2.5 text-slate-400 font-medium">
              <a 
                href="https://x.com/SprachX" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#F5A623] transition-colors flex items-center gap-1.5"
              >
                <Twitter className="w-3.5 h-3.5" />
                <span>X (Twitter)</span>
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 py-6 text-center text-xs text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4 max-w-7xl mx-auto px-6 md:px-12">
          <span>Designed with high contrast premium dark theme.</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by <span className="text-slate-400 font-semibold">Md Najmul Haque</span>
          </span>
        </div>
      </footer>

      {/* DOWNLOAD INTERACTIVE MODAL */}
      <AnimatePresence>
        {isDownloadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDownloadOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0E1321] border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full relative z-10 shadow-2xl space-y-6"
            >
              
              <button 
                onClick={() => setIsDownloadOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>

              <div className="space-y-2 text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-[#F5A623] flex items-center justify-center mx-auto mb-2">
                  <Download className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">Download SprachX APK</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Get full access immediately to start tracking and organizing your German vocabulary today. Simply confirm your download email below.
                </p>
              </div>

              {downloadStep === 'idle' && (
                <form onSubmit={triggerApkDownload} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400">Download Email Confirmation</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5A623]/40"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 bg-[#F5A623] hover:bg-amber-500 text-black font-bold text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-[#F5A623]/20"
                  >
                    Confirm & Start Secure Download
                  </button>
                </form>
              )}

              {downloadStep === 'preparing' && (
                <div className="space-y-4 text-center py-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase text-slate-500 font-bold block">Security check in progress</span>
                    <h4 className="text-sm font-semibold text-slate-200">Preparing sprachx-v1.2.4.apk...</h4>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden max-w-xs mx-auto">
                    <div 
                      className="bg-[#F5A623] h-full rounded-full transition-all duration-200" 
                      style={{ width: `${downloadProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-mono text-[#F5A623]">{downloadProgress}%</span>
                </div>
              )}

              {downloadStep === 'ready' && (
                <div className="space-y-4 text-center py-4 animate-fade-in">
                  <div className="w-12 h-12 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white">APK Download Triggered!</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      Your download for <strong>sprachx-v1.2.4.apk</strong> has successfully initialized in your browser.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setDownloadStep('idle');
                      setEmail('');
                      setIsDownloadOpen(false);
                    }}
                    className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-bold uppercase tracking-wider"
                  >
                    Close Window
                  </button>
                </div>
              )}

              {/* Security info bar */}
              <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 p-3 rounded-xl text-[10px] text-slate-500">
                <AlertCircle className="w-4 h-4 text-[#F5A623] shrink-0" />
                <span>We guarantee telemetry-free packages. No credentials or trackers are transmitted.</span>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* SCREENSHOT LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImg(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-lg w-full z-10 flex flex-col items-center justify-center p-2"
            >
              <button 
                onClick={() => setLightboxImg(null)}
                className="absolute -top-12 right-2 bg-white/10 hover:bg-white/20 text-white rounded-full px-4 py-1.5 cursor-pointer text-xs font-bold uppercase tracking-wider transition-all"
              >
                ✕ Close
              </button>
              
              <div className="relative bg-slate-900/40 p-2 border border-white/10 rounded-2xl max-h-[80vh] flex items-center justify-center overflow-hidden">
                <img 
                  src={lightboxImg} 
                  alt="Expanded Screenshot Preview" 
                  className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
