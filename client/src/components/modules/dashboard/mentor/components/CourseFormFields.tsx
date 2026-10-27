import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  className?: string;
  type?: "text" | "url";
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export function CourseInputField({ label, name, placeholder, className, type = "text", value, error, onChange, onBlur }: FieldProps) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && <p id={`${name}-error`} className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function CourseTextareaField({
  label,
  name,
  placeholder,
  rows = 3,
  className,
  value,
  error,
  onChange,
  onBlur,
}: FieldProps & { rows?: number }) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label htmlFor={name}>{label}</Label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full resize-y rounded-2xl border border-border bg-background px-3 py-2.5 text-sm leading-6 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 placeholder:text-muted-foreground"
      />
      {error && <p id={`${name}-error`} className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function CourseLevelField({ value, onChange, onBlur, error }: Pick<FieldProps, "value" | "onChange" | "onBlur" | "error">) {
  return (
    <div className="space-y-2">
      <Label htmlFor="level">Level</Label>
      <select
        id="level"
        name="level"
        value={value}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "level-error" : undefined}
        className="h-10 w-full rounded-full border border-border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
      >
        <option>Beginner</option>
        <option>Intermediate</option>
      </select>
      {error && <p id="level-error" className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
