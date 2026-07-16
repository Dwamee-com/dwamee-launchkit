import { createContext, useContext, useState, ReactNode } from "react";

export type FieldType = "text" | "number" | "date" | "select";

export interface Translation {
  locale: string;
  label: string;
}

export interface CustomField {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  options?: string[];
  translations: Translation[];
}

export interface CustomSection {
  id: string;
  name: string;
  fields: CustomField[];
}

interface Ctx {
  sections: CustomSection[];
  setSections: (s: CustomSection[]) => void;
  totalFieldCount: number;
}

const AttributesContext = createContext<Ctx | null>(null);

const initialSections: CustomSection[] = [
  {
    id: "s1",
    name: "Personal Info",
    fields: [
      { id: "f1", type: "text", label: "Nickname", translations: [{ locale: "en", label: "Nickname" }, { locale: "ar-EG", label: "الاسم المستعار" }, { locale: "ar-SA", label: "الكنية" }] },
      { id: "f2", type: "date", label: "Date of Birth", translations: [{ locale: "en", label: "Date of Birth" }, { locale: "ar-EG", label: "تاريخ الميلاد" }] },
    ],
  },
  {
    id: "s2",
    name: "Emergency Contact",
    fields: [
      { id: "f3", type: "text", label: "Contact Name", translations: [{ locale: "en", label: "Contact Name" }] },
      { id: "f4", type: "number", label: "Contact Phone", translations: [{ locale: "en", label: "Contact Phone" }] },
      { id: "f5", type: "select", label: "Relationship", options: ["Parent", "Spouse", "Sibling", "Friend"], translations: [{ locale: "en", label: "Relationship" }] },
    ],
  },
];

export function AttributesProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<CustomSection[]>(initialSections);
  const totalFieldCount = sections.reduce((sum, s) => sum + s.fields.length, 0);
  return (
    <AttributesContext.Provider value={{ sections, setSections, totalFieldCount }}>
      {children}
    </AttributesContext.Provider>
  );
}

export function useAttributes() {
  const ctx = useContext(AttributesContext);
  if (!ctx) throw new Error("useAttributes must be used within AttributesProvider");
  return ctx;
}
