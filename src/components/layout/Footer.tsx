import { FooterClient } from "./FooterClient";
import { DEFAULT_SITE_SETTINGS } from "@/lib/siteChromeDefaults";

export function Footer() {
  return <FooterClient settings={DEFAULT_SITE_SETTINGS.footer} />;
}
