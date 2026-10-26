import configPromise from "@payload-config";
import "@payloadcms/next/css";
import {
  handleServerFunctions,
  RootLayout,
} from "@payloadcms/next/layouts";
import type { ServerFunctionClientArgs } from "payload";
import { importMap } from "./admin/importMap.js";

const serverFunction = async (args: ServerFunctionClientArgs) => {
  "use server";
  return handleServerFunctions({ ...args, config: configPromise, importMap });
};

export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayout
      config={configPromise}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  );
}
