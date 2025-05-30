import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LivePreview from "./LivePreview";

const PreviewPanel: React.FC = () => {
  const { content, projectName } = useSelector((state: RootState) => state.editor);
  const [activeTab, setActiveTab] = useState<"preview" | "raw">("preview");

  const handleDownload = () => {
    //1- creacion del archivo
    const fileName = projectName
      ? `${projectName.toLowerCase().replace(/\s+/g, "-")}-README.md` //expresion reguar para reemplazar espacios por guiones
      : "README.md";

    //2- blob con el contenido del README
    const blob = new Blob([content], { type: "text/markdown" });

    //3- crear un enlace temporal para descargar el archivo
    const url = URL.createObjectURL(blob);

    //4- crear un enlace y simular un clic para descargar el archivo
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    //5- agregar el enlace al DOM, hacer clic y luego eliminarlo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // limpiar el DOM

    //6- liberar el objeto URL creado
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      //quizas poner notificaciones, sonner por ejemplo
      alert("¡README copiado al portapapeles!");
    } catch (err) {
      console.error("Error al copiar al portapapeles:", err);
      alert("Error al copiar al portapapeles");
    }
  };

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <h2 className="preview-title">Vista Previa del README</h2>
        <div className="preview-actions">
          <button
            className="btn btn-outline"
            onClick={handleCopyToClipboard}
            title="Copiar al portapapeles"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              {/* icono de copiar al portapapeles */}
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
            </svg>
            Copiar
          </button>
          <button className="btn btn-primary" onClick={handleDownload} title="Descargar README.md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              {/* icono de descarga */}
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
            Descargar
          </button>
        </div>
      </div>

      <div className="preview-tabs">
        <button
          className={`tab-button ${activeTab === "preview" ? "active" : ""}`}
          onClick={() => setActiveTab("preview")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            {/* icono de vista previa */}
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
          </svg>
          Vista Previa
        </button>
        <button
          className={`tab-button ${activeTab === "raw" ? "active" : ""}`}
          onClick={() => setActiveTab("raw")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z" />
          </svg>
          Código
        </button>
      </div>

      <div className="preview-content">
        {activeTab === "preview" ? (
          <LivePreview content={content} />
        ) : (
          <div className="raw-content">
            <pre className="markdown-raw">
              <code>{content}</code>
            </pre>
          </div>
        )}
      </div>

      <div className="preview-stats">
        <div className="stat-item">
          <span className="stat-label">Líneas:</span>
          <span className="stat-value">{content.split("\n").length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Caracteres:</span>
          <span className="stat-value">{content.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Palabras:</span>
          <span className="stat-value">
            {content.split(/\s+/).filter(word => word.length > 0).length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
