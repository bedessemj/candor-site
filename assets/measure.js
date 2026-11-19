/* candor.works analytics. Notice: /privacy/ */
var GA_ID = 'G-F25RZE6HX8';       /* Google Analytics, inside tag GTM-N2B2TFKS (index.html) */
var LF_ID = 'JMvZ8gv5yOpa2pOd';   /* Leadfeeder */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

/* opt-out: /?notrack=1 sets a flag in this browser, /?notrack=0 clears it */
var OPTED_OUT = (function(){
  var KEY = 'cw_notrack', q = location.search, off = false, saved = true;
  try{
    if(/[?&]notrack=1(&|$)/.test(q)) localStorage.setItem(KEY, '1');
    if(/[?&]notrack=0(&|$)/.test(q)) localStorage.removeItem(KEY);
    off = localStorage.getItem(KEY) === '1';
  }catch(e){ saved = false; }
  if(/[?&]notrack=[01](&|$)/.test(q)) document.addEventListener('DOMContentLoaded', function(){
    var note = document.createElement('div');
    note.className = 'teamnote';
    note.setAttribute('role', 'status');
    note.textContent = !saved ? 'This browser would not save the setting, so its visits are still counted.'
      : off ? 'Visits from this browser are no longer counted in our analytics.'
      : 'Visits from this browser are counted in our analytics again.';
    document.body.appendChild(note);
  });
  return off;
})();

/* Google Analytics: no ad use; no cookies for EEA, UK and Swiss visitors */
if(OPTED_OUT) window['ga-disable-' + GA_ID] = true;
gtag('consent', 'default', {ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted'});
gtag('consent', 'default', {analytics_storage: 'denied', region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH']});
gtag('js', new Date());

/* e-mail link clicks: link id and class only */
document.addEventListener('click', function(e){
  var a = e.target && e.target.closest ? e.target.closest('a[href^="mailto:"]') : null;
  if(a) gtag('event', 'contact_click', {link_id: a.id, link_classes: a.className});
});

/* Leadfeeder: skipped when opted out or on a European time zone (it sets a cookie) */
(function(){
  var zone = '';
  try{ zone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; }catch(e){}
  var european = /^(Europe\/|Atlantic\/(Reykjavik|Canary|Madeira|Azores|Faroe)|Arctic\/Longyearbyen|Africa\/Ceuta|Asia\/(Nicosia|Famagusta)|America\/(Cayenne|Martinique|Guadeloupe)|Indian\/(Reunion|Mayotte))/.test(zone);
  if(OPTED_OUT || european) return;
  window.ldfdr = window.ldfdr || function(){ (ldfdr._q = ldfdr._q || []).push([].slice.call(arguments)); };
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://sc.lfeeder.com/lftracker_v1_' + LF_ID + '.js';
  document.head.appendChild(s);
})();
