import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Type, Hash, Calendar, ListChecks, GripVertical, Plus, Trash2, Languages, X } from "lucide-react";
import { CustomField, CustomSection, FieldType, useAttributes } from "@/contexts/AttributesContext";

const paletteItems: { type: FieldType; label: string; icon: any }[] = [
  { type: "text", label: "Text", icon: Type },
  { type: "number", label: "Number", icon: Hash },
  { type: "date", label: "Date", icon: Calendar },
  { type: "select", label: "Select", icon: ListChecks },
];

const typeIcon = (t: FieldType) => paletteItems.find(p => p.type === t)?.icon ?? Type;

function PaletteCard({ type, label, icon: Icon }: { type: FieldType; label: string; icon: any }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `palette-${type}`, data: { fromPalette: true, type } });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-muted/40 cursor-grab active:cursor-grabbing transition ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-[11px] text-muted-foreground">Drag to canvas</p>
      </div>
    </div>
  );
}

function SortableField({ field, sectionId, selected, onSelect, onDelete }: { field: CustomField; sectionId: string; selected: boolean; onSelect: () => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id, data: { sectionId, fieldId: field.id } });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 };
  const Icon = typeIcon(field.type);
  return (
    <div ref={setNodeRef} style={style} onClick={onSelect}
      className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition ${selected ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted/40"}`}
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none">
        <GripVertical className="w-4 h-4" />
      </button>
      <Icon className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium flex-1 truncate">{field.label}</span>
      <Badge variant="secondary" className="text-[10px] uppercase">{field.type}</Badge>
      <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-muted-foreground hover:text-destructive">
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function SectionDropZone({ section, selectedFieldId, onSelectField, onRename, onDelete, onDeleteField }: {
  section: CustomSection; selectedFieldId: string | null; onSelectField: (id: string) => void;
  onRename: (name: string) => void; onDelete: () => void; onDeleteField: (fid: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `section-${section.id}`, data: { sectionId: section.id } });
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between gap-2 p-3 border-b border-border bg-muted/30">
        <Input value={section.name} onChange={(e) => onRename(e.target.value)} className="max-w-xs font-semibold" />
        <div className="flex items-center gap-2">
          <Badge variant="outline">{section.fields.length} fields</Badge>
          <button onClick={onDelete} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
        </div>
      </div>
      <div ref={setNodeRef} className={`p-3 space-y-2 min-h-[80px] transition ${isOver ? "bg-primary/5" : ""}`}>
        <SortableContext items={section.fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
          {section.fields.map(f => (
            <SortableField
              key={f.id}
              field={f}
              sectionId={section.id}
              selected={selectedFieldId === f.id}
              onSelect={() => onSelectField(f.id)}
              onDelete={() => onDeleteField(f.id)}
            />
          ))}
        </SortableContext>
        {section.fields.length === 0 && (
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center text-xs text-muted-foreground">
            Drop fields here
          </div>
        )}
      </div>
    </div>
  );
}

export default function CustomAttributes() {
  const { sections, setSections } = useAttributes();
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const selectedField = sections.flatMap(s => s.fields).find(f => f.id === selectedFieldId) ?? null;
  const selectedSectionId = sections.find(s => s.fields.some(f => f.id === selectedFieldId))?.id ?? null;

  const updateField = (updates: Partial<CustomField>) => {
    if (!selectedField || !selectedSectionId) return;
    setSections(sections.map(s => s.id !== selectedSectionId ? s : {
      ...s, fields: s.fields.map(f => f.id === selectedField.id ? { ...f, ...updates } : f)
    }));
  };

  const addSection = () => {
    setSections([...sections, { id: `s${Date.now()}`, name: "New Section", fields: [] }]);
  };

  const renameSection = (id: string, name: string) =>
    setSections(sections.map(s => s.id === id ? { ...s, name } : s));

  const deleteSection = (id: string) =>
    setSections(sections.filter(s => s.id !== id));

  const deleteField = (sectionId: string, fieldId: string) => {
    setSections(sections.map(s => s.id !== sectionId ? s : { ...s, fields: s.fields.filter(f => f.id !== fieldId) }));
    if (selectedFieldId === fieldId) setSelectedFieldId(null);
  };

  const onDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id));

  const onDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = e;
    if (!over) return;
    const activeData = active.data.current as any;
    const overData = over.data.current as any;

    // From palette -> section
    if (activeData?.fromPalette) {
      const targetSectionId = overData?.sectionId ?? sections.find(s => s.fields.some(f => f.id === over.id))?.id;
      if (!targetSectionId) return;
      const newField: CustomField = {
        id: `f${Date.now()}`,
        type: activeData.type,
        label: `New ${activeData.type} field`,
        options: activeData.type === "select" ? ["Option 1", "Option 2"] : undefined,
        translations: [{ locale: "en", label: `New ${activeData.type} field` }],
      };
      setSections(sections.map(s => s.id !== targetSectionId ? s : { ...s, fields: [...s.fields, newField] }));
      setSelectedFieldId(newField.id);
      return;
    }

    // Reorder within/between sections
    const fromSectionId = activeData?.sectionId;
    if (!fromSectionId) return;
    const toSectionId = overData?.sectionId ?? sections.find(s => s.fields.some(f => f.id === over.id))?.id;
    if (!toSectionId) return;

    if (fromSectionId === toSectionId) {
      const section = sections.find(s => s.id === fromSectionId)!;
      const oldIndex = section.fields.findIndex(f => f.id === active.id);
      const newIndex = section.fields.findIndex(f => f.id === over.id);
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;
      setSections(sections.map(s => s.id !== fromSectionId ? s : { ...s, fields: arrayMove(s.fields, oldIndex, newIndex) }));
    } else {
      const moving = sections.find(s => s.id === fromSectionId)!.fields.find(f => f.id === active.id)!;
      setSections(sections.map(s => {
        if (s.id === fromSectionId) return { ...s, fields: s.fields.filter(f => f.id !== active.id) };
        if (s.id === toSectionId) {
          const overIdx = s.fields.findIndex(f => f.id === over.id);
          const newFields = [...s.fields];
          if (overIdx === -1) newFields.push(moving);
          else newFields.splice(overIdx, 0, moving);
          return { ...s, fields: newFields };
        }
        return s;
      }));
    }
  };

  const addTranslation = () => {
    if (!selectedField) return;
    updateField({ translations: [...selectedField.translations, { locale: "", label: "" }] });
  };

  const updateTranslation = (idx: number, key: "locale" | "label", value: string) => {
    if (!selectedField) return;
    const next = selectedField.translations.map((t, i) => i === idx ? { ...t, [key]: value } : t);
    updateField({ translations: next });
  };

  const removeTranslation = (idx: number) => {
    if (!selectedField) return;
    updateField({ translations: selectedField.translations.filter((_, i) => i !== idx) });
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Custom Attributes Builder</h1>
          <p className="text-sm text-muted-foreground">Design profile fields, group into sections, and add localized labels</p>
        </div>
        <Button onClick={addSection}><Plus className="w-4 h-4 mr-1" /> Add Section</Button>
      </div>

      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_340px] gap-4">
          {/* Palette */}
          <Card className="p-4 h-fit">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2"><Plus className="w-4 h-4" /> Field Types</h3>
            <div className="space-y-2">
              {paletteItems.map(p => <PaletteCard key={p.type} {...p} />)}
            </div>
          </Card>

          {/* Canvas */}
          <div className="space-y-4">
            {sections.map(s => (
              <SectionDropZone
                key={s.id}
                section={s}
                selectedFieldId={selectedFieldId}
                onSelectField={setSelectedFieldId}
                onRename={(name) => renameSection(s.id, name)}
                onDelete={() => deleteSection(s.id)}
                onDeleteField={(fid) => deleteField(s.id, fid)}
              />
            ))}
            {sections.length === 0 && (
              <Card className="p-12 text-center text-sm text-muted-foreground">
                No sections yet. Click "Add Section" to start building.
              </Card>
            )}
          </div>

          {/* Inspector */}
          <Card className="p-4 h-fit sticky top-4">
            <h3 className="font-semibold text-sm mb-3">Field Inspector</h3>
            {!selectedField ? (
              <div className="text-sm text-muted-foreground text-center py-10">
                Select a field to edit its properties.
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label className="text-xs">Label</Label>
                  <Input value={selectedField.label} onChange={e => updateField({ label: e.target.value })} />
                </div>
                <div>
                  <Label className="text-xs">Input Type</Label>
                  <Select value={selectedField.type} onValueChange={(v) => updateField({ type: v as FieldType })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {paletteItems.map(p => <SelectItem key={p.type} value={p.type}>{p.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                {selectedField.type === "select" && (
                  <div>
                    <Label className="text-xs">Options (comma-separated)</Label>
                    <Input
                      value={(selectedField.options ?? []).join(", ")}
                      onChange={e => updateField({ options: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                    />
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs flex items-center gap-1"><Languages className="w-3 h-3" /> Localized Translations</Label>
                    <Button size="sm" variant="ghost" onClick={addTranslation}><Plus className="w-3 h-3 mr-1" />Add</Button>
                  </div>
                  <div className="rounded-lg border border-border overflow-hidden">
                    <table className="w-full text-xs">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-2 font-medium">Locale</th>
                          <th className="text-left p-2 font-medium">Label</th>
                          <th className="w-8"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedField.translations.map((t, i) => (
                          <tr key={i} className="border-t border-border">
                            <td className="p-1"><Input value={t.locale} placeholder="ar-EG" onChange={e => updateTranslation(i, "locale", e.target.value)} className="h-7 text-xs" /></td>
                            <td className="p-1"><Input value={t.label} onChange={e => updateTranslation(i, "label", e.target.value)} className="h-7 text-xs" /></td>
                            <td className="p-1 text-center">
                              <button onClick={() => removeTranslation(i)} className="text-muted-foreground hover:text-destructive"><X className="w-3 h-3" /></button>
                            </td>
                          </tr>
                        ))}
                        {selectedField.translations.length === 0 && (
                          <tr><td colSpan={3} className="p-3 text-center text-muted-foreground">No translations</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">Use locales like <code>en</code>, <code>ar-EG</code>, <code>ar-SA</code>.</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        <DragOverlay>
          {activeId?.startsWith("palette-") && (
            <div className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm shadow-lg">
              Adding field...
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
