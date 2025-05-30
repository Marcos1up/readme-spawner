export interface TemplateData {
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
  
  export const getDefaultTemplate = (): string => {
    return `# Nombre del Proyecto
  
  Una breve descripción de lo que hace este proyecto y para quién es.
  
  ## 🚀 Tecnologías Utilizadas
  
  - Tecnología 1
  - Tecnología 2
  - Tecnología 3
  
  ## 📋 Prerrequisitos
  
  Antes de comenzar, asegúrate de tener instalado:
  
  - [Node.js](https://nodejs.org/) (versión 14 o superior)
  - [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
  
  ## 🔧 Instalación
  
  1. Clona el repositorio
  \`\`\`bash
  git clone https://github.com/usuario/proyecto.git
  \`\`\`
  
  2. Ve al directorio del proyecto
  \`\`\`bash
  cd proyecto
  \`\`\`
  
  3. Instala las dependencias
  \`\`\`bash
  npm install
  \`\`\`
  
  ## 💻 Uso
  
  Describe cómo usar tu proyecto:
  
  \`\`\`bash
  npm start
  \`\`\`
  
  ## 🤝 Contribuir
  
  Las contribuciones son bienvenidas. Para cambios importantes:
  
  1. Fork el proyecto
  2. Crea una rama para tu feature (\`git checkout -b feature/AmazingFeature\`)
  3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
  4. Push a la rama (\`git push origin feature/AmazingFeature\`)
  5. Abre un Pull Request
  
  ## 📄 Licencia
  
  Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE.md](LICENSE.md) para detalles.
  
  ## ✒️ Autor
  
  - **Tu Nombre** - [Perfil de GitHub](https://github.com/usuario)
  
  ## 🎁 Expresiones de Gratitud
  
  - Comenta a otros sobre este proyecto 📢
  - Invita una cerveza 🍺 o un café ☕ a alguien del equipo
  - Da las gracias públicamente 🤓
  `;
  };
  
  export const generateOpenSourceTemplate = (data: TemplateData): string => {
    const techList = data.technologies.length > 0 
      ? data.technologies.map(tech => `- ${tech}`).join('\n')
      : '- React\n- TypeScript\n- Node.js';
  
    return `# ${data.projectName || 'Nombre del Proyecto'}
  
  ${data.projectDescription || 'Una breve descripción de lo que hace este proyecto y para quién es.'}
  
  ## 🚀 Tecnologías Utilizadas
  
  ${techList}
  
  ## 📋 Prerrequisitos
  
  Antes de comenzar, asegúrate de tener instalado:
  
  - [Node.js](https://nodejs.org/) (versión 14 o superior)
  - [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
  
  ## 🔧 Instalación
  
  ${data.installation || `1. Clona el repositorio
  \`\`\`bash
  git clone ${data.githubUrl || 'https://github.com/usuario/proyecto.git'}
  \`\`\`
  
  2. Ve al directorio del proyecto
  \`\`\`bash
  cd ${data.projectName?.toLowerCase().replace(/\s+/g, '-') || 'proyecto'}
  \`\`\`
  
  3. Instala las dependencias
  \`\`\`bash
  npm install
  \`\`\``}
  
  ## 💻 Uso
  
  ${data.usage || `Describe cómo usar tu proyecto:
  
  \`\`\`bash
  npm start
  \`\`\``}
  
  ## 🤝 Contribuir
  
  ${data.contributing || `Las contribuciones son bienvenidas. Para cambios importantes:
  
  1. Fork el proyecto
  2. Crea una rama para tu feature (\`git checkout -b feature/AmazingFeature\`)
  3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
  4. Push a la rama (\`git push origin feature/AmazingFeature\`)
  5. Abre un Pull Request`}
  
  ## 📄 Licencia
  
  Este proyecto está bajo la Licencia ${data.license || 'MIT'} - mira el archivo [LICENSE.md](LICENSE.md) para detalles.
  
  ## ✒️ Autor
  
  - **${data.author || 'Tu Nombre'}** - [Perfil de GitHub](${data.githubUrl || 'https://github.com/usuario'})
  
  ## 🎁 Expresiones de Gratitud
  
  - Comenta a otros sobre este proyecto 📢
  - Invita una cerveza 🍺 o un café ☕ a alguien del equipo
  - Da las gracias públicamente 🤓
  `;
  };