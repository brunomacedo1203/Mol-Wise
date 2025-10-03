// Configurações de zoom
export const ZOOM_FACTOR = 1.1;
export const ZOOM_FACTOR_WHEEL = 1.05;
export const MIN_ZOOM = 0.1;
export const MAX_ZOOM = 10;

// Configurações de pan
export const PAN_FACTOR = 0.5;
export const PAN_FACTOR_WHEEL = 0.3;
export const PAN_FACTOR_TOUCH = 0.8;

// Configurações de drag
export const DRAG_THRESHOLD = 5; // pixels mínimos para considerar como drag
export const DRAG_SENSITIVITY = 1.2;

// Timeouts e delays
export const CONTENT_BOUNDS_DELAY = 50; // ms para aguardar renderização completa do SVG
export const TOUCH_TIMEOUT = 300; // ms para detectar toque duplo
export const DEBOUNCE_DELAY = 16; // ms para debounce de eventos (60fps)

// Dimensões mínimas e padrão do canvas
export const MIN_CANVAS_WIDTH = 320;
export const MIN_CANVAS_HEIGHT = 240;
export const DEFAULT_CANVAS_WIDTH = 400;
export const DEFAULT_CANVAS_HEIGHT = 300;

// Configurações do SVG
export const SVG_MARGIN = 6;
export const SVG_STYLE = "width:100%;height:100%;display:block;cursor:grab;touch-action:none;";

// Configurações de reset
export const RESET_ANIMATION_DURATION = 200; // ms
export const RESET_SCALE_FACTOR = 0.95; // fator para dar uma margem no reset

// Configurações de touch
export const TOUCH_SCALE_SENSITIVITY = 0.01;
export const TOUCH_MIN_DISTANCE = 10; // distância mínima entre dedos para pinch
export const TOUCH_MAX_DISTANCE = 500; // distância máxima entre dedos para pinch

// Configurações de wheel
export const WHEEL_DELTA_THRESHOLD = 100; // threshold para considerar wheel como zoom vs pan
export const WHEEL_ZOOM_SENSITIVITY = 0.001;
export const WHEEL_PAN_SENSITIVITY = 0.5;