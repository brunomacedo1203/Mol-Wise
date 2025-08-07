declare global {
  interface Window {
    $3Dmol: {
      createViewer: (
        element: HTMLElement,
        config?: { backgroundColor?: string }
      ) => {
        addModel: (data: string, format: string) => void;
        setStyle: (sel: object, style: object) => void;
        zoomTo: () => void;
        render: () => void;
      };
    };
  }
}

export {}; 