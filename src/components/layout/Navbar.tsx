import { NavbarClient } from "./NavbarClient";
import { DEFAULT_SITE_SETTINGS } from "@/lib/siteChromeDefaults";

export function Navbar({ heroVariant = false }: { heroVariant?: boolean } = {}) {
  return <NavbarClient settings={DEFAULT_SITE_SETTINGS.header} heroVariant={heroVariant} />;
}
