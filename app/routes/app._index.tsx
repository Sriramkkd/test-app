import React, { useCallback, useEffect, useState } from "react";
import { Banner, InlineGrid, Layout, Link, Page, Tabs } from "@shopify/polaris";
import MirrarButton from "../components/MirrarButton";
import MirrarSettings from "../components/MirrarSettings";

interface Metafield {
  id: string;
  key: string;
  namespace: string;
  value: string;
}

interface IndexProps {}

const Index: React.FC<IndexProps> = (props) => {
  const [metafields, setMetafields] = useState<Metafield[]>([]);
  const [api, setApi] = useState<string>("");
  const [store, setStore] = useState<string>("");
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var selfStore = JSON.parse(sessionStorage.getItem("app-bridge-config"));

      const keyResponse = await fetch(
        "https://vtoshopify.pages.dev/data?shop=" + selfStore.shop,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const keyData = await keyResponse.text();
      const key = keyData;
        setApi(key);
        setStore(selfStore.shop);

        const response = await fetch(
          `https://${selfStore.shop}/admin/api/2024-01/graphql.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Access-Token": key,
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              query: `
      {
        shop {
          metafields(first: 100, namespace: "mirrar") {
            edges {
              node {
                id
                key
                namespace
                value
              }
            }
          }
        }
      }
    `,
            }),
          },
        );

        const responseData = await response.json();
        setMetafields(
          responseData.data.shop.metafields.edges.map((edge: any) => edge.node),
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: "button",
      content: "MirrAR Button",
      panelId: "button-settings",
      component: <MirrarButton data={metafields} api={api} store={store} />,
    },
    {
      id: "settings",
      content: "MirrAR Settings",
      panelId: "mirrar-settings",
      component: <MirrarSettings data={metafields} api={api} store={store} />,
    },
  ];

  const hideGrid = () => {
    setShowGrid(false);
  };

  return (
    <Page>
      <Layout>
        <Layout.Section>
          {showGrid && (
            <InlineGrid columns={1}>
              <Banner>
                <p>
                  Signup for MirrAR SDK account at{" "}
                  <Link url="https://developer.mirrar.in" target="_blank">
                    developer.MirrAR.in
                  </Link>{" "}
                  then copy and paste API and Secret keys from{" "}
                  <Link url="https://developer.mirrar.in/login" target="_blank">
                    domain page
                  </Link>{" "}
                  into the API Connection form.
                </p>
              </Banner>
            </InlineGrid>
          )}
          <InlineGrid columns={2}>
            <h2 className="Polaris-Text--root Polaris-Text--heading2xl">
              MirrAR
            </h2>
          </InlineGrid>
        </Layout.Section>
        <Layout.Section>
          <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
            {tabs[selected].component}
          </Tabs>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Index;
