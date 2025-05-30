import { ProjectData } from "@/types";

/**
 * Creates a badge for shields.io
 * @param label The badge label
 * @param message The badge message
 * @param color The badge color
 * @param style The badge style
 */
export const createBadge = (
  label: string,
  message: string,
  color: string = "blue",
  style: "flat" | "flat-square" | "plastic" | "for-the-badge" = "flat"
): string => {
  const encodedLabel = encodeURIComponent(label);
  const encodedMessage = encodeURIComponent(message);
  
  return `![${label}](https://img.shields.io/badge/${encodedLabel}-${encodedMessage}-${color}?style=${style})`;
};

/**
 * Creates a technology badge
 * @param technology The technology name
 */
export const createTechBadge = (technology: string): string => {
  const techColors: Record<string, string> = {
    "React": "61DAFB",
    "Vue.js": "4FC08D",
    "Angular": "DD0031",
    "Next.js": "000000",
    "TypeScript": "3178C6",
    "JavaScript": "F7DF1E",
    "Python": "3776AB",
    "Java": "ED8B00",
    "Node.js": "339933",
    "Express.js": "000000",
    "MongoDB": "47A248",
    "PostgreSQL": "336791",
    "MySQL": "4479A1",
    "Docker": "2496ED",
    "AWS": "232F3E",
    "Azure": "0078D4",
    "GCP": "4285F4"
  };

  const color = techColors[technology] || "blue";
  const logoParam = technology.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  return `![${technology}](https://img.shields.io/badge/${technology.replace(/\s/g, "%20")}-${color}?style=for-the-badge&logo=${logoParam}&logoColor=white)`;
};

/**
 * Creates a GitHub stats badge
 * @param username The GitHub username
 * @param repo The repository name
 */
export const createGitHubBadges = (username: string, repo: string): string[] => {
  return [
    `![GitHub stars](https://img.shields.io/github/stars/${username}/${repo}?style=social)`,
    `![GitHub forks](https://img.shields.io/github/forks/${username}/${repo}?style=social)`,
    `![GitHub issues](https://img.shields.io/github/issues/${username}/${repo})`,
    `![GitHub license](https://img.shields.io/github/license/${username}/${repo})`
  ];
};

/**
 * Generates a table of contents from headers
 * @param content The markdown content
 */
export const generateTableOfContents = (content: string): string => {
  const headers = content.match(/^(#{1,6})\s+(.+)$/gm);
  
  if (!headers || headers.length === 0) {
    return "";
  }

  const tocItems = headers.map(header => {
    const match = header.match(/^(#{1,6})\s+(.+)$/);
    if (!match) return "";
    
    const level = match[1].length;
    const text = match[2].replace(/[#*`]/g, '');
    const anchor = text.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    const indent = '  '.repeat(level - 1);
    return `${indent}- [${text}](#${anchor})`;
  });

  return `## Tabla de Contenidos\n\n${tocItems.join('\n')}\n`;
};

/**
 * Formats installation instructions
 * @param instructions The raw instructions
 * @param packageManager The package manager to use
 */
export const formatInstallationInstructions = (
  instructions: string,
  packageManager: "npm" | "yarn" | "pnpm" = "npm"
): string => {
  if (!instructions) {
    return `\`\`\`bash
# Clona el repositorio
git clone <repository-url>

# Navega al directorio del proyecto
cd <project-directory>

# Instala las dependencias
${packageManager} install

# Inicia el proyecto
${packageManager} ${packageManager === 'npm' ? 'start' : 'dev'}
\`\`\``;
  }

  // Replace package manager placeholders
  return instructions
    .replace(/npm install/g, `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'}`)
    .replace(/npm start/g, `${packageManager} ${packageManager === 'npm' ? 'start' : 'dev'}`)
    .replace(/npm run/g, `${packageManager} run`);
};

/**
 * Creates a contributor section
 * @param contributors Array of contributor names or GitHub usernames
 */
export const createContributorSection = (contributors: string[]): string => {
  if (contributors.length === 0) {
    return `## 👥 Contribuidores

¡Gracias a todas las personas que han contribuido a este proyecto!

<!-- Aquí puedes agregar una imagen con todos los contribuidores -->
<a href="https://github.com/usuario/proyecto/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=usuario/proyecto" />
</a>`;
  }

  const contributorList = contributors.map(contributor => {
    if (contributor.startsWith('@') || contributor.includes('github.com')) {
      const username = contributor.replace('@', '').replace('https://github.com/', '');
      return `- [@${username}](https://github.com/${username})`;
    }
    return `- ${contributor}`;
  });

  return `## 👥 Contribuidores

${contributorList.join('\n')}`;
};

/**
 * Creates a license section
 * @param license The license type
 * @param author The author name
 * @param year The copyright year
 */
export const createLicenseSection = (
  license: string,
  author?: string,
  year: number = new Date().getFullYear()
): string => {
  const licenseUrls: Record<string, string> = {
    "MIT": "https://choosealicense.com/licenses/mit/",
    "Apache-2.0": "https://choosealicense.com/licenses/apache-2.0/",
    "GPL-3.0": "https://choosealicense.com/licenses/gpl-3.0/",
    "BSD-3-Clause": "https://choosealicense.com/licenses/bsd-3-clause/",
    "ISC": "https://choosealicense.com/licenses/isc/"
  };

  const licenseUrl = licenseUrls[license];
  const licenseLink = licenseUrl ? `[${license}](${licenseUrl})` : license;
  
  return `## 📄 Licencia

Este proyecto está bajo la Licencia ${licenseLink}${author ? ` - © ${year} ${author}` : ''}.

Ver el archivo [LICENSE](./LICENSE) para más detalles.`;
};

/**
 * Validates and cleans markdown content
 * @param content The markdown content to clean
 */
export const cleanMarkdownContent = (content: string): string => {
  return content
    // Remove excessive line breaks
    .replace(/\n{4,}/g, '\n\n\n')
    // Clean up list formatting
    .replace(/^[\s]*[-*+]\s+/gm, '- ')
    // Ensure proper spacing around headers
    .replace(/^(#{1,6})\s*(.+)$/gm, '$1 $2')
    // Clean up code blocks
    .replace(/```(\w*)\n\n/g, '```$1\n')
    // Remove trailing whitespace
    .replace(/[ \t]+$/gm, '')
    // Ensure file ends with single newline
    .replace(/\n*$/, '\n');
};

/**
 * Extracts project information from GitHub URL
 * @param githubUrl The GitHub repository URL
 */
export const extractGitHubInfo = (githubUrl: string): { owner: string; repo: string } | null => {
  const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) return null;
  
  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/, '')
  };
};

/**
 * Creates a complete README structure
 * @param data The project data
 */
export const createReadmeStructure = (data: ProjectData): string => {
  const sections = [];
  
  // Title and description
  sections.push(`# ${data.projectName}`);
  sections.push(data.projectDescription);
  
  // Badges section
  if (data.githubUrl) {
    const githubInfo = extractGitHubInfo(data.githubUrl);
    if (githubInfo) {
      const badges = createGitHubBadges(githubInfo.owner, githubInfo.repo);
      sections.push(badges.join(' '));
    }
  }
  
  // Technology badges
  if (data.technologies.length > 0) {
    const techBadges = data.technologies.map(createTechBadge);
    sections.push(`## 🚀 Tecnologías\n\n${techBadges.join(' ')}`);
  }
  
  // Installation
  if (data.installation) {
    sections.push(`## 🔧 Instalación\n\n${data.installation}`);
  }
  
  // Usage
  if (data.usage) {
    sections.push(`## 💻 Uso\n\n${data.usage}`);
  }
  
  // Contributing
  if (data.contributing) {
    sections.push(`## 🤝 Contribuir\n\n${data.contributing}`);
  }
  
  // License
  sections.push(createLicenseSection(data.license, data.author));
  
  return cleanMarkdownContent(sections.join('\n\n'));
};