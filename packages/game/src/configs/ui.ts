export type UIAsset = {
  key: string;
  url: string;
};

export const UI_ASSETS = {
  panel: {
    key: "ui-panel",
    url: "/assets/ui/panel_beige.png",
  },
  buttonNormal: {
    key: "ui-button-normal",
    url: "/assets/ui/buttonLong_beige.png",
  },
  buttonPressed: {
    key: "ui-button-pressed",
    url: "/assets/ui/buttonLong_beige_pressed.png",
  },
  iconCross: {
    key: "ui-icon-cross",
    url: "/assets/ui/iconCross_beige.png",
  },
} as const;
