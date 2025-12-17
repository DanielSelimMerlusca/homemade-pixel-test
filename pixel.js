(function() {

  // Create visitor ID
  function getVisitorId() {
    const existing = localStorage.getItem("homemade_visitor_id");
    if (existing) return existing;

    const newId = "hm_" + Math.random().toString(36).substring(2,10);
    localStorage.setItem("homemade_visitor_id", newId);
    return newId;
  }

  const visitorId = getVisitorId();

  // Send to webhook (temporary)
  function sendEvent() {
    fetch("https://webhook.site/4ce292bc-3284-422a-aefd-76c2be65824b", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type: "page_view",
        visitor_id: visitorId,
        timestamp: Date.now(),
        url: window.location.href,
        referrer: document.referrer
      })
    });
  }

  // Track page view immediately
  sendEvent();

})();
