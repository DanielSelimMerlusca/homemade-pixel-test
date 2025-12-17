(function() {

  
  function getVisitorId() {
    const existing = localStorage.getItem("homemade_visitor_id");
    if (existing) return existing;

    const newId = "hm_" + Math.random().toString(36).substring(2,10);
    localStorage.setItem("homemade_visitor_id", newId);
    return newId;
  }

  const visitorId = getVisitorId();

  
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

  
  sendEvent();
  
  
  document.addEventListener("click", function(e) {
    var link = e.target.closest("a");
    if (!link) return;

    if (link.href && link.href.includes("spotify")) {
      fetch("https://webhook.site/YOUR_UUID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "spotify_click",
          visitor_id: visitorId,
          timestamp: Date.now(),
          url: window.location.href,
          target: link.href
        })
      });
    }
  });
})();
