(function () {

  // 1. Visitor ID (persistent per browser)
  function getVisitorId() {
    const existing = localStorage.getItem("homemade_visitor_id");
    if (existing) return existing;

    const newId = "hm_" + Math.random().toString(36).substring(2, 10);
    localStorage.setItem("homemade_visitor_id", newId);
    return newId;
  }

  const visitorId = getVisitorId();

  // 2. Fire-and-forget sender (NO CORS issues)
  function send(payload) {
    navigator.sendBeacon(
      "https://webhook.site/YOUR_UUID_HERE",
      JSON.stringify(payload)
    );
  }

  // 3. PAGE VIEW EVENT
  send({
    event_type: "page_view",
    visitor_id: visitorId,
    timestamp: Date.now(),
    url: window.location.href,
    path: window.location.pathname + window.location.search,
    referrer: document.referrer
  });

  // 4. SPOTIFY CLICK EVENT
  document.addEventListener("click", function (e) {
    var link = e.target.closest("a");
    if (!link) return;

    if (link.href && link.href.includes("spotify")) {
      send({
        event_type: "spotify_click",
        visitor_id: visitorId,
        timestamp: Date.now(),
        url: window.location.href,
        path: window.location.pathname + window.location.search,
        target: link.href
      });
    }
  });

})();
