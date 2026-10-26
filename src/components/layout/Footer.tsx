import { Suspense } from "react";
import { FooterClient } from "./FooterClient";
import { DEFAULT_SITE_SETTINGS } from "@/lib/siteChromeDefaults";
import { getCmsSiteSettings } from "@/lib/cmsSiteSettings";

async function FooterWithCmsSettings() {
  const settings = await getCmsSiteSettings();
  return <FooterClient settings={settings.footer} />;
}

export function Footer() {
  return (
    <Suspense fallback={<FooterClient settings={DEFAULT_SITE_SETTINGS.footer} />}>
      <FooterWithCmsSettings />
    </Suspense>
  );
}
