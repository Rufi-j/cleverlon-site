/* Umami Cloud analytics (cookieless, EU region, no banner needed).
   The website ID below switches it on. While WEBSITE_ID is empty nothing loads and no request is made.
   data-domains keeps previews, localhost and any other host out of the stats. */
(function () {
  var WEBSITE_ID = "6a7c9783-620d-4546-8bb8-896a3df3a5eb";
  var DOMAINS = "cleverlon.com";
  if (!WEBSITE_ID) return;

  var s = document.createElement("script");
  s.defer = true;
  s.src = "https://cloud.umami.is/script.js";
  s.setAttribute("data-website-id", WEBSITE_ID);
  s.setAttribute("data-domains", DOMAINS);
  document.head.appendChild(s);

  /* Events. Pages call cleverlonTrack("Name", { optional: "data" }); it does nothing until Umami has loaded.
     Tracked: Book a call clicks, audit link clicks (here), form submits and game plays (in each page). */
  window.cleverlonTrack = function (name, data) {
    try { if (window.umami && window.umami.track) window.umami.track(name, data); } catch (e) {}
  };
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var h = a.getAttribute("href") || "";
    if (h.indexOf("calendly.com") > -1) window.cleverlonTrack("Book a call", { page: location.pathname });
    else if (/^\/audit(\/|\?|#|$)/.test(h)) window.cleverlonTrack("Audit link click", { page: location.pathname });
  });
})();
