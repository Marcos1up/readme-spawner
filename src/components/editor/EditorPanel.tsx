import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { RootState } from "@/store/store";
import TemplateSelector from "./TemplateSelector";
import TechStackSelector from "../form/TechStackSelector";
import { generateOpenSourceTemplate } from "@/lib/templates/openSource";
import { generateEnterpriseTemplate } from "@/lib/templates/enterprise";
import { generateTechnicalDocsTemplate } from "@/lib/templates/technicalDocs";
import { updateContent } from "@/store/slices/editorSlice";
import {
  updateField,
  selectTemplate,
  addTechnology,
  removeTechnology,
} from "@/store/slices/editorSlice";

const EditorPanel: React.FC = () => {
  const dispatch = useDispatch();
  const editorState = useSelector((state: RootState) => state.editor);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: editorState.projectName,
      projectDescription: editorState.projectDescription,
      installation: editorState.installation,
      usage: editorState.usage,
      contributing: editorState.contributing,
      license: editorState.license,
      author: editorState.author,
      githubUrl: editorState.githubUrl,
    },
  });

  //watch para obtener los valores actuales del form
  const watchedValues = watch();

  React.useEffect(() => {
    Object.entries(watchedValues).forEach(([key, value]) => {
      if (value !== editorState[key as keyof typeof editorState]) {
        dispatch(updateField({ field: key as keyof typeof editorState, value }));
      }
    });
  }, [watchedValues, dispatch, editorState]);

  //generar README basado en la plantilla seleccionada
  React.useEffect(() => {
    let newContent = "";

    switch (editorState.selectedTemplate) {
      case "openSource":
        newContent = generateOpenSourceTemplate(editorState);
        break;
      case "enterprise":
        newContent = generateEnterpriseTemplate(editorState);
        break;
      case "technicalDocs":
        newContent = generateTechnicalDocsTemplate(editorState);
        break;
      default:
        newContent = generateOpenSourceTemplate(editorState);
    }

    if (newContent !== editorState.content) {
      dispatch(updateContent(newContent));
    }
  }, [editorState, dispatch]);

  const handleTemplateChange = (template: "openSource" | "enterprise" | "technicalDocs") => {
    dispatch(selectTemplate(template));
  };

  const handleAddTechnology = (tech: string) => {
    dispatch(addTechnology(tech));
  };

  const handleRemoveTechnology = (tech: string) => {
    dispatch(removeTechnology(tech));
  };

  return (
    <div className="editor-panel">
      <div className="editor-header">
        <h2 className="editor-title">Configuración del README</h2>
        <p className="editor-subtitle">
          Personaliza tu archivo README con la información de tu proyecto
        </p>
      </div>

      <div className="editor-content">
        <TemplateSelector
          selectedTemplate={editorState.selectedTemplate}
          onTemplateChange={handleTemplateChange}
        />

        <form className="editor-form">
          <div className="form-section">
            <h3 className="section-title">📝 Información Básica</h3>

            <div className="form-group">
              <label htmlFor="projectName" className="form-label">
                Nombre del Proyecto *
              </label>
              <input
                id="projectName"
                type="text"
                className="form-input"
                placeholder="Mi Proyecto Increíble"
                {...register("projectName", { required: "El nombre del proyecto es obligatorio" })}
              />
              {errors.projectName && (
                <span className="error-message">{errors.projectName.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="projectDescription" className="form-label">
                Descripción del Proyecto *
              </label>
              <textarea
                id="projectDescription"
                className="form-textarea"
                placeholder="Una breve descripción de lo que hace tu proyecto..."
                rows={3}
                {...register("projectDescription", { required: "La descripción es obligatoria" })}
              />
              {errors.projectDescription && (
                <span className="error-message">{errors.projectDescription.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="author" className="form-label">
                Autor
              </label>
              <input
                id="author"
                type="text"
                className="form-input"
                placeholder="Tu Nombre"
                {...register("author")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="githubUrl" className="form-label">
                URL del Repositorio
              </label>
              <input
                id="githubUrl"
                type="url"
                className="form-input"
                placeholder="https://github.com/usuario/proyecto"
                {...register("githubUrl")}
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">🚀 Tecnologías</h3>
            <TechStackSelector
              selectedTechnologies={editorState.technologies}
              onAddTechnology={handleAddTechnology}
              onRemoveTechnology={handleRemoveTechnology}
            />
          </div>

          <div className="form-section">
            <h3 className="section-title">📦 Instalación y Uso</h3>

            <div className="form-group">
              <label htmlFor="installation" className="form-label">
                Instrucciones de Instalación
              </label>
              <textarea
                id="installation"
                className="form-textarea"
                placeholder="Describe los pasos para instalar tu proyecto..."
                rows={4}
                {...register("installation")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="usage" className="form-label">
                Instrucciones de Uso
              </label>
              <textarea
                id="usage"
                className="form-textarea"
                placeholder="Explica cómo usar tu proyecto..."
                rows={4}
                {...register("usage")}
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">🤝 Contribución y Licencia</h3>

            <div className="form-group">
              <label htmlFor="contributing" className="form-label">
                Guía de Contribución
              </label>
              <textarea
                id="contributing"
                className="form-textarea"
                placeholder="Describe cómo otros pueden contribuir a tu proyecto..."
                rows={3}
                {...register("contributing")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="license" className="form-label">
                Licencia
              </label>
              <select id="license" className="form-select" {...register("license")}>
                <option value="MIT">MIT</option>
                <option value="Apache-2.0">Apache 2.0</option>
                <option value="GPL-3.0">GPL 3.0</option>
                <option value="BSD-3-Clause">BSD 3-Clause</option>
                <option value="ISC">ISC</option>
                <option value="Propietaria">Propietaria</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditorPanel;
