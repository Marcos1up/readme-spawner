type Template = "openSource" | "enterprise" | "technicalDocs";

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onTemplateChange: (template: Template) => void;
}

const templates = [
  {
    id: "openSource" as Template,
    name: "Open Source",
    description: "Perfecto para proyectos de código abierto con contribuciones de la comunidad",
    icon: "🌟",
    features: [
      "Instalación simple",
      "Guía de contribución",
      "Badges y métricas",
      "Licencia abierta",
    ],
  },
  {
    id: "enterprise" as Template,
    name: "Empresarial",
    description: "Ideal para proyectos corporativos con documentación profesional",
    icon: "🏢",
    features: [
      "Arquitectura detallada",
      "Métricas de negocio",
      "Seguridad y compliance",
      "Documentación técnica",
    ],
  },
  {
    id: "technicalDocs" as Template,
    name: "Documentación Técnica",
    description: "Enfocado en documentación completa para desarrolladores",
    icon: "📚",
    features: [
      "API Reference",
      "Diagramas técnicos",
      "Guías de debugging",
      "Configuración avanzada",
    ],
  },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange,
}) => {
  return (
    <div className="template-selector">
      <h3 className="template-selector-title">🎨 Selecciona una Plantilla</h3>
      <p className="template-selector-subtitle">
        Elige la plantilla que mejor se adapte a tu tipo de proyecto
      </p>

      <div className="template-grid">
        {templates.map(template => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? "selected" : ""}`}
            onClick={() => onTemplateChange(template.id)}
          >
            <div className="template-icon">{template.icon}</div>
            <div className="template-info">
              <h4 className="template-name">{template.name}</h4>
              <p className="template-description">{template.description}</p>
              <ul className="template-features">
                {template.features.map((feature, index) => (
                  <li key={index} className="template-feature">
                    <span className="feature-bullet">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="template-selector-indicator">
              {selectedTemplate === template.id && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  {/* para el icono de seleccionado */}
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
