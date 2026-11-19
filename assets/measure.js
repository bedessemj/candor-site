/* Visitor measurement for candor.works (Google Analytics). This file runs before Google's tag loads.
   The notice visitors can read is at /privacy/. */
var GA_ID = 'G-F25RZE6HX8';   /* the Analytics ID inside Google's tag GTM-N2B2TFKS, which index.html loads */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

/* Any browser can be taken out of the count: open /?notrack=1 in it once (the privacy page links to it, and the
   team uses it for its own browsers). /?notrack=0 puts it back. The choice is kept in that browser only. */
(function(){
  var KEY = 'cw_notrack', q = location.search, off = false, saved = true;
  try{
    if(/[?&]notrack=1(&|$)/.test(q)) localStorage.setItem(KEY, '1');
    if(/[?&]notrack=0(&|$)/.test(q)) localStorage.removeItem(KEY);
    off = localStorage.getItem(KEY) === '1';
  }catch(e){ saved = false; }
  if(off) window['ga-disable-' + GA_ID] = true;
  if(/[?&]notrack=[01](&|$)/.test(q)) document.addEventListener('DOMContentLoaded', function(){
    var note = document.createElement('div');
    note.className = 'teamnote';
    note.setAttribute('role', 'status');
    note.textContent = !saved ? 'This browser would not save the setting, so its visits are still counted.'
      : off ? 'Visits from this browser are no longer counted in our analytics.'
      : 'Visits from this browser are counted in our analytics again.';
    document.body.appendChild(note);
  });
})();

/* Nobody's visit is used for advertising. Visitors in the European Economic Area, the United Kingdom and Switzerland
   get no analytics cookies. */
gtag('consent', 'default', {ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted'});
gtag('consent', 'default', {analytics_storage: 'denied', region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH']});
gtag('js', new Date());

/* A click on an e-mail link is counted. Only which link it was is sent (its id and class), never an address. */
document.addEventListener('click', function(e){
  var a = e.target && e.target.closest ? e.target.closest('a[href^="mailto:"]') : null;
  if(a) gtag('event', 'contact_click', {link_id: a.id, link_classes: a.className});
});
