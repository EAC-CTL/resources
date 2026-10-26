/* EAC Fix Your Content Day — all timestamps use Arizona's fixed UTC−07:00 offset. */
(function () {
  "use strict";

  // Midnight at the START of November 10 in Arizona is 07:00 UTC.
  // An explicit offset keeps the deadline identical in every visitor's time zone.
  var TARGET = Date.parse("2026-11-10T00:00:00-07:00");
  var EVENT_END = Date.parse("2026-11-11T00:00:00-07:00");

  function getState(now) {
    if (now === undefined) now = Date.now();
    if (!Number.isFinite(now)) throw new TypeError("A valid timestamp is required.");

    // Ceil avoids displaying all zeroes during the final fraction of a second.
    var seconds = Math.max(0, Math.ceil((TARGET - now) / 1000));
    return {
      phase: now < TARGET ? "countdown" : now < EVENT_END ? "event" : "complete",
      totalSeconds: seconds,
      days: Math.floor(seconds / 86400),
      hours: Math.floor((seconds % 86400) / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60
    };
  }

  // A small pure API also allows the exact time boundaries to be verified offline.
  globalThis.EACCountdown = Object.freeze({
    target: TARGET,
    eventEnd: EVENT_END,
    getState: getState
  });

  if (typeof document === "undefined") return;

  function initialize() {
    var timer = document.getElementById("countdown");
    var heading = document.getElementById("countdown-heading");
    var status = document.getElementById("event-status");
    var units = ["days", "hours", "minutes", "seconds"];
    var fields = units.map(function (unit) { return document.getElementById(unit); });
    if (!timer || fields.some(function (field) { return !field; })) return;

    var timeout;
    var previousPhase;
    var previousAccessibleMinute;

    function describe(state) {
      if (state.phase === "event") {
        return "It’s Game Day! Fix Your Content Day is today, November 10, 2026, in Arizona.";
      }
      if (state.phase === "complete") {
        return "Fix Your Content Day, November 10, 2026, has ended. Thanks for taking part!";
      }
      return units.map(function (unit) {
        var value = state[unit];
        return value + " " + (value === 1 ? unit.slice(0, -1) : unit);
      }).join(", ") + " remaining until November 10, 2026, at midnight Arizona time (UTC minus 7).";
    }

    function render(force) {
      var now = Date.now();
      var state = getState(now);
      fields.forEach(function (field, index) {
        var value = String(state[units[index]]).padStart(2, "0");
        if (field.textContent !== value) field.textContent = value;
      });

      // role=timer stays quiet. Its accessible snapshot refreshes once per minute,
      // while the separate polite status announces only an event-phase change.
      var minute = Math.floor(now / 60000);
      if (force || minute !== previousAccessibleMinute || state.phase !== previousPhase) {
        timer.setAttribute("aria-label", describe(state));
        previousAccessibleMinute = minute;
      }

      if (state.phase !== previousPhase) {
        if (heading) {
          heading.textContent = state.phase === "countdown" ? "Countdown to Game Day" :
            state.phase === "event" ? "It’s Game Day!" : "Thanks for taking part!";
        }
        if (status && state.phase !== "countdown") status.textContent = describe(state);
        previousPhase = state.phase;
      }
    }

    function schedule() {
      clearTimeout(timeout);
      if (document.hidden) return;
      // Recompute from the wall clock instead of subtracting a second per tick.
      // Aligning the next tick also catches up after browser throttling or sleep.
      timeout = setTimeout(function () {
        render(false);
        schedule();
      }, 1000 - (Date.now() % 1000) + 10);
    }

    function refresh() {
      render(true);
      schedule();
    }

    document.addEventListener("visibilitychange", refresh);
    globalThis.addEventListener("pageshow", refresh);
    refresh();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
}());
