// Theme
export type Theme = "light" | "dark";

// Template
export type ReadmeTemplate = "openSource" | "enterprise" | "technicalDocs";

export interface ProjectData {
  projectName: string;
  projectDescription: string;
  technologies: string[];
  installation: string;
  usage: string;
  contributing: string;
  license: string;
  author: string;
  githubUrl: string;
}

// Configuracion de templates
export interface TemplateConfig {
  id: ReadmeTemplate;
  name: string;
  description: string;
  icon: string;
  features: string[];
}

// Form
export interface FormField {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "multiselect";
  placeholder?: string;
  required?: boolean;
  options?: string[];
  rows?: number;
}

// Itemsde tecnologias
export interface Technology {
  name: string;
  icon?: string;
  category?: string;
}

// categorias de tecnologias
export interface TechnologyCategory {
  name: string;
  technologies: Technology[];
}

// Editor
export interface EditorState extends ProjectData {
  content: string;
  selectedTemplate: ReadmeTemplate;
}

// Theme state
export interface ThemeState {
  theme: Theme;
}

export interface AppState {
  editor: EditorState;
  theme: ThemeState;
}

export interface EditorPanelProps {
  className?: string;
}

export interface PreviewPanelProps {
  className?: string;
}

export interface TemplateSelectorProps {
  selectedTemplate: ReadmeTemplate;
  onTemplateChange: (template: ReadmeTemplate) => void;
}

export interface TechStackSelectorProps {
  selectedTechnologies: string[];
  onAddTechnology: (tech: string) => void;
  onRemoveTechnology: (tech: string) => void;
}

export interface LivePreviewProps {
  content: string;
}

export interface ThemeToggleProps {
  className?: string;
}

// API response
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Opciones de desarga
export interface DownloadOptions {
  filename?: string;
  format?: "md" | "txt";
}

// Interfa de stats
export interface ContentStatistics {
  lines: number;
  characters: number;
  words: number;
  sections: number;
}

export interface ExportUtilities {
  downloadMarkdown: (content: string, filename?: string) => void;
  copyToClipboard: (content: string) => Promise<void>;
  getStatistics: (content: string) => ContentStatistics;
}

export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

export type EventHandler<T = unknown> = (data: T) => void;
export type AsyncEventHandler<T = unknown> = (data: T) => Promise<void>;

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
