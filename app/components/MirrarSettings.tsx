import { Toast, Button, Form, Layout, TextField, Frame } from "@shopify/polaris";
import React, { useState, useCallback } from "react";

interface Props {
  data: { value: string }[];
  store: string;
  api: string;
}
interface Metafield {
  metafield: {
    namespace: string;
    key: string;
    type: string;
    value: string;
  };
}

const MirrarSettings: React.FC<Props> = (props) => {
  const [apiKey, setApiKey] = useState<string>(props.data[1].value);
  const [stores, setStores] = useState<string>(props.data[0].value);
  const [loading, setLoading] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleChange = (key: string, value: string) => {
    if (key === 'apiKey') {
      setApiKey(value);
    } else if (key === 'stores') {
      setStores(value);
    }
  };

  const saveData = async (props: Props, apiKey: string, stores: string) => {
    setLoading(true);
    try {
      const metafieldData: Metafield[] = [
        { metafield: { namespace: 'mirrar', key: 'api_key', type: 'string', value: apiKey } },
        { metafield: { namespace: 'mirrar', key: 'client_secret', type: 'string', value: stores } }
      ];

      const promises = metafieldData.map(data =>
        fetch(`https://${props.store}/admin/api/2024-01/metafields.json`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': props.api },
          body: JSON.stringify(data)
        })
      );

      await Promise.all(promises);
      setActive(true);
      console.log("Api Key and Secret Key saved successfully.");
    } catch (error) {
      console.error("Failed to save metafields:", error);
    } finally {
      setLoading(false);
    }
  };

  const toastMarkup = active ? (
    <Toast content="Api Key and Secret Key saved successfully." onDismiss={toggleActive} />
  ) : null;

  return (
    <div style={{ marginTop: "20px" }}>
      <Frame>
        <Layout>
          <Layout.Section>
            <div className="Polaris-Labelled__LabelWrapper">
              <div className="Polaris-Label">
                <label htmlFor="apiKey" className="Polaris-Label__Text">MirrAR API Key</label>
              </div>
            </div>
            <div className="Polaris-Connected">
              <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                <div className="Polaris-TextField Polaris-TextField--hasValue">
                  <input
                    id="apiKey"
                    aria-labelledby="apiKey" aria-invalid="false" data-1p-ignore="true" data-lpignore="true" data-form-type="other"
                    className="Polaris-TextField__Input"
                    type={showPassword ? "text" : "password"}
                    label="MirrAR API Key"
                    value={apiKey}
                    onChange={(e) => handleChange('apiKey', e.target.value)}
                    autoComplete="off"
                  />
                  <div className="Polaris-TextField__Backdrop"></div>
                </div>
              </div>
            </div>
            <div className="Polaris-Labelled__LabelWrapper">
              <div className="Polaris-Label">
                <label htmlFor="stores" className="Polaris-Label__Text">MirrAR Client Secret</label>
              </div>
            </div>
            <div className="Polaris-Connected">
              <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                <div className="Polaris-TextField Polaris-TextField--hasValue">
                  <input
                    id="stores"
                    aria-labelledby="stores" aria-invalid="false" data-1p-ignore="true" data-lpignore="true" data-form-type="other"
                    className="Polaris-TextField__Input"
                    type={showPassword ? "text" : "password"}
                    label="MirrAR Client Secret"
                    value={stores}
                    onChange={(e) => handleChange('stores', e.target.value)}
                    autoComplete="off"
                  />
                  <div className="Polaris-TextField__Backdrop"></div>
                </div>
              </div>
            </div>
          </Layout.Section>
        </Layout>
        <Button onClick={saveData}>{loading ? 'Loading..' : 'Save'}</Button><div style={{ marginTop: "10px" }}>
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Keys
          </label>
        </div>
        {toastMarkup}
      </Frame>
    </div>
  );
};

export default MirrarSettings;


