export interface FileInfo {
  filename: string;
  extension: string;
  relative_path: string;
  size_bytes: number;
  modified_at: string;
}

export interface ExtensionStatistics {
  extension: string;
  file_count: number;
  total_size_bytes: number;
}

export interface ScanSummary {
  total_files: number;
  total_folders: number;
  total_size_bytes: number;
  extension_counts: number;
  ignored_directories: number;
  scanned_duration_ms: number;
}

export interface RepositoryMetadata {
  original_filename: string;
  workspace_id: string;
  scanned_at: string;
}

export interface LanguageDistribution {
  language: string;
  file_count: number;
  percentage: number;
}

export interface RepositoryStatistics {
  total_files: number;
  total_folders: number;
  total_size_bytes: number;
  primary_framework: string | null;
  detected_frameworks: string[];
  language_distribution: LanguageDistribution[];
  largest_files: FileInfo[];
}

export interface AISummary {
  title: string;
  architecture_overview: string;
  tech_stack_highlights: string[];
  key_modules: string[];
  code_health_score: number;
  recommendations: string[];
}

export interface HealthBreakdown {
  overall_score: number;
  folder_structure: number;
  project_organization: number;
  documentation: number;
  configuration: number;
  dependency_management: number;
  framework_usage: number;
  repository_size: number;
  language_distribution: number;
}

export interface ArchitectureAnalysis {
  style: string;
  scale: string;
  complexity: string;
  layer_separation_score: number;
  strengths: string[];
  weaknesses: string[];
  potential_risks: string[];
}

export interface QualityAudit {
  has_readme: boolean;
  has_license: boolean;
  has_gitignore: boolean;
  has_docker: boolean;
  has_ci: boolean;
  large_files_count: number;
  config_quality_score: number;
  duplicate_configs: string[];
  unused_folders: string[];
}

export interface TechnologyIntelligence {
  detected_technologies: string[];
  framework_maturity: string;
  version_compatibility: string;
  recommendations: string[];
  suggested_upgrades: string[];
  deprecated_technologies: string[];
}

export interface PrioritizedRecommendation {
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  why_it_matters: string;
  suggested_solution: string;
}

export interface DeveloperInsights {
  maintainability: number;
  scalability: number;
  readability: number;
  deployment_readiness: number;
  production_readiness: number;
  architecture_quality: number;
}

export interface CodeIntelligenceReport {
  health: HealthBreakdown;
  architecture: ArchitectureAnalysis;
  quality: QualityAudit;
  tech_intelligence: TechnologyIntelligence;
  recommendations: PrioritizedRecommendation[];
  developer_insights: DeveloperInsights;
  executive_summary: string;
}

export interface ScanResponse {
  id: string;
  workspace_id: string;
  metadata: RepositoryMetadata;
  summary: ScanSummary;
  files: FileInfo[];
  extensions: ExtensionStatistics[];
  statistics: RepositoryStatistics;
  ai_summary: AISummary;
  intelligence?: CodeIntelligenceReport;
}
