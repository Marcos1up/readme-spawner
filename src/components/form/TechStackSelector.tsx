import { useState } from "react";

interface TechStackSelectorProps {
  selectedTechnologies: string[];
  onAddTechnology: (tech: string) => void;
  onRemoveTechnology: (tech: string) => void;
}

const popularTechnologies = [
  "React",
  "Vue.js",
  "Angular",
  "Next.js",
  "Nuxt.js",
  "Svelte",
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "C#",
  "Go",
  "Node.js",
  "Express.js",
  "FastAPI",
  "Django",
  "Spring Boot",
  "ASP.NET",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Firebase",
  "Supabase",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
  "Vercel",
  "Tailwind CSS",
  "Bootstrap",
  "Material-UI",
  "Chakra UI",
  "Styled Components",
  "Jest",
  "Cypress",
  "Playwright",
  "Vitest",
  "React Testing Library",
  "Webpack",
  "Vite",
  "Rollup",
  "ESBuild",
  "Parcel",
  "GraphQL",
  "REST API",
  "tRPC",
  "Socket.io",
  "WebRTC",
  "React Native",
  "Flutter",
  "Ionic",
  "Electron",
  "Tauri",
];

const TechStackSelector: React.FC<TechStackSelectorProps> = ({
  selectedTechnologies,
  onAddTechnology,
  onRemoveTechnology,
}) => {
  const [customTech, setCustomTech] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTechnologies = popularTechnologies.filter(
    tech =>
      tech.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedTechnologies.includes(tech)
  );

  const handleAddCustomTech = () => {
    if (customTech.trim() && !selectedTechnologies.includes(customTech.trim())) {
      onAddTechnology(customTech.trim());
      setCustomTech("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustomTech();
    }
  };

  return (
    <div className="tech-stack-selector">
      <div className="selected-technologies">
        <h4 className="tech-section-title">Tecnologías seleccionadas:</h4>
        {selectedTechnologies.length === 0 ? (
          <p className="no-technologies">No hay tecnologías seleccionadas</p>
        ) : (
          <div className="tech-tags">
            {selectedTechnologies.map(tech => (
              <span key={tech} className="tech-tag selected">
                {tech}
                <button
                  type="button"
                  className="remove-tech-btn"
                  onClick={() => onRemoveTechnology(tech)}
                  aria-label={`Remover ${tech}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="add-technology">
        <h4 className="tech-section-title">Agregar tecnología personalizada:</h4>
        <div className="custom-tech-input">
          <input
            type="text"
            value={customTech}
            onChange={e => setCustomTech(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe el nombre de la tecnología..."
            className="form-input"
          />
          <button
            type="button"
            onClick={handleAddCustomTech}
            className="btn btn-secondary add-tech-btn"
            disabled={!customTech.trim()}
          >
            Agregar
          </button>
        </div>
      </div>

      <div className="popular-technologies">
        <h4 className="tech-section-title">Tecnologías populares:</h4>

        <div className="tech-search">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar tecnologías..."
            className="form-input search-input"
          />
        </div>

        <div className="tech-tags popular">
          {filteredTechnologies.slice(0, 15).map(tech => (
            <button
              key={tech}
              type="button"
              className="tech-tag clickable"
              onClick={() => onAddTechnology(tech)}
            >
              + {tech}
            </button>
          ))}
        </div>

        {filteredTechnologies.length === 0 && searchTerm && (
          <p className="no-results">
            No se encontraron tecnologías que coincidan con &ldquo;{searchTerm}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
};

export default TechStackSelector;
