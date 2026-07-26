import axios, { type AxiosResponse } from "axios";
import type { Note, NewNote } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const noteHubApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string,
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> =
    await noteHubApi.get<FetchNotesResponse>("/notes", {
      params: {
        page,
        perPage: 12,
        search,
      },
    });

  return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteHubApi.post<Note>(
    "/notes",
    newNote,
  );

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteHubApi.delete<Note>(
    `/notes/${id}`,
  );

  return response.data;
};
