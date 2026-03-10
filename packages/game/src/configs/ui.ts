export type UIAsset = {
  key: string;
  url: string;
};

export const UI_ASSETS = {
  panel: {
    key: "ui-panel",
    url: "/assets/ui/PNG/panel_beige.png",
  },
  buttonNormal: {
    key: "ui-button-normal",
    url: "/assets/ui/PNG/buttonLong_beige.png",
  },
  buttonPressed: {
    key: "ui-button-pressed",
    url: "/assets/ui/PNG/buttonLong_beige_pressed.png",
  },
  iconCross: {
    key: "ui-icon-cross",
    url: "/assets/ui/PNG/iconCross_beige.png",
  },
} as const;
