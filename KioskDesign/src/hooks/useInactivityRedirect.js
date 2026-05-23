import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const inactivityState = {
  timerId: null,
  listenersAdded: false,
  timeoutMs: 120000,
  onTimeout: () => {},
  reset() {
    window.clearTimeout(this.timerId);
    this.timerId = window.setTimeout(() => {
      this.onTimeout();
    }, this.timeoutMs);
  },
  clear() {
    window.clearTimeout(this.timerId);
    this.timerId = null;
  },
};

const events = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "scroll",
];

const handleActivity = () => {
  inactivityState.reset();
};

const addListeners = () => {
  if (inactivityState.listenersAdded) return;
  events.forEach((event) =>
    window.addEventListener(event, handleActivity)
  );
  inactivityState.listenersAdded = true;
};

const removeListeners = () => {
  if (!inactivityState.listenersAdded) return;
  events.forEach((event) =>
    window.removeEventListener(event, handleActivity)
  );
  inactivityState.listenersAdded = false;
};

let mountCount = 0;
/* =========================
 REDIRECCIONAR POR INACTIVIDAD
========================= */
export function useInactivityRedirect(path = "/", timeoutMs = 120000) {
  const navigate = useNavigate();

  useEffect(() => {
    mountCount += 1;
    inactivityState.timeoutMs = timeoutMs;
    inactivityState.onTimeout = () => {
      navigate(path);
    };

    addListeners();
    inactivityState.reset();

    return () => {
      mountCount -= 1;
      if (mountCount <= 0) {
        removeListeners();
        inactivityState.clear();
      }
    };
  }, [navigate, path, timeoutMs]);
}
