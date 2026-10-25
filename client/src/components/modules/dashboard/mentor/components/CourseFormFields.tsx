import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  className?: string;
  type?: "text" | "url";
};

export function CourseInputField({ label, name, placeholder, required, className, type = "text" }: FieldProps) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} placeholder={placeholder} required={required} />
    </div>
  );
}

export function CourseTextareaField({
  label,
  name,
  placeholder,
  required,
  rows = 3,
  className,
}: FieldProps & { rows?: number }) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label htmlFor={name}>{label}</Label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-y rounded-2xl border border-border bg-background px-3 py-2.5 text-sm leading-6 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 placeholder:text-muted-foreground"
      />
    </div>
  );
}

export function CourseLevelField() {
  return (
    <div className="space-y-2">
      <Label htmlFor="level">Level</Label>
      <select id="level" name="level" defaultValue="Beginner" className="h-10 w-full rounded-full border border-border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30">
        <option>Beginner</option>
        <option>Intermediate</option>
      </select>
    </div>
  );
}
