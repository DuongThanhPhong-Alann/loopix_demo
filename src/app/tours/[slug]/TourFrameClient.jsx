'use client';

import { useEffect, useRef } from 'react';

const TOUR_BLUE = '#112D60';
const TOUR_ACTIVE = '#b6c0c5';
const TOUR_ACTIVE_TEXT = '#111827';

export default function TourFrameClient({ src, title }) {
  const frameRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    const cleanupCss = `
      :root,
      body {
        --color-primary: ${TOUR_BLUE} !important;
        --color-theme: ${TOUR_BLUE} !important;
        --color-text: #ffffff !important;
        --ant-primary-color: ${TOUR_BLUE} !important;
      }

      [class*="HeaderWrapper"],
      [class*="ControlbarWrapper"] .--toggler,
      [class*="ControlbarWrapper"] .controlBar .--item,
      [class*="CallToActionsWrapper"] .--toggler {
        background: ${TOUR_BLUE} !important;
        background-color: ${TOUR_BLUE} !important;
        border-color: rgba(255,255,255,0.36) !important;
        color: #ffffff !important;
      }

      [class*="ListSceneWrapper"] {
        background: transparent !important;
      }

      [class*="ListSceneWrapper"] > *,
      [class*="ListSceneWrapper"] .--mainPanel {
        background: ${TOUR_BLUE} !important;
        background-color: ${TOUR_BLUE} !important;
        color: #ffffff !important;
      }

      [class*="ListSceneWrapper"] .--panel,
      [class*="ListSceneWrapper"] .sceneList,
      [class*="ListSceneWrapper"] .sceneMenu,
      [class*="ListSceneWrapper"] .--listing {
        background: transparent !important;
        background-color: transparent !important;
      }

      [class*="ListSceneWrapper"] .itemScene,
      [class*="ListSceneWrapper"] .itemMenuLink,
      [class*="ListSceneWrapper"] .itemSceneCate {
        background-color: rgba(0,0,0,0.18) !important;
      }

      [class*="ListSceneWrapper"] .itemScene.active,
      [class*="ListSceneWrapper"] .itemMenuLink.active,
      [class*="ListSceneWrapper"] .itemSceneCate.active,
      [class*="ListSceneWrapper"] [class*="itemScene"].active,
      [class*="ListSceneWrapper"] [class*="itemMenu"].active,
      [class*="ListSceneWrapper"] [aria-selected="true"],
      [class*="ListSceneWrapper"] .active:not(.sceneMenu):not(.--listing):not(.--mainPanel):not([class*="Wrapper"]),
      .popoverSceneList .dropdownList button.active,
      .popoverSceneList .dropdownList button[aria-selected="true"],
      [class*="HeaderWrapper"] .active:not([class*="Wrapper"]),
      [class*="HeaderWrapper"] [aria-selected="true"],
      [class*="HeaderWrapper"] [style*="background: rgb(255, 255, 255)"],
      [class*="HeaderWrapper"] [style*="background-color: rgb(255, 255, 255)"],
      body [aria-current="true"],
      body [aria-selected="true"],
      body [style*="background: rgb(255, 255, 255)"],
      body [style*="background-color: rgb(255, 255, 255)"],
      body [style*="background: #fff"],
      body [style*="background-color: #fff"],
      body [style*="background: white"],
      body [style*="background-color: white"] {
        background: ${TOUR_ACTIVE} !important;
        background-color: ${TOUR_ACTIVE} !important;
        border-color: rgba(17,45,96,0.26) !important;
        color: ${TOUR_ACTIVE_TEXT} !important;
        font-weight: 800 !important;
      }

      [class*="ListSceneWrapper"] .itemScene.active *,
      [class*="ListSceneWrapper"] .itemMenuLink.active *,
      [class*="ListSceneWrapper"] .itemSceneCate.active *,
      [class*="ListSceneWrapper"] [class*="itemScene"].active *,
      [class*="ListSceneWrapper"] [class*="itemMenu"].active *,
      [class*="ListSceneWrapper"] [aria-selected="true"] *,
      .popoverSceneList .dropdownList button.active *,
      .popoverSceneList .dropdownList button[aria-selected="true"] *,
      [class*="HeaderWrapper"] .active:not([class*="Wrapper"]) *,
      [class*="HeaderWrapper"] [aria-selected="true"] *,
      [class*="HeaderWrapper"] [style*="background: rgb(255, 255, 255)"] *,
      [class*="HeaderWrapper"] [style*="background-color: rgb(255, 255, 255)"] *,
      body [aria-current="true"] *,
      body [aria-selected="true"] *,
      body [style*="background: rgb(255, 255, 255)"] *,
      body [style*="background-color: rgb(255, 255, 255)"] *,
      body [style*="background: #fff"] *,
      body [style*="background-color: #fff"] *,
      body [style*="background: white"] *,
      body [style*="background-color: white"] * {
        color: ${TOUR_ACTIVE_TEXT} !important;
        fill: ${TOUR_ACTIVE_TEXT} !important;
        stroke: ${TOUR_ACTIVE_TEXT} !important;
        font-weight: 800 !important;
      }

      [class*="ListSceneWrapper"] *::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
      }

      [class*="ListSceneWrapper"] * {
        scrollbar-width: none !important;
      }

      [class*="CopyrightWrapper"],
      .copyright,
      [class*="copyright"],
      a[href*="panoee"],
      a[href*="VTC"],
      a[href*="vtc"] {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
        visibility: hidden !important;
      }

      [class*="HeaderWrapper"] *,
      [class*="ListSceneWrapper"] *,
      [class*="ControlbarWrapper"] *,
      [class*="CallToActionsWrapper"] * {
        color: #ffffff !important;
        fill: #ffffff !important;
        stroke: #ffffff !important;
      }

      .popoverSceneList .dropdownList button.active *,
      .popoverSceneList .dropdownList button[aria-selected="true"] *,
      [class*="HeaderWrapper"] .active:not([class*="Wrapper"]) *,
      [class*="HeaderWrapper"] [aria-selected="true"] * {
        color: ${TOUR_ACTIVE_TEXT} !important;
        fill: ${TOUR_ACTIVE_TEXT} !important;
        stroke: ${TOUR_ACTIVE_TEXT} !important;
      }

      .ant-btn-primary,
      .ant-switch-checked,
      .ant-slider-track,
      .ant-slider-handle {
        background: ${TOUR_BLUE} !important;
        border-color: ${TOUR_BLUE} !important;
      }

      #__next,
      [class*="TourWrapper"],
      [id^="krpano"] {
        height: 100% !important;
        max-height: 100% !important;
      }
    `;

    const applyCleanup = () => {
      const doc = frame.contentDocument;
      if (!doc?.head) return;

      let style = doc.getElementById('loopix-full-tour-theme');
      if (!style) {
        style = doc.createElement('style');
        style.id = 'loopix-full-tour-theme';
        doc.head.appendChild(style);
      }
      style.textContent = cleanupCss;
    };

    const onLoad = () => {
      frame.closest('.tour-detail-frame')?.classList.add('is-loaded');
      applyCleanup();
      window.setTimeout(applyCleanup, 600);
      window.setTimeout(applyCleanup, 1800);
      window.setTimeout(applyCleanup, 3200);
    };

    frame.addEventListener('load', onLoad);
    applyCleanup();

    return () => {
      frame.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <iframe
      ref={frameRef}
      className="tour-detail-iframe"
      title={`${title} virtual tour`}
      src={src}
      allow="autoplay; accelerometer; fullscreen; gyroscope; xr-spatial-tracking"
      allowFullScreen
    />
  );
}
