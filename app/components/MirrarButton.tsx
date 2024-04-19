import React, { Component } from "react";
import {
  Button,
  Checkbox,
  ColorPicker,
  DropZone,
  Frame,
  Layout,
  LegacyStack,
  RangeSlider,
  Select,
  Text,
  TextField,
  Thumbnail,
  hsbToRgb,
  rgbToHsb,
  Toast
} from "@shopify/polaris";
interface Props {
  api: string;
  store: string;
}
interface State {
  api: string;
  store: string;
  metafields: any[];
  metafields1: any[];
  buttonText: string;
  tryonPlace: string;
  loading: boolean;
  active: boolean;
  checked1: boolean;
  checked2: boolean;
  logoUrl: string;
  file: File | null;
  imageUrl: string | null;
  buttonBackground: {
    hue: number;
    brightness: number;
    saturation: number;
  };
  fontColor: {
    hue: number;
    brightness: number;
    saturation: number;
  };
  borderColor: {
    hue: number;
    brightness: number;
    saturation: number;
  };
  hoverColor: {
    hue: number;
    brightness: number;
    saturation: number;
  };
  shadowColor: {
    hue: number;
    brightness: number;
    saturation: number;
  };
  vertPaddButton: string;
  vertPaddButton1: string;
  horzPaddButton: string;
  horzPaddButton1: string;
  topMarButton: string;
  topMarButton1: string;
  bottomMarButton: string;
  bottomMarButton1: string;
  leftMarButton: string;
  leftMarButton1: string;
  rightMarButton: string;
  rightMarButton1: string;
  textSize: string;
  textSize1: string;
  textWeight: string;
  textWeight1: string;
  borderSize: string;
  borderSize1: string;
  borderRadius: string;
  borderRadius1: string;
  shadowRightLeft: string;
  shadowTopBottom: string;
  shadowBlur: string;
  shadowSpread: string;
  shadowInset: string;
  leftIconPosition: string;
  rightIconPosition: string;
  position: string;
  buttonDisplay: string;
  buttonALign: string;
  buttonWidth: string;
  iconMargin: string;
  pointer: string;
  buttonBackgroundHidden: boolean;
  fontColorHidden: boolean;
  borderColorHidden: boolean;
  hoverColorHidden: boolean;
  shadowColorHidden: boolean;
}

class MirrarButton extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      store: "#",
      api: "#",
      metafields: [],
      metafields1: [],
      buttonText: "Virtual Tryon",
      tryonPlace: "modal",
      loading: false,
      active: false,
      checked1: false,
      checked2: false,
      logoUrl: "",
      file: null,
      imageUrl: null,
      buttonBackground: {
        hue: 332.45,
        brightness: 100,
        saturation: 99.61,
      },
      fontColor: {
        hue: 0,
        brightness: 0,
        saturation: 1,
      },
      borderColor: {
        hue: 332.45,
        brightness: 100,
        saturation: 99.61,
      },
      hoverColor: {
        hue: 209.91,
        brightness: 60.83,
        saturation: 83.92,
      },
      shadowColor: {
        hue: 0,
        brightness: 0,
        saturation: 1,
      },
      vertPaddButton: "8",
      vertPaddButton1: "8",
      horzPaddButton: "25",
      horzPaddButton1: "25",
      topMarButton: "0",
      topMarButton1: "0",
      bottomMarButton: "0",
      bottomMarButton1: "0",
      leftMarButton: "0",
      leftMarButton1: "0",
      rightMarButton: "0",
      rightMarButton1: "0",
      textSize: "20",
      textSize1: "20",
      textWeight: "600",
      textWeight1: "600",
      borderSize: "0",
      borderSize1: "0",
      borderRadius: "0",
      borderRadius1: "0",
      shadowRightLeft: "0",
      shadowTopBottom: "0",
      shadowBlur: "0",
      shadowSpread: "0",
      shadowInset: "inset",
      leftIconPosition: "inline-block",
      rightIconPosition: "none",
      position: "left",
      buttonDisplay: "block",
      buttonALign: "center",
      buttonWidth: "auto",
      iconMargin: "10px",
      pointer: "pointer",
      buttonBackgroundHidden: true,
      fontColorHidden: true,
      borderColorHidden: true,
      hoverColorHidden: true,
      shadowColorHidden: true,
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleCheckboxChange1 = this.handleCheckboxChange1.bind(this);
  }

  async fetchData() {
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
      const keyData = await keyResponse.json();
      const key = keyData;

      this.setState({ api: key, store: selfStore.shop });

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
        }
      );
      const responseData = await response.json();
      var data = responseData.data.shop.metafields.edges.map((edge: any) => edge.node);
      const nonEmptyObjects = data.filter((obj: any) => {
        return Object.values(obj).some((value: any) => {
          return value !== "" && value !== null && value !== undefined;
        });
      });

      this.setState({ metafields: nonEmptyObjects });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  handleCheckboxChange(newChecked: boolean) {
    this.setState({ checked1: newChecked });
  }
  handleCheckboxChange1(newChecked1: boolean) {
    this.setState({ checked2: newChecked1 });
  }

  toggleActive = () => {
    this.setState((prevState) => ({ active: !prevState.active }));
  };

  handleChange = (value: string) => {
    this.setState({ buttonText: value });
  };
  handleTextSize = (value: string) => {
    this.setState({ textSize: value });
    this.setState({ textSize1: value });
  };
  handleShadowRightLeft = (value: string) => {
    this.setState({ shadowRightLeft: value });
  };
  handleShadowTopBottom = (value: string) => {
    this.setState({ shadowTopBottom: value });
  };
  handleShadowBlur = (value: string) => {
    this.setState({ shadowBlur: value });
  };
  handleShadowSpread = (value: string) => {
    this.setState({ shadowSpread: value });
  };
  handleTextWeight = (value: string) => {
    this.setState({ textWeight: value });
    this.setState({ textWeight1: value });
  };
  handleBorderSize = (value: string) => {
    this.setState({ borderSize: value });
    this.setState({ borderSize1: value });
  };
  handleBorderRadius = (value: string) => {
    this.setState({ borderRadius: value });
    this.setState({ borderRadius1: value });
  };
  handleVertPaddButton = (value: string) => {
    this.setState({ vertPaddButton: value });
    this.setState({ vertPaddButton1: value });
  };
  handleHorizPaddButton = (value: string) => {
    this.setState({ horzPaddButton: value });
    this.setState({ horzPaddButton1: value });
  };
  handleMarginTopButton = (value: string) => {
    this.setState({ topMarButton: value });
    this.setState({ topMarButton1: value });
  };
  handleMarginRightButton = (value: string) => {
    this.setState({ rightMarButton: value });
    this.setState({ rightMarButton1: value });
  };
  handleMarginBottomButton = (value: string) => {
    this.setState({ bottomMarButton: value });
    this.setState({ bottomMarButton1: value });
  };
  handleMarginLeftButton = (value: string) => {
    this.setState({ leftMarButton: value });
    this.setState({ leftMarButton1: value });
  };
  handleSelectChange = (value: string) => {
    this.setState({ tryonPlace: value });
  };
  handleSelectChange1 = (value: string) => {
    console.log(value);
    this.setState({ position: value });
    if (value == "left") {
      this.setState({ leftIconPosition: "inline-block" });
      this.setState({ rightIconPosition: "none" });
    } else {
      this.setState({ leftIconPosition: "none" });
      this.setState({ rightIconPosition: "inline-block" });
    }
  };
  handleSelectChange2 = (value: string) => {
    console.log(value);
    this.setState({ shadowInset: value });
  };
  handleButtonBackground(value: any) {
    this.setState({ buttonBackground: value });
  }
  showHidebuttonBackground = (value: string) => {
    if (value == "show") {
      this.setState({ buttonBackgroundHidden: false });
      this.setState({ fontColorHidden: true });
      this.setState({ borderColorHidden: true });
      this.setState({ hoverColorHidden: true });
      this.setState({ shadowColorHidden: true });
    } else if (value == "reset") {
      this.setState({
        buttonBackground: {
          hue: 332.45,
          brightness: 100,
          saturation: 99.61,
        },
      });
      this.setState({ buttonBackgroundHidden: true });
    } else {
      this.setState({ buttonBackgroundHidden: true });
    }
  };
  handleFontColor = (value: any) => {
    this.setState({ fontColor: value });
  };
  showHideFontColor = (value: string) => {
    if (value == "show") {
      this.setState({ fontColorHidden: false });
      this.setState({ buttonBackgroundHidden: true });
      this.setState({ borderColorHidden: true });
      this.setState({ hoverColorHidden: true });
    } else if (value == "reset") {
      this.setState({ fontColor: { hue: 0, brightness: 0, saturation: 1 } });
      this.setState({ fontColorHidden: true });
    } else {
      this.setState({ fontColorHidden: true });
    }
  };
  handleBorderColor = (value: any) => {
    this.setState({ borderColor: value });
  };
  showHideBorderColor = (value: string) => {
    if (value == "show") {
      this.setState({ borderColorHidden: false });
      this.setState({ fontColorHidden: true });
      this.setState({ buttonBackgroundHidden: true });
      this.setState({ hoverColorHidden: true });
    } else if (value == "reset") {
      this.setState({
        borderColor: { hue: 332.45, brightness: 100, saturation: 99.61 },
      });
      this.setState({ borderColorHidden: true });
    } else {
      this.setState({ borderColorHidden: true });
    }
  };
  handleHoverColor = (value: any) => {
    this.setState({ hoverColor: value });
  };
  showHideHoverColor = (value: string) => {
    if (value == "show") {
      this.setState({ borderColorHidden: true });
      this.setState({ fontColorHidden: true });
      this.setState({ buttonBackgroundHidden: true });
      this.setState({ hoverColorHidden: false });
    } else if (value == "reset") {
      this.setState({
        hoverColor: { hue: 209.91, brightness: 60.83, saturation: 83.92 },
      });
      this.setState({ hoverColorHidden: true });
    } else {
      this.setState({ hoverColorHidden: true });
    }
  };
  handleShadowColor = (value: any) => {
    this.setState({ shadowColor: value });
  };
  showHideShadowColor = (value: string) => {
    if (value == "show") {
      this.setState({ shadowColorHidden: false });
      this.setState({ fontColorHidden: true });
      this.setState({ buttonBackgroundHidden: true });
      this.setState({ borderColorHidden: true });
      this.setState({ hoverColorHidden: true });
    } else if (value == "reset") {
      this.setState({ shadowColor: { hue: 0, brightness: 0, saturation: 1 } });
      this.setState({ shadowColorHidden: true });
    } else {
      this.setState({ shadowColorHidden: true });
    }
  };
  componentDidMount() {
    this.fetchData();
  }

  handleDropZoneDrop = async (
    _dropFiles: any,
    acceptedFiles: File[],
    _rejectedFiles: any,
  ) => {
    const file = acceptedFiles[0];
    const pngFiles = acceptedFiles.filter((file) => file.type === "image/png");
    if (pngFiles.length > 0) {
      try {
        // Convert file to Base64
        const base64File = await this.convertFileToBase64(file);
        // Shopify Admin API endpoint for checking if metafield exists
        const checkEndpoint = `https://${this.props.store}/admin/api/2024-01/metafields.json?namespace=mirrar&key=tryon_logo`;

        // Check if metafield exists
        const checkResponse = await fetch(checkEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': this.props.api,
          },
        });
        const checkData = await checkResponse.json();

        // Shopify Admin API endpoint for creating or updating a metafield
        const endpoint = `https://${this.props.store}/admin/api/2024-01/metafields${checkData.metafields.length > 0 ? '/' + checkData.metafields[0].id : ''}.json`;

        // Metafield details
        const metafield = {
          metafield: {
            namespace: 'mirrar',
            key: 'tryon_logo',
            description: file.name,
            value: base64File,
            type: 'string',
          },
        };

        // Send POST or PUT request to Shopify Admin API to create or update metafield
        const response = checkData.metafields.length > 0
          ? await fetch(endpoint, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': this.props.api,
              },
              body: JSON.stringify(metafield),
            })
          : await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': this.props.api,
              },
              body: JSON.stringify(metafield),
            });

        const responseData = await response.json();
        console.log('Metafield created/updated:', responseData.metafield);

        // Update state to display the image
        this.setState({ file, imageUrl: URL.createObjectURL(file) });
      } catch (error) {
        console.error('Failed to upload file:', error);
      }
    }
  };

  convertFileToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };
  base64ToBlob = (base64: string) => {
    // Create a Blob from the base64 string
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/octet-stream" });

    // Generate a URL for the Blob
    const url = URL.createObjectURL(blob);

    return blob;
  };
  resetTextSizes() {
    this.setState({
      textSize: "20",
      textSize1: "20",
      textWeight: "600",
      textWeight1: "600",
      borderSize: "0",
      borderSize1: "0",
      borderRadius: "0",
      borderRadius1: "0",
    });
  }

  resetColors() {
    this.setState({
      buttonBackground: {
        hue: 0,
        brightness: 0,
        saturation: 1,
      },
      fontColor: {
        hue: 0,
        brightness: 100,
        saturation: 0,
      },
      borderColor: {
        hue: 0,
        brightness: 0,
        saturation: 0,
      },
      hoverColor: {
        hue: 0,
        brightness: 50,
        saturation: 0,
      },
    });
  }
  resetPosition() {
    this.setState({
      vertPaddButton: "8",
      vertPaddButton1: "8",
      horzPaddButton: "103",
      horzPaddButton1: "103",
      topMarButton: "10",
      topMarButton1: "10",
      bottomMarButton: "0",
      bottomMarButton1: "0",
      leftMarButton: "0",
      leftMarButton1: "0",
      rightMarButton: "0",
      rightMarButton1: "0",

      shadowTopBottom: "0",
      shadowRightLeft: "0",
      shadowBlur: "0",
      shadowSpread: "0",
      shadowInset: "inset",
      leftIconPosition: "none",
      rightIconPosition: "inline-block",
      position: "right",
      buttonDisplay: "block",
      buttonALign: "center",
      buttonWidth: "auto",
      iconMargin: "10px",
      pointer: "",
    });
  }

  render() {
    if (this.state.metafields.length !== 0) {
      const all_state1 = JSON.parse(this.state.metafields[2].value);

      // Convert Base64 to Blob
      if (this.state.metafields[3] != undefined) {
        const all_state2 = this.state.metafields[3];
        const blob: Blob = this.base64ToBlob(all_state2.value);
        // Update state with the Blob object

        this.setState({ file: blob });
        this.setState({ logoUrl: all_state2.description });
      } else {
        this.setState({ file: "" });
      }

      Object.keys(all_state1).forEach((key) => {
        if (key === "buttonBackground") {
          this.setState({ [key]: rgbToHsb(all_state1[key]) });
        } else if (key === "fontColor") {
          this.setState({ [key]: rgbToHsb(all_state1[key]) });
        } else if (key === "borderColor") {
          this.setState({ [key]: rgbToHsb(all_state1[key]) });
        } else if (key === "hoverColor") {
          this.setState({ [key]: rgbToHsb(all_state1[key]) });
        } else if (key === "shadowColor") {
          this.setState({ [key]: rgbToHsb(all_state1[key]) });
        } else {
          this.setState({ [key]: all_state1[key] });
        }
      });
      this.setState({ metafields: [] });
    }

    const { selected } = this.state;
    const buttonBackgroundRGB = hsbToRgb(this.state.buttonBackground);
    const fontColorRGB = hsbToRgb(this.state.fontColor);
    const borderColorRGB = hsbToRgb(this.state.borderColor);
    const hoverColorRGB = hsbToRgb(this.state.hoverColor);
    const shadowColorRGB = hsbToRgb(this.state.shadowColor);
    const saveData = async () => {
      this.setState({ loading: true });
      try {
        const all_state = {
          button_text: this.state.buttonText,
          tryonPlace: this.state.tryonPlace,
          checked1: this.state.checked1,
          checked2: this.state.checked2,
          buttonBackground: {
            red: buttonBackgroundRGB.red,
            green: buttonBackgroundRGB.green,
            blue: buttonBackgroundRGB.blue,
          },
          fontColor: {
            red: fontColorRGB.red,
            green: fontColorRGB.green,
            blue: fontColorRGB.blue,
          },
          borderColor: {
            red: borderColorRGB.red,
            green: borderColorRGB.green,
            blue: borderColorRGB.blue,
          },
          hoverColor: {
            red: hoverColorRGB.red,
            green: hoverColorRGB.green,
            blue: hoverColorRGB.blue,
          },
          shadowColor: {
            red: shadowColorRGB.red,
            green: shadowColorRGB.green,
            blue: shadowColorRGB.blue,
          },
          vertPaddButton: this.state.vertPaddButton,
          vertPaddButton1: this.state.vertPaddButton,
          horzPaddButton: this.state.horzPaddButton,
          horzPaddButton1: this.state.horzPaddButton,
          topMarButton: this.state.topMarButton,
          topMarButton1: this.state.topMarButton,
          bottomMarButton: this.state.bottomMarButton,
          bottomMarButton1: this.state.bottomMarButton,
          leftMarButton: this.state.leftMarButton,
          leftMarButton1: this.state.leftMarButton,
          rightMarButton: this.state.leftMarButton,
          rightMarButton1: this.state.leftMarButton,
          textSize: this.state.textSize,
          textSize1: this.state.textSize,
          textWeight: this.state.textWeight,
          textWeight1: this.state.textWeight,
          borderSize: this.state.borderSize,
          borderSize1: this.state.borderSize,
          borderRadius: this.state.borderRadius,
          borderRadius1: this.state.borderRadius,
          shadowTopBottom: this.state.shadowTopBottom,
          shadowRightLeft: this.state.shadowRightLeft,
          shadowBlur: this.state.shadowBlur,
          shadowSpread: this.state.shadowSpread,
          shadowInset: this.state.shadowInset,
          leftIconPosition: this.state.leftIconPosition,
          rightIconPosition: this.state.rightIconPosition,
          position: this.state.position,
          buttonDisplay: this.state.buttonDisplay,
          buttonALign: this.state.buttonALign,
          buttonWidth: this.state.buttonWidth,
          iconMargin: this.state.iconMargin,
          pointer: this.state.pointer,
        };
        const metafieldData = [
          {
            metafield: {
              namespace: "mirrar",
              key: "button_styles",
              type: "json",
              value: JSON.stringify(all_state),
            },
          },
        ];

        const promises = metafieldData.map(async (data) => {
          const response = await fetch(
            `https://${this.props.store}/admin/api/2024-01/metafields.json`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': this.props.api,
              },
              body: JSON.stringify(data),
            }
          );
          return response.json();
        });

        await Promise.all(promises);
        this.setState({ active: true });
        console.log('Styles saved successfully.');

      } catch (error) {
        console.error("Failed to save metafields:", error);
      } finally {
        this.setState({ loading: false });
      }
    };

    const changeBackground = (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.backgroundColor = `rgb(${hoverColorRGB.red},${hoverColorRGB.green},${hoverColorRGB.blue})`;
    };
    const revertBackground = (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.backgroundColor = `rgb(${buttonBackgroundRGB.red},${buttonBackgroundRGB.green},${buttonBackgroundRGB.blue})`;
    };
    const options = [
      { label: "Modal Popup", value: "modal" },
      { label: "New Tab", value: "new_tab" },
    ];
    const options1 = [
      { label: "Left", value: "left" },
      { label: "Right", value: "right" },
    ];
    const options2 = [
      { label: "Inset", value: "inset" },
      { label: "Outset", value: "" },
    ];
    const { buttonText, loading, active } = this.state;
    const toastMarkup = active ? (
      <Toast
        content="Styles saved successfully."
        onDismiss={this.toggleActive}
      />
    ) : null;
    const { file } = this.state;
    const validImageTypes = ["image/png"];

    const fileUpload = !file && (
      <DropZone.FileUpload actionHint="Accepts .png files only" />
    );
    const uploadedFile = file && (
      <LegacyStack>
        <Thumbnail
          size="large"
          alt={this.state.logoUrl !== "" ? this.state.logoUrl : file.name}
          source={window.URL.createObjectURL(file)}
        />
        <div>{this.state.logoUrl !== "" ? this.state.logoUrl : file.name}</div>
      </LegacyStack>
    );
    return (
      <div style={{ marginTop: "20px" }}>
        <Frame>
          <Layout>
            <Layout.Section>
              <div
                style={{
                  display: "grid",
                  columnGap: "50px",
                  gridTemplateColumns: "50% 50%",
                  width: "100%",
                }}
              >
                <div className="generalSettings">
                  <Text variant="headingMd" as="h6">
                    General Settings
                  </Text>
                  <br />
                  <Checkbox
                    label="TryOn button show on product list"
                    checked={this.state.checked1}
                    onChange={this.handleCheckboxChange}
                  />
                  <br />
                  <Checkbox
                    label="TryOn button show on each product"
                    checked={this.state.checked2}
                    onChange={this.handleCheckboxChange1}
                  />
                  <br />
                  <Text variant="headingMd" as="h6">
                    Custom Button Style
                  </Text>
                  <br />
                  <Select
                    label="Open Tryon in"
                    options={options}
                    onChange={this.handleSelectChange}
                    value={this.state.tryonPlace}
                  />
                  <br />
                  <div style={{ width: "100%", marginBottom: "20px" }}>
                    <DropZone
                      label="Upload Logo"
                      allowMultiple={false}
                      onDrop={this.handleDropZoneDrop}
                    >
                      {uploadedFile}
                      {fileUpload}
                    </DropZone>
                    <br />
                  </div>
                  <TextField
                    label="Tryon button text"
                    value={this.state.buttonText}
                    onChange={this.handleChange}
                  />
                  <br />
                  <div
                    style={{
                      display: "grid",
                      columnGap: "10px",
                      gridTemplateColumns: "80% 20%",
                      width: "100%",
                    }}
                  >
                    <RangeSlider
                      min={0}
                      max={50}
                      label="Text Font Size"
                      value={this.state.textSize}
                      onChange={this.handleTextSize}
                      output
                    />
                    <TextField
                      type="number"
                      value={this.state.textSize1}
                      onChange={this.handleTextSize}
                    />
                  </div>
                  <br />
                  <div
                    style={{
                      display: "grid",
                      columnGap: "10px",
                      gridTemplateColumns: "80% 20%",
                      width: "100%",
                    }}
                  >
                    <RangeSlider
                      min={0}
                      label="Text Font Weight"
                      max={2000}
                      value={this.state.textWeight}
                      onChange={this.handleTextWeight}
                      output
                    />
                    <TextField
                      type="number"
                      value={this.state.textWeight1}
                      onChange={this.handleTextWeight}
                    />
                  </div>
                  <br />
                  <div
                    style={{
                      display: "grid",
                      columnGap: "10px",
                      gridTemplateColumns: "80% 20%",
                      width: "100%",
                    }}
                  >
                    <RangeSlider
                      min={0}
                      label="Border Size"
                      max={20}
                      value={this.state.borderSize}
                      onChange={this.handleBorderSize}
                      output
                    />
                    <TextField
                      type="number"
                      value={this.state.borderSize1}
                      onChange={this.handleBorderSize}
                    />
                  </div>
                  <br />
                  <div
                    style={{
                      display: "grid",
                      columnGap: "10px",
                      gridTemplateColumns: "80% 20%",
                      width: "100%",
                    }}
                  >
                    <RangeSlider
                      min={0}
                      label="Border Radius"
                      max={50}
                      value={this.state.borderRadius}
                      onChange={this.handleBorderRadius}
                      output
                    />
                    <TextField
                      type="number"
                      value={this.state.borderRadius1}
                      onChange={this.handleBorderRadius}
                    />
                  </div>
                  <br />
                  <Button
                    onClick={() => {
                      this.resetTextSizes();
                    }}
                    variant="primary"
                    tone="critical"
                  >
                    Reset Text Sizes
                  </Button>
                  <br />
                  <Text variant="headingMd" as="h6">
                    Button Color Settings
                  </Text>
                  <br />
                  <div
                    style={{
                      display: "grid",
                      columnGap: "10px",
                      gridTemplateColumns: "25% 25% 25% 25%",
                      width: "100%",
                    }}
                  >
                    <div className="primary_color">
                      <Text fontWeight="regular" as="p">
                        Primary Color
                      </Text>
                      <span
                        style={{
                          border: "1px solid black",
                          backgroundColor: `rgb(${buttonBackgroundRGB.red},${buttonBackgroundRGB.green},${buttonBackgroundRGB.blue})`,
                          width: "40px",
                          height: "20px",
                          display: "inline-block",
                        }}
                        onClick={() => {
                          this.state.buttonBackgroundHidden == true
                            ? this.showHidebuttonBackground("show")
                            : this.showHidebuttonBackground("hide");
                        }}
                      ></span>
                      {this.state.buttonBackgroundHidden ? null : (
                        <div
                          className="button_background"
                          style={{ position: "absolute", zIndex: "9999" }}
                        >
                          <ColorPicker
                            onChange={(e) => {
                              this.setState({ buttonBackground: e });
                            }}
                            color={this.state.buttonBackground}
                          />
                          <div
                            style={{
                              display: "grid",
                              columnGap: "10px",
                              gridTemplateColumns: "50% 50%",
                              width: "100%",
                            }}
                          >
                            <Button
                              variant="primary"
                              tone="critical"
                              onClick={() =>
                                this.showHidebuttonBackground("reset")
                              }
                            >
                              Reset
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() =>
                                this.showHidebuttonBackground("hide")
                              }
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="font_color">
                      <Text fontWeight="regular" as="p">
                        Font Color
                      </Text>
                      <span
                        style={{
                          border: "1px solid black",
                          backgroundColor: `rgb(${fontColorRGB.red},${fontColorRGB.green},${fontColorRGB.blue})`,
                          width: "40px",
                          height: "20px",
                          display: "inline-block",
                        }}
                        onClick={() => {
                          this.state.fontColorHidden == true
                            ? this.showHideFontColor("show")
                            : this.showHideFontColor("hide");
                        }}
                      ></span>
                      {this.state.fontColorHidden ? null : (
                        <div
                          className="font_color"
                          style={{ position: "absolute", zIndex: "9999" }}
                        >
                          <ColorPicker
                            onChange={this.handleFontColor}
                            color={this.state.fontColor}
                          />
                          <div
                            style={{
                              display: "grid",
                              columnGap: "10px",
                              gridTemplateColumns: "50% 50%",
                              width: "100%",
                            }}
                          >
                            <Button
                              variant="primary"
                              tone="critical"
                              onClick={() => this.showHideFontColor("reset")}
                            >
                              Reset
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => this.showHideFontColor("hide")}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="border_color">
                      <Text fontWeight="regular" as="p">
                        Border Color
                      </Text>
                      <span
                        style={{
                          border: "1px solid black",
                          backgroundColor: `rgb(${borderColorRGB.red},${borderColorRGB.green},${borderColorRGB.blue})`,
                          width: "40px",
                          height: "20px",
                          display: "inline-block",
                        }}
                        onClick={() => {
                          this.state.borderColorHidden == true
                            ? this.showHideBorderColor("show")
                            : this.showHideBorderColor("hide");
                        }}
                      ></span>
                      {this.state.borderColorHidden ? null : (
                        <div
                          className="font_color"
                          style={{ position: "absolute", zIndex: "9999" }}
                        >
                          <ColorPicker
                            onChange={this.handleBorderColor}
                            color={this.state.borderColor}
                          />
                          <div
                            style={{
                              display: "grid",
                              columnGap: "2px",
                              gridTemplateColumns: "50% 50%",
                              width: "100%",
                            }}
                          >
                            <Button
                              variant="primary"
                              tone="critical"
                              onClick={() => this.showHideBorderColor("reset")}
                            >
                              Reset
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => this.showHideBorderColor("hide")}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="hover_color">
                      <Text fontWeight="regular" as="p">
                        Hover Color
                      </Text>
                      <span
                        style={{
                          border: "1px solid black",
                          backgroundColor: `rgb(${hoverColorRGB.red},${hoverColorRGB.green},${hoverColorRGB.blue})`,
                          width: "40px",
                          height: "20px",
                          display: "inline-block",
                        }}
                        onClick={() => {
                          this.state.hoverColorHidden == true
                            ? this.showHideHoverColor("show")
                            : this.showHideHoverColor("hide");
                        }}
                      ></span>
                      {this.state.hoverColorHidden ? null : (
                        <div
                          className="hover_color"
                          style={{ position: "absolute", zIndex: "9999" }}
                        >
                          <ColorPicker
                            onChange={this.handleHoverColor}
                            color={this.state.hoverColor}
                          />
                          <div
                            style={{
                              display: "grid",
                              columnGap: "2px",
                              gridTemplateColumns: "50% 50%",
                              width: "100%",
                            }}
                          >
                            <Button
                              variant="primary"
                              tone="critical"
                              onClick={() => this.showHideHoverColor("reset")}
                            >
                              Reset
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => this.showHideHoverColor("hide")}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <br />
                  <Button
                    onClick={() => {
                      this.resetColors();
                    }}
                    variant="primary"
                    tone="critical"
                  >
                    Reset Colors
                  </Button>
                  <br />
                  <Text variant="headingMd" as="h6">
                    Button Position Settings
                  </Text>
                  <br />
                  <Select
                    label="Button Icon Position"
                    options={options1}
                    onChange={this.handleSelectChange1}
                    value={this.state.position}
                  />
                  <br />
                  <div
                    style={{
                      display: "grid",
                      columnGap: "10px",
                      gridTemplateColumns: "80% 20%",
                      width: "100%",
                    }}
                  >
                    <RangeSlider
                      min={0}
                      max={100}
                      label="Button Vertical Padding"
                      value={this.state.vertPaddButton}
                      onChange={this.handleVertPaddButton}
                      output
                    />
                    <TextField
                      type="number"
                      value={this.state.vertPaddButton1}
                      onChange={this.handleVertPaddButton}
                    />
                  </div>
                  <br />
                  <div
                    style={{
                      display: "grid",
                      columnGap: "10px",
                      gridTemplateColumns: "80% 20%",
                      width: "100%",
                    }}
                  >
                    <RangeSlider
                      min={0}
                      max={100}
                      label="Button Horizontal Padding"
                      value={this.state.horzPaddButton}
                      onChange={this.handleHorizPaddButton}
                      output
                    />
                    <TextField
                      type="number"
                      value={this.state.horzPaddButton}
                      onChange={this.handleHorizPaddButton}
                    />
                  </div>
                  <br />
                  <div
                    style={{
                      display: "grid",
                      columnGap: "10px",
                      gridTemplateColumns: "80% 20%",
                      width: "100%",
                    }}
                  >
                    <RangeSlider
                      min={0}
                      max={100}
                      label="Button Margin Top"
                      value={this.state.topMarButton}
                      onChange={this.handleMarginTopButton}
                      output
                    />
                    <TextField
                      type="number"
                      value={this.state.topMarButton1}
                      onChange={this.handleMarginTopButton}
                    />
                  </div>
                  <br />
                  <div
                    style={{
                      display: "grid",
                      columnGap: "10px",
                      gridTemplateColumns: "80% 20%",
                      width: "100%",
                    }}
                  >
                    <RangeSlider
                      min={0}
                      max={100}
                      label="Button Margin Bottom"
                      value={this.state.bottomMarButton}
                      onChange={this.handleMarginBottomButton}
                      output
                    />
                    <TextField
                      type="number"
                      value={this.state.bottomMarButton1}
                      onChange={this.handleMarginBottomButton}
                    />
                  </div>
                  <br />
                  <div
                    style={{
                      display: "grid",
                      columnGap: "10px",
                      gridTemplateColumns: "80% 20%",
                      width: "100%",
                    }}
                  >
                    <RangeSlider
                      min={0}
                      max={100}
                      label="Button Margin Left"
                      value={this.state.leftMarButton}
                      onChange={this.handleMarginLeftButton}
                      output
                    />
                    <TextField
                      type="number"
                      value={this.state.leftMarButton1}
                      onChange={this.handleMarginLeftButton}
                    />
                  </div>
                  <br />
                  <div
                    style={{
                      display: "grid",
                      columnGap: "10px",
                      gridTemplateColumns: "80% 20%",
                      width: "100%",
                    }}
                  >
                    <RangeSlider
                      min={0}
                      max={100}
                      label="Button Margin Right"
                      value={this.state.rightMarButton}
                      onChange={this.handleMarginRightButton}
                      output
                    />
                    <TextField
                      type="number"
                      value={this.state.rightMarButton}
                      onChange={this.handleMarginRightButton}
                    />
                  </div>
                  <br />
                  <div>
                    <div
                      className="number_details"
                      style={{
                        display: "grid",
                        columnGap: "10px",
                        gridTemplateColumns: "20% 20% 20% 20% 20%",
                        width: "100%",
                      }}
                    >
                      <div style={{ paddingTop: "30px" }}>
                        <Text fontWeight="regular" as="p">
                          Button Shadow
                        </Text>
                      </div>
                      <TextField
                        label="Left/Right"
                        type="number"
                        value={this.state.shadowRightLeft}
                        onChange={this.handleShadowRightLeft}
                      />
                      <TextField
                        label="Top/Bottom"
                        type="number"
                        value={this.state.shadowTopBottom}
                        onChange={this.handleShadowTopBottom}
                      />
                      <TextField
                        label="Blur"
                        type="number"
                        value={this.state.shadowBlur}
                        onChange={this.handleShadowBlur}
                      />
                      <TextField
                        label="Spread"
                        type="number"
                        value={this.state.shadowSpread}
                        onChange={this.handleShadowSpread}
                      />
                    </div>
                    <div
                      style={{
                        display: "grid",
                        columnGap: "10px",
                        gridTemplateColumns: "20% 40% 40%",
                        width: "100%",
                      }}
                    >
                      <div></div>
                      <div className="Shadow_color">
                        <Text fontWeight="regular" as="p">
                          Shadow Color
                        </Text>
                        <span
                          style={{
                            border: "1px solid black",
                            backgroundColor: `rgb(${shadowColorRGB.red},${shadowColorRGB.green},${shadowColorRGB.blue})`,
                            width: "40px",
                            height: "20px",
                            display: "inline-block",
                          }}
                          onClick={() => {
                            this.state.shadowColorHidden == true
                              ? this.showHideShadowColor("show")
                              : this.showHideShadowColor("hide");
                          }}
                        ></span>
                        {this.state.shadowColorHidden ? null : (
                          <div
                            className="shadow_color"
                            style={{ position: "absolute", zIndex: "9999" }}
                          >
                            <ColorPicker
                              onChange={this.handleShadowColor}
                              color={this.state.shadowColor}
                            />
                            <div
                              style={{
                                display: "grid",
                                columnGap: "2px",
                                gridTemplateColumns: "50% 50%",
                                width: "100%",
                              }}
                            >
                              <Button
                                variant="primary"
                                tone="critical"
                                onClick={() =>
                                  this.showHideShadowColor("reset")
                                }
                              >
                                Reset
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() => this.showHideShadowColor("hide")}
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                      <Select
                        label="Shadow Type"
                        options={options2}
                        onChange={this.handleSelectChange2}
                        value={this.state.shadowInset}
                      />
                    </div>
                    <Button
                      onClick={() => {
                        this.resetPosition();
                      }}
                      variant="primary"
                      tone="critical"
                    >
                      Reset Position
                    </Button>
                  </div>
                </div>
                <div
                  className="demoButton"
                  style={{
                    width: "fit-content",
                    position: "fixed",
                    top: "25%",
                    left: "60%",
                  }}
                >
                  <div
                    style={{
                      border: "10px solid #CDCCCC",
                      width: "fit-content",
                      boxSizing: "border-box",
                    }}
                  >
                    <button
                      onMouseEnter={changeBackground}
                      onMouseLeave={revertBackground}
                      style={{
                        cursor: this.state.pointer,
                        whiteSpace: "nowrap",
                        display: this.state.buttonDisplay,
                        alignItems: this.state.buttonALign,
                        boxShadow: `${this.state.shadowInset} ${this.state.shadowRightLeft}px ${this.state.shadowTopBottom}px ${this.state.shadowBlur}px ${this.state.shadowSpread}px rgb(${shadowColorRGB.red},${shadowColorRGB.green},${shadowColorRGB.blue})`,
                        backgroundColor: `rgb(${buttonBackgroundRGB.red},${buttonBackgroundRGB.green},${buttonBackgroundRGB.blue})`,
                        color: `rgb(${fontColorRGB.red},${fontColorRGB.green},${fontColorRGB.blue})`,
                        borderRadius: `${this.state.borderRadius}px`,
                        border: `${this.state.borderSize}px solid rgb(${borderColorRGB.red},${borderColorRGB.green},${borderColorRGB.blue})`,
                        fontWeight: this.state.textWeight,
                        fontSize: `${this.state.textSize}px`,
                        paddingTop: `${this.state.vertPaddButton}px`,
                        paddingBottom: `${this.state.vertPaddButton}px`,
                        paddingLeft: `${this.state.horzPaddButton}px`,
                        paddingRight: `${this.state.horzPaddButton}px`,
                        marginTop: `${this.state.topMarButton}px`,
                        marginRight: `${this.state.rightMarButton}px`,
                        marginLeft: `${this.state.leftMarButton}px`,
                        marginBottom: `${this.state.bottomMarButton}px`,
                      }}
                    >
                      {this.state.leftIconPosition === "inline-block" && (
                        <span
                          style={{
                            margin: `${this.state.iconMargin}px`,
                            width: `${this.state.textSize}px`,
                            height: `${this.state.textSize}px`,
                            display: this.state.leftIconPosition,
                          }}
                        >
                          <img
                            width={`${this.state.textSize}px`}
                            height={`${this.state.textSize}px`}
                            src="https://tryondemo.mirrar.in/XR/assets/images/tryon_icon.png"
                          />
                        </span>
                      )}
                      {this.state.buttonText}
                      {this.state.rightIconPosition === "inline-block" && (
                        <span
                          style={{
                            margin: `${this.state.iconMargin}px`,
                            width: `${this.state.textSize}px`,
                            height: `${this.state.textSize}px`,
                            display: this.state.rightIconPosition,
                          }}
                        >
                          <img
                            width={`${this.state.textSize}px`}
                            height={`${this.state.textSize}px`}
                            src="https://tryondemo.mirrar.in/XR/assets/images/tryon_icon.png"
                          />
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Layout.Section>
          </Layout><br />
          <Button variant='primary' onClick={saveData}>{loading ? 'Loading..' : 'Save Changes'}</Button>
          {toastMarkup}
        </Frame>
      </div>
    );
  }
}

export default MirrarButton;
