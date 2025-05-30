import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDefaultTemplate } from "@/lib/templates/openSource";

export type ReadmeTemplate = "openSource" | "enterprise" | "technicalDocs";

export interface EditorState {
  projectName: string;
  projectDescription: string;
  content: string;
  selectedTemplate: ReadmeTemplate;
  technologies: string[];
  installation: string;
  usage: string;
  contributing: string;
  license: string;
  author: string;
  githubUrl: string;
}

const initialState: EditorState = {
  projectName: "",
  projectDescription: "",
  content: getDefaultTemplate(),
  selectedTemplate: "openSource",
  technologies: [],
  installation: "",
  usage: "",
  contributing: "",
  license: "MIT",
  author: "",
  githubUrl: "",
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof EditorState; value: string | string[] }>
    ) => {
      const { field, value } = action.payload;
      (state as Record<string, unknown>)[field] = value;
    },
    updateContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    selectTemplate: (state, action: PayloadAction<ReadmeTemplate>) => {
      state.selectedTemplate = action.payload;
    },
    addTechnology: (state, action: PayloadAction<string>) => {
      if (!state.technologies.includes(action.payload)) {
        state.technologies.push(action.payload);
      }
    },
    removeTechnology: (state, action: PayloadAction<string>) => {
      state.technologies = state.technologies.filter(tech => tech !== action.payload);
    },
    resetEditor: () => {
      return initialState;
    },
  },
});

export const {
  updateField,
  updateContent,
  selectTemplate,
  addTechnology,
  removeTechnology,
  resetEditor,
} = editorSlice.actions;

export default editorSlice.reducer;
