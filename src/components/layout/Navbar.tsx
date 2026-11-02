import { Suspense } from "react";
import { NavbarClient } from "./NavbarClient";
import { DEFAULT_SITE_SETTINGS } from "@/lib/siteChromeDefaults";
import { getCmsSiteSettings } from "@/lib/cmsSiteSettings";

async function NavbarWithCmsSettings({ heroVariant = false }: { heroVariant?: boolean }) {
  const settings = await getCmsSiteSettings();
  return <NavbarClient settings={settings.header} heroVariant={heroVariant} />;
}

export function Navbar({ heroVariant = false }: { heroVariant?: boolean } = {}) {
  return (
    <Suspense fallback={<NavbarClient settings={DEFAULT_SITE_SETTINGS.header} heroVariant={heroVariant} />}>
      <NavbarWithCmsSettings heroVariant={heroVariant} />
    </Suspense>
  );
}
