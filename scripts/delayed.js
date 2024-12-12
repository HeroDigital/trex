// add delayed functionality here
// add delayed functionality here
function loadJS(FILE_URL, async = true, dataDomainScript ) {
    let scriptEle = document.createElement("script");
  
    scriptEle.setAttribute("src", FILE_URL);
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.setAttribute("async", async);
    if(dataDomainScript){
        scriptEle.setAttribute("data-domain-script", dataDomainScript);
    }

  
    document.head.appendChild(scriptEle);
  
    // success event 
    scriptEle.addEventListener("load", () => {
      console.log("File loaded")
    });
     // error event
    scriptEle.addEventListener("error", (ev) => {
      console.log("Error on loading file", ev);
    });
  }

  loadJS("//assets.adobedtm.com/fd226c07fac6/b9f53f4b2a37/launch-a6414ec616ce.min.js", true); 
  loadJS("https://cdn.cookielaw.org/scripttemplates/otSDKStub.js", true, "0191c81d-4def-7513-9084-1b96cc16be8d");
  console.log('GTM Code has started from head.html delayed');
    // SEER ANALYTICS GTM SCRIPT (HEAD SCRIPT)
    (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                    'gtm.start': new Date().getTime(),
                    event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + 'GTM\u002D5FSHKK' + dl;
            f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer');
    loadJS("https://apps.bazaarvoice.com/deployments/trex/main_site/production/en_US/bv.js", false); 
