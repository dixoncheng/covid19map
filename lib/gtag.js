export const GA_TRACKING_ID = process.env.GA;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (action, category, label, value) => {
  const obj = {};

  if (category) {
    obj.event_category = category;
  }
  if (label) {
    obj.event_label = label;
  }
  if (value) {
    obj.value = value;
  }
  window.gtag("event", action, obj);
};
