import {
  Calendar, Layers, Users, ShieldCheck, Lightbulb, GraduationCap, TrendingUp, Rocket, RefreshCw,
  Search, Plus,
  MessagesSquare, PencilRuler, CodeXml, Database, ReceiptText, Library, BadgeCheck, Handshake, ScanSearch, Workflow, Cloud, ArrowUpRight,
  ArrowLeft, Check, FlaskConical, Headset, LifeBuoy, Minus, RotateCcw, Send, Sparkles,
  ArrowRight, Calculator, CarFront, ChevronDown, ChevronRight, CircleUserRound, ClipboardCheck,
  FileCheck2, GitCommitHorizontal, Globe, KeyRound, Mail, MapPin, Menu, Newspaper, Phone, Scale,
  Shapes, Shirt, Video, Wrench, X, type LucideIcon,
} from 'lucide-react';

/** Registro esplicito (tree-shaking): ogni icona usata dai contenuti va aggiunta qui. Stroke 1.75 come da design. */
const icons: Record<string, LucideIcon> = {
  'calendar': Calendar, 'layers': Layers, 'users': Users, 'shield-check': ShieldCheck, 'lightbulb': Lightbulb, 'graduation-cap': GraduationCap, 'trending-up': TrendingUp, 'rocket': Rocket, 'refresh-cw': RefreshCw,
  search: Search, plus: Plus,
  'messages-square': MessagesSquare, 'pencil-ruler': PencilRuler, 'code-xml': CodeXml, 'database': Database, 'receipt-text': ReceiptText, 'library': Library, 'badge-check': BadgeCheck, 'handshake': Handshake, 'scan-search': ScanSearch, 'workflow': Workflow, 'cloud': Cloud, 'arrow-up-right': ArrowUpRight,
  'arrow-left': ArrowLeft, check: Check, 'flask-conical': FlaskConical, headset: Headset, 'life-buoy': LifeBuoy,
  minus: Minus, 'rotate-ccw': RotateCcw, send: Send, sparkles: Sparkles,
  'arrow-right': ArrowRight, calculator: Calculator, 'car-front': CarFront, 'chevron-down': ChevronDown,
  'chevron-right': ChevronRight, 'circle-user-round': CircleUserRound, 'clipboard-check': ClipboardCheck,
  'file-check-2': FileCheck2, 'git-commit-horizontal': GitCommitHorizontal, globe: Globe, 'key-round': KeyRound,
  mail: Mail, 'map-pin': MapPin, menu: Menu, newspaper: Newspaper, phone: Phone, scale: Scale, shapes: Shapes,
  shirt: Shirt, video: Video, wrench: Wrench, x: X,
};

export function Icon({ name, size = 18, className }: Readonly<{ name: string; size?: number; className?: string }>) {
  const Component = icons[name];
  if (!Component) return null;
  return <Component aria-hidden size={size} strokeWidth={1.75} className={className} />;
}
