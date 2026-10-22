import { NavBar } from "@/components/ui/navbar";

export default function CommonLayout({ children }: LayoutProps<"/">) {
  const links = [
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "Pricing", href: "/pricing" },
  ];
  return (
    <div>
      <NavBar
        logo={<span className="text-lg font-bold">MyApp</span>}
        links={links}
        locales={[{ code: "en" }, { code: "fr" }, { code: "es" }]}
        // value={locale} // omit for uncontrolled, use defaultValue instead
        // onValueChange={setLocale}
        cta={{ label: "Get Started", href: "/signup" }}
        showGitHub
        githubUrl="your-org/your-repo" // or a full URL
      />
      {children}
    </div>
  );
}
