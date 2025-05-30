import { ContentStatistics } from "@/types";

//descarga con los paramas dados
export const downloadFile = (
  content: string,
  filename: string,
  mimeType: string = "text/plain"
): void => {
  try {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    //limpiar recursos
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al descargar archivo:", error);
    throw new Error("Error al descargar el archivo");
  }
};

//descargar el README
export const downloadReadme = (content: string, projectName?: string): void => {
  const filename = projectName
    ? `${projectName.toLowerCase().replace(/\s+/g, "-")}-README.md` //expresion regular para reemplazar espacios por guiones
    : "README.md";

  downloadFile(content, filename, "text/markdown");
};

//copiar al portapapeles
export const copyToClipboard = async (content: string): Promise<void> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(content);
    } else {
      // Método alternativo para navegadores antiguos
      const textArea = document.createElement("textarea");
      textArea.value = content;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      textArea.style.pointerEvents = "none";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("Error en copia alternativa:", err);
        throw new Error("Error al copiar al portapapeles");
      } finally {
        document.body.removeChild(textArea);
      }
    }
  } catch (error) {
    console.error("Error al copiar al portapapeles:", error);
    throw new Error("Error al copiar al portapapeles");
  }
};

//obtener stats sobre el contenido
export const getContentStatistics = (content: string): ContentStatistics => {
  const lines = content.split("\n").length;
  const characters = content.length;
  const words = content.split(/\s+/).filter(word => word.length > 0).length;

  // Contar secciones (encabezados que empiezan con #)
  const sections = (content.match(/^#+\s/gm) || []).length;

  return {
    lines,
    characters,
    words,
    sections,
  };
};

//si el contenido es markdown valido
export const validateMarkdown = (content: string): boolean => {
  try {
    const hasHeaders = /^#+\s/.test(content); //expresion regular para verificar encabezados
    const hasValidSyntax = !/\*{3,}/.test(content) && !/_{3,}/.test(content); //expresion reguilar para verificar sintaxis valida

    return hasHeaders && hasValidSyntax;
  } catch (error) {
    return false;
  }
};

//formatear para diferentes plataformas
export const formatForPlatform = (
  content: string,
  platform: "github" | "gitlab" | "bitbucket" | "generic" = "github"
): string => {
  switch (platform) {
    case "github":
      //para GitHub
      return content.replace(/\[!\[.*?\]\(.*?\)\]\(.*?\)/g, match => {
        return match;
      });

    case "gitlab":
      //para GitLab
      return content.replace(/```(\w+)/g, "```$1").replace(/\[TOC\]/g, "[[_TOC_]]");

    case "bitbucket":
      //para Bitbucket
      return content;

    default:
      return content;
  }
};

// Limpia el nombre de archivo para que sea seguro para descarga
export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-z0-9]/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
};

export const exportUtils = {
  downloadFile,
  downloadReadme,
  copyToClipboard,
  getContentStatistics,
  validateMarkdown,
  formatForPlatform,
  sanitizeFilename,
};
