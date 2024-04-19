import type { HeadersFunction, LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";

import { json } from "@remix-run/cloudflare";
import { initShopify } from "../shopify.server";

import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

export const links: LinksFunction = () => [
  ...(polarisStyles ? [{ rel: "stylesheet", href: polarisStyles }] : []),
];

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  await initShopify(context).authenticate.admin(request);

  return json({ apiKey: context.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <ui-nav-menu>
        <Link to="/app" rel="home">
          Home
        </Link>
      </ui-nav-menu>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
