import { Suspense } from "react";
import { NavbarClient } from "./NavbarClient";
import { DEFAULT_SITE_SETTINGS } from "@/lib/siteChromeDefaults";
import { getCmsSiteSettings } from "@/lib/cmsSiteSettings";

async function NavbarWithCmsSettings() {
  const settings = await getCmsSiteSettings();
  return <NavbarClient settings={settings.header} />;
}

export function Navbar() {
  return (
    <Suspense fallback={<NavbarClient settings={DEFAULT_SITE_SETTINGS.header} />}>
      <NavbarWithCmsSettings />
    </Suspense>
  );
}
