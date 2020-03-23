import Head from "next/head";
import dynamic from "next/dynamic";
import { useState } from "react";
import styled, { css } from "styled-components";
import fetch from "node-fetch";
import cheerio from "cheerio";
import locations from "../constants/locations";

const URL =
  "https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases";

const Map = dynamic(() => import("../components/map"), {
  ssr: false
});

const Home = ({ data, lastUpdated, totalCases }) => {
  const center = { lat: -41.0495881, lng: 173.2682669 };
  const zoom = 6;

  const [view, setView] = useState("");
  const [location, setLocation] = useState();
  const [termsOpened, setTermsOpened] = useState(false);

  const showLocation = location => {
    const loc = data.find(x => location === x.location);
    if (loc) {
      setLocation(loc);
      setView("details");
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Covid-19 Map NZ</title>
      </Head>
      <Wrap>
        <Main>
          <Map
            center={center}
            zoom={zoom}
            markers={data}
            onMarkerClick={showLocation}
            currentView={view}
          />
        </Main>
        <Info>
          {view === "details" ? (
            <Details>
              <BackButton type="button" onClick={() => setView("")}>
                &lt; Back to summary
              </BackButton>

              <Bar>
                {location.location}
                <span>
                  {location.numCases}{" "}
                  {location.numCases === 1 ? "Case" : "Cases"}
                </span>
              </Bar>

              {location?.cases.map((item, i) => (
                <Case key={i}>
                  <h3>Case {item.caseId}</h3>
                  <div className="details">
                    <div className="age">
                      {item.age}
                      {item.age && item.gender ? ", " : ""} {item.gender}
                    </div>
                    {item.details}
                  </div>
                </Case>
              ))}
            </Details>
          ) : (
            <Summary>
              <Alert
                href="https://covid19.govt.nz/assets/COVID_Alert-levels_v2.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Alert Level 3
              </Alert>
              <img className="logo" src="/logo.svg" />
              <h1>Covid-19 Map</h1>
              <h2>Current Cases in New Zealand</h2>
              <div className="meta">
                <small>Last updated {lastUpdated}</small>
                <br />
                <small>
                  Source:{" "}
                  <a
                    href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ministry of Health
                  </a>
                </small>
              </div>
              <h2 className="split">
                Total number of cases <span>{totalCases}</span>
              </h2>

              <Bar>
                Location
                <span>Case/s</span>
              </Bar>
              {data.map((item, i) => (
                <Location
                  key={i}
                  type="button"
                  onClick={() => showLocation(item.location)}
                >
                  {item.location}
                  <span>{item.numCases}</span>
                </Location>
              ))}

              <p>
                <small>
                  We can only work with the official data that has been released
                  by the{" "}
                  <a
                    href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ministry of Health
                  </a>
                  . As confirmed cases are sometimes listed by the region rather
                  than by the town, this can affect how accurate the map is able
                  to pinpoint the exact locations.
                </small>
              </p>
              <p>
                <small>
                  Should the Ministry make their data a bit more specific going
                  forward we will definitely ensure the map is updated at the
                  same time to better reflect the affected areas.
                </small>
              </p>

              <p>
                <small>
                  Any feedback, ideas, or if you'd like to help, please contact{" "}
                  <a href="mailto:contact@covid19map.nz">
                    contact@covid19map.nz
                  </a>{" "}
                  |{" "}
                  <a
                    href="https://github.com/dixoncheng/covid19map"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
                  <br />
                  <LinkButton
                    type="button"
                    onClick={() => setTermsOpened(!termsOpened)}
                  >
                    Disclaimer and Terms of use
                  </LinkButton>
                </small>
              </p>

              {termsOpened && (
                <div>
                  <p>
                    <small>
                      Covid-19 Map NZ sources its data directly from the
                      official{" "}
                      <a
                        href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ministry of Health page
                      </a>
                      . We are in no way responsible for the accuracy of this
                      information.
                    </small>
                  </p>
                  <p>
                    <small>
                      Covid-19 Map NZ disclaims and excludes all liability for
                      any claim, loss, demand or damages of any kind whatsoever
                      (including for negligence) arising out of or in connection
                      with the use of either this website or the information,
                      content or materials included on this site or on any
                      website we link to.
                    </small>
                  </p>
                  <p>
                    <small>
                      By viewing and using the site, you will be deemed to agree
                      to these Terms of use.
                    </small>
                  </p>
                </div>
              )}
            </Summary>
          )}
        </Info>
      </Wrap>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  // const response = await fetch(URL);
  // const html = await response.text();
  const html = `
<!DOCTYPE html>
<html lang="en" dir="ltr" prefix="" class="no-js">
<head>
  <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge"><![endif]-->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="format-detection" content="telephone=no" />
  <link rel="profile" href="http://www.w3.org/1999/xhtml/vocab" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="shortcut icon" href="https://www.health.govt.nz/sites/all/themes/mohpub_bootstrap/favicon.ico" type="image/vnd.microsoft.icon" />
<meta name="description" content="Information about current cases of COVID-19 in New Zealand." />
<meta name="generator" content="Drupal 7 (https://www.drupal.org)" />
<link rel="canonical" href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases" />
<link rel="shortlink" href="https://www.health.govt.nz/node/10813" />
<meta property="og:site_name" content="Ministry of Health NZ" />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases" />
<meta property="og:title" content="COVID-19 - current cases" />
<meta property="og:description" content="Information about current cases of COVID-19 in New Zealand." />
  <title>COVID-19 - current cases | Ministry of Health NZ</title>
  <link type="text/css" rel="stylesheet" href="https://www.health.govt.nz/sites/default/files/css/css_lQaZfjVpwP_oGNqdtWCSpJT1EMqXdMiU84ekLLxQnc4.css" media="all" />
<link type="text/css" rel="stylesheet" href="https://www.health.govt.nz/sites/default/files/css/css_pxwTc2Et1NrfbIS2ioEsU7buWqkOKCilgD5XZ3FWFNc.css" media="all" />
<link type="text/css" rel="stylesheet" href="https://www.health.govt.nz/sites/default/files/css/css_Zyo4B6Q9gHnborjMRZSWS8UsnEcAOQ6VHWJOf-wZ6_w.css" media="all" />
<link type="text/css" rel="stylesheet" href="https://www.health.govt.nz/sites/default/files/css/css__tdS9sijWzM_avlWm-zcMrHBXRVWAdNf8VLNZXVxoMw.css" media="all" />
<link type="text/css" rel="stylesheet" href="https://www.health.govt.nz/sites/default/files/css/css_r7NPyvpdYfAyZmk9zkK8OaFKEFj6er5ZJnam2H644DM.css" media="print" />
  <link rel="alternate stylesheet" type="text/css" href="/sites/all/themes/mohpub_bootstrap/css/high-contrast.css" media="screen" title="High Contrast" />
  <script src="https://www.health.govt.nz/sites/default/files/js/js_0RyHJ63yYLuaWsodCPCgSD8dcTIA0dqcDf8-7c2XdBw.js"></script>
<script src="https://www.health.govt.nz/sites/default/files/js/js_Tik8PIaz_eQ5I4FMzmjkWoPEs9jKBgTSauo1jgsNa6g.js"></script>
<script src="https://www.health.govt.nz/sites/default/files/js/js_YAdPZfg12M1m7ROp3_gVJPS5sArqL0kYQgNRPoicvHE.js"></script>
<script>(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","https://www.google-analytics.com/analytics.js","ga");ga("create", "UA-3573389-24", {"cookieDomain":".www.health.govt.nz","siteSpeedSampleRate":15});ga("send", "pageview");</script>
<script src="https://www.health.govt.nz/sites/default/files/js/js_wauJ-VUoyA1MrZ6ZPFtGhNR7qiKnBdBSKEwQJjdEXIk.js"></script>
<script src="https://www.health.govt.nz/sites/default/files/js/js_4VW9edmu3V8VjGJxFfXGAwkXeW2cJIa5h-6y7SgwVrk.js"></script>
<script>    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:930919,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
<script>jQuery.extend(Drupal.settings, {"basePath":"\/","pathPrefix":"","ajaxPageState":{"theme":"mohpub_bootstrap","theme_token":"MT3oAekkspCklMwrZNz1nEW8UWDWOA9svMGPOW9dhgY","js":{"sites\/all\/modules\/custom\/table_d3chart\/js\/table_d3chart.js":1,"sites\/all\/modules\/custom\/moh_d3\/moh_d3.js":1,"sites\/all\/modules\/contrib\/jquery_update\/replace\/jquery\/1.7\/jquery.min.js":1,"misc\/jquery-extend-3.4.0.js":1,"misc\/jquery.once.js":1,"misc\/drupal.js":1,"sites\/all\/modules\/contrib\/extlink\/extlink.js":1,"modules\/field\/modules\/text\/text.js":1,"sites\/all\/modules\/contrib\/field_group\/field_group.js":1,"sites\/all\/modules\/contrib\/google_analytics\/googleanalytics.js":1,"0":1,"sites\/all\/libraries\/c3\/c3.js":1,"sites\/all\/libraries\/d3\/d3.js":1,"sites\/all\/modules\/contrib\/d3\/js\/d3.js":1,"sites\/all\/libraries\/d3.helpers\/d3.helpers.js":1,"sites\/all\/libraries\/d3.c3\/d3-c3.js":1,"sites\/all\/themes\/mohpub_bootstrap\/js\/assets\/ios-fix.js":1,"sites\/all\/themes\/mohpub_bootstrap\/bootstrap\/js\/affix.js":1,"sites\/all\/themes\/mohpub_bootstrap\/bootstrap\/js\/alert.js":1,"sites\/all\/themes\/mohpub_bootstrap\/bootstrap\/js\/button.js":1,"sites\/all\/themes\/mohpub_bootstrap\/bootstrap\/js\/carousel.js":1,"sites\/all\/themes\/mohpub_bootstrap\/bootstrap\/js\/collapse.js":1,"sites\/all\/themes\/mohpub_bootstrap\/bootstrap\/js\/dropdown.js":1,"sites\/all\/themes\/mohpub_bootstrap\/bootstrap\/js\/modal.js":1,"sites\/all\/themes\/mohpub_bootstrap\/bootstrap\/js\/tooltip.js":1,"sites\/all\/themes\/mohpub_bootstrap\/bootstrap\/js\/popover.js":1,"sites\/all\/themes\/mohpub_bootstrap\/bootstrap\/js\/scrollspy.js":1,"sites\/all\/themes\/mohpub_bootstrap\/bootstrap\/js\/tab.js":1,"sites\/all\/themes\/mohpub_bootstrap\/bootstrap\/js\/transition.js":1,"sites\/all\/themes\/mohpub_bootstrap\/js\/jquery.cookie.js":1,"sites\/all\/themes\/mohpub_bootstrap\/js\/jquery.moh.announcement.js":1,"sites\/all\/themes\/mohpub_bootstrap\/js\/svgeezy.js":1,"sites\/all\/themes\/mohpub_bootstrap\/js\/fitvids.js":1,"sites\/all\/themes\/mohpub_bootstrap\/js\/bootstrap-tabcollapse.js":1,"sites\/all\/themes\/mohpub_bootstrap\/js\/jquery.scrollTo.min.js":1,"sites\/all\/themes\/mohpub_bootstrap\/js\/script.js":1,"sites\/all\/themes\/mohpub_bootstrap\/js\/jquery.google_analytics.js":1,"sites\/all\/themes\/mohpub_bootstrap\/js\/bootstrap-accessibility.min.js":1,"sites\/all\/themes\/mohpub_bootstrap\/js\/style-switcher.js":1,"1":1},"css":{"modules\/system\/system.base.css":1,"sites\/all\/modules\/contrib\/calendar\/css\/calendar_multiday.css":1,"modules\/field\/theme\/field.css":1,"modules\/node\/node.css":1,"sites\/all\/modules\/contrib\/extlink\/extlink.css":1,"sites\/all\/modules\/contrib\/views\/css\/views.css":1,"sites\/all\/modules\/contrib\/ckeditor\/css\/ckeditor.css":1,"sites\/all\/modules\/contrib\/ctools\/css\/ctools.css":1,"sites\/all\/modules\/contrib\/panels\/css\/panels.css":1,"sites\/all\/libraries\/c3\/c3.css":1,"sites\/all\/libraries\/d3.c3\/d3-c3.css":1,"sites\/all\/themes\/mohpub_bootstrap\/fontawesome\/css\/font-awesome.min.css":1,"sites\/all\/modules\/features\/site_profile\/css\/fix-rubik-multiselect-height.css":1,"sites\/all\/themes\/mohpub_bootstrap\/css\/style.css":1,"sites\/all\/themes\/mohpub_bootstrap\/css\/responsive-tables.css":1,"sites\/all\/themes\/mohpub_bootstrap\/css\/print.css":1}},"field_group":{"div":"full"},"extlink":{"extTarget":0,"extClass":"ext","extLabel":"(link is external)","extImgClass":0,"extIconPlacement":"append","extSubdomains":0,"extExclude":"","extInclude":"","extCssExclude":"","extCssExplicit":"","extAlert":0,"extAlertText":"This link will take you to an external web site. We are not responsible for their content.","mailtoClass":"mailto","mailtoLabel":"(link sends e-mail)"},"googleanalytics":{"trackOutbound":1,"trackMailto":1,"trackDownload":1,"trackDownloadExtensions":"7z|aac|arc|arj|asf|asx|avi|bin|csv|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls|xml|z|zip|docx|xlsx|pptx|pptm|ppsx|ppsm|epub"},"mohD3":{"C3Types":["line","spline","step","area","area-spline","area-step","bar","scatter","pie","donut","gauge"],"graphRender":"line","graphLegend":true,"graphDefaultColors":"#2b8cbe, #abdda4, #7f7f7f, #92cddc, #dc8b0c","graphDefaultGroupedTooltip":0,"graphDefaultGridX":0,"graphDefaultGridY":0,"graphDefaultLegendPosition":"top-right","graphDefaultTooltip":1,"graphDefaultDataLabel":0,"graphLegendStep":"5","graphInteraction":true,"graphTypes":"","graphXaxisShow":true,"graphXaxisLabel":"","graphYaxisLabel":"","graphXaxisType":"category","graphXaxisCentered":false,"graphXaxisRotation":"","graphXaxisHeight":"","graphYaxisShow":true,"graphYaxisMax":"","graphYaxisMin":"","graphYaxisInverted":false,"graphYaxisCenter":"","graphYaxisPrefix":"","graphYaxisSuffix":"","graphYaxisPosition":"","graphY2axisShow":false,"graphY2axisSource":"","graphY2axisMax":"","graphY2axisMin":"","graphGroups":"","graphRotated":false,"graphIgnoreEmpty":false,"graphLineDot":true,"graphBarRatio":"0.9","graphDot":true,"graphDotR":"2.5","graphFocus":false},"tableD3":{"show":"View table data source","hide":"Hide table data source"},"urlIsAjaxTrusted":{"\/our-work\/diseases-and-conditions\/covid-19-novel-coronavirus\/covid-19-current-cases":true},"bootstrap":{"anchorsFix":1,"anchorsSmoothScrolling":1,"formHasError":1,"popoverEnabled":1,"popoverOptions":{"animation":1,"html":0,"placement":"right","selector":"","trigger":"click","triggerAutoclose":1,"title":"","content":"","delay":0,"container":"body"},"tooltipEnabled":1,"tooltipOptions":{"animation":1,"html":0,"placement":"auto left","selector":"","trigger":"hover focus","delay":0,"container":"body"}}});</script>
  <!-- HTML5 element support for IE6-8 -->
  <!--[if lt IE 9]>
    <script src="/sites/all/themes/mohpub_bootstrap/js/assets/html5shiv.js"></script>
    <script src="/sites/all/themes/mohpub_bootstrap/js/assets/respond.min.js"></script>
  <![endif]-->
</head>
<body class="html not-front not-logged-in no-sidebars page-node page-node- page-node-10813 node-type-page node-has-intro" >
<!--googleoff: all-->
  <div id="skip-link">
    <a href="#skip-content" id="skipper" class="element-invisible element-focusable">Skip to main content</a>
  </div>
    <div id="page">
  <header id="navbar" role="banner" class="navbar container navbar-default">
          <ul class="menu nav navbar-nav secondary"><li class="first leaf jobs depth-1"><a href="https://careers.health.govt.nz" title="">Jobs</a></li>
<li class="leaf news depth-1"><a href="/news-media" data-is-top-level="0" title="">News</a></li>
<li class="leaf contact-us depth-1"><a href="/about-ministry/contact-us" title="">Contact us</a></li>
<li class="leaf twitter depth-1"><a href="https://twitter.com/minhealthnz" data-is-top-level="0" title="">Twitter</a></li>
<li class="last leaf youtube depth-1"><a href="https://www.youtube.com/user/minhealthnz" data-is-top-level="0" title="">Youtube</a></li>
</ul>        <div class="container">
      <div class="navbar-header">
                <a class="logo navbar-btn pull-left" href="/" title="Home">
          <img src="/sites/all/themes/mohpub_bootstrap/images/mohlogo.svg" alt="Ministry of Health" />
        </a>
                  <div class="region region-header-top">
    <section id="block-apachesolr-panels-search-form" class="block block-apachesolr-panels clearfix">

      
  <form action="/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases" method="post" id="apachesolr-panels-search-block" accept-charset="UTF-8"><div><div class="form-item form-item-apachesolr-panels-search-form form-type-textfield form-group"> <label class="control-label" for="edit-apachesolr-panels-search-form">Search</label>
<input title="Enter the terms you wish to search for." class="form-control form-text" type="text" id="edit-apachesolr-panels-search-form" name="apachesolr_panels_search_form" value="" size="15" maxlength="128" /></div><input type="hidden" name="form_build_id" value="form-PCiOyrj8aDJaOsuKh9JFRG7Ew5a_Ne9JQg18rC-IV44" />
<input type="hidden" name="form_id" value="apachesolr_panels_search_block" />
<div class="form-actions form-wrapper form-group" id="edit-actions"><button type="submit" id="edit-submit" name="op" value="Search" class="btn btn-primary form-submit">Search</button>
</div></div></form>
</section>
  </div>
        <!-- .btn-navbar is used as the toggle for collapsed navbar content -->
        <button aria-expanded="false" aria-controls="megamenu" type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="menu-text">Menu</span><span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>

        </button>
      </div>

              <div class="navbar-collapse collapse">
          <nav id="megamenu" role="navigation">
                          <h2 class="element-invisible">Main menu</h2><ul id="main-menu" class="menu nav navbar-nav yamm navbar"><li class="first dropdown"><a href="/your-health" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-controls="megamenu-dropdown-780">Your health <b class="caret"></b></a>
    <div id="megamenu-dropdown-780" class="dropdown-menu">
    <div class="yamm-content">
      <div class="row">
                            <div class="col">
            <h3><a href="/your-health/conditions-and-treatments?mega=Your%20health&amp;title=Conditions%20%26%20treatments" class="menu-header">Conditions &amp; treatments</a></h3>
            <ul class="list-unstyled">
                                                <li><a href="/your-health/conditions-and-treatments/mental-health/depression?mega=Your%20health&amp;title=Depression">Depression</a></li>
                                  <li><a href="/your-health/conditions-and-treatments/diseases-and-illnesses/diabetes?mega=Your%20health&amp;title=Diabetes">Diabetes</a></li>
                                  <li><a href="/your-health/conditions-and-treatments/diseases-and-illnesses/influenza?mega=Your%20health&amp;title=Influenza">Influenza</a></li>
                                  <li><a href="/your-health/conditions-and-treatments/diseases-and-illnesses/measles?mega=Your%20health&amp;title=Measles">Measles</a></li>
                                  <li><a href="/your-health/conditions-and-treatments/diseases-and-illnesses/meningococcal-disease-including-meningitis?mega=Your%20health&amp;title=Meningococcal%20disease">Meningococcal disease</a></li>
                                  <li><a href="/your-health/conditions-and-treatments/diseases-and-illnesses/mumps?mega=Your%20health&amp;title=Mumps">Mumps</a></li>
                                  <li><a href="/your-health/conditions-and-treatments/diseases-and-illnesses/sore-throat?mega=Your%20health&amp;title=Sore%20throat">Sore throat</a></li>
                                  <li><a href="/your-health/conditions-and-treatments/diseases-and-illnesses/whooping-cough?mega=Your%20health&amp;title=Whooping%20cough">Whooping cough</a></li>
                                  <li><a href="/your-health/conditions-and-treatments?mega=Your%20health&amp;title=See%20all" class="view-more"><span>See all</span></a></li>
                                          </ul>
          </div>
                                      <div class="col">
            <h3><a href="/your-health/healthy-living?mega=Your%20health&amp;title=Healthy%20living" class="menu-header">Healthy living</a></h3>
            <ul class="list-unstyled">
                                                <li><a href="/your-health/healthy-living/drinking-water?mega=Your%20health&amp;title=Drinking-water">Drinking-water</a></li>
                                  <li><a href="/your-health/healthy-living/food-activity-and-sleep/green-prescriptions?mega=Your%20health&amp;title=Green%20Prescriptions">Green Prescriptions</a></li>
                                  <li><a href="/your-health/healthy-living/food-activity-and-sleep/healthy-eating?mega=Your%20health&amp;title=Healthy%20eating">Healthy eating</a></li>
                                  <li><a href="/your-health/healthy-living/immunisation?mega=Your%20health&amp;title=Immunisation">Immunisation</a></li>
                                  <li><a href="/your-health/healthy-living/food-activity-and-sleep/physical-activity?mega=Your%20health&amp;title=Physical%20activity">Physical activity</a></li>
                                  <li><a href="/your-health/healthy-living/addictions/smoking?mega=Your%20health&amp;title=Smoking">Smoking</a></li>
                                  <li><a href="/your-health/healthy-living/teeth-and-gums?mega=Your%20health&amp;title=Teeth%20and%20gums">Teeth and gums</a></li>
                                  <li><a href="/your-health/healthy-living?mega=Your%20health&amp;title=See%20all" class="view-more"><span>See all</span></a></li>
                                          </ul>
          </div>
                                      <div class="col">
            <h3><a href="/your-health/pregnancy-and-kids?mega=Your%20health&amp;title=Pregnancy%20and%20kids" class="menu-header">Pregnancy and kids</a></h3>
            <ul class="list-unstyled">
                                                <li><a href="/your-health/pregnancy-and-kids/birth-and-afterwards?mega=Your%20health&amp;title=Birth%20and%20afterwards">Birth and afterwards</a></li>
                                  <li><a href="/your-health/pregnancy-and-kids/first-year/helpful-advice-during-first-year/breastfeeding-perfect-you-and-your-baby?mega=Your%20health&amp;title=Breastfeeding">Breastfeeding</a></li>
                                  <li><a href="/your-health/pregnancy-and-kids/pregnancy?mega=Your%20health&amp;title=Pregnancy">Pregnancy</a></li>
                                  <li><a href="/your-health/pregnancy-and-kids/services-and-support-during-pregnancy?mega=Your%20health&amp;title=Services%20and%20support%20during%20pregnancy">Services and support during pregnancy</a></li>
                                  <li><a href="/your-health/pregnancy-and-kids/services-and-support-you-and-your-child?mega=Your%20health&amp;title=Services%20and%20support%20for%20you%20and%20your%20child">Services and support for you and your child</a></li>
                                  <li><a href="/your-health/pregnancy-and-kids/first-year?mega=Your%20health&amp;title=The%20first%20year">The first year</a></li>
                                  <li><a href="/your-health/pregnancy-and-kids/under-fives?mega=Your%20health&amp;title=Under%20fives">Under fives</a></li>
                                  <li><a href="/your-health/pregnancy-and-kids?mega=Your%20health&amp;title=See%20all" class="view-more"><span>See all</span></a></li>
                                          </ul>
          </div>
                                      <div class="col">
            <h3><a href="/your-health/services-and-support?mega=Your%20health&amp;title=Services%20and%20support" class="menu-header">Services &amp; support</a></h3>
            <ul class="list-unstyled">
                                                <li><a href="/your-health/services-and-support/health-care-services/help-alcohol-and-drug-problems?mega=Your%20health&amp;title=Alcohol%20and%20drugs">Alcohol and drugs</a></li>
                                  <li><a href="/your-health/services-and-support/disability-services?mega=Your%20health&amp;title=Disability%20services">Disability services</a></li>
                                  <li><a href="/your-health/services-and-support/health-care-services/earthquake-support-line?mega=Your%20health&amp;title=Earthquake%20Support%20Line">Earthquake Support Line</a></li>
                                  <li><a href="/your-health/services-and-support/health-care-services/healthline?mega=Your%20health&amp;title=Healthline">Healthline</a></li>
                                  <li><a href="/your-health/services-and-support/health-care-services/mental-health-services?mega=Your%20health&amp;title=Mental%20health%20services">Mental health services</a></li>
                                  <li><a href="/your-health/services-and-support/health-care-services/maori-health-provider-directory?mega=Your%20health&amp;title=M%C4%81ori%20health%20providers">Māori health providers</a></li>
                                  <li><a href="/your-health/services-and-support/health-care-services/services-older-people/rest-home-certification-and-audits?mega=Your%20health&amp;title=Rest%20home%20certification">Rest home certification</a></li>
                                  <li><a href="/your-health/services-and-support/health-care-services/hospitals-and-specialist-services/travel-assistance?mega=Your%20health&amp;title=Travel%20assistance">Travel assistance</a></li>
                                  <li><a href="/your-health/services-and-support?mega=Your%20health&amp;title=See%20all" class="view-more"><span>See all</span></a></li>
                                          </ul>
          </div>
                        </div>
    </div>
    <div class="feature-links">
      <h3 class="sr-only">Other related resources</h3>
      <a href="/your-health/full-a-z?mega=Your%20health&amp;title=A-Z">View the full A-Z</a>    </div>
  </div>
</li>
<li class="dropdown"><a href="/new-zealand-health-system" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-controls="megamenu-dropdown-6076">NZ health system <b class="caret"></b></a>
    <div id="megamenu-dropdown-6076" class="dropdown-menu">
    <div class="yamm-content">
      <div class="row">
                            <div class="col">
            <h3><a href="/new-zealand-health-system/key-health-sector-organisations-and-people?mega=NZ%20health%20system&amp;title=Key%20organisations" class="menu-header">Key organisations</a></h3>
            <ul class="list-unstyled">
                                                <li><a href="/new-zealand-health-system/key-health-sector-organisations-and-people/crown-entities-and-agencies?mega=NZ%20health%20system&amp;title=Crown%20entities%20%26%20agencies">Crown entities &amp; agencies</a></li>
                                  <li><a href="/new-zealand-health-system/key-health-sector-organisations-and-people/district-health-boards?mega=NZ%20health%20system&amp;title=District%20health%20boards">District health boards</a></li>
                                  <li><a href="/new-zealand-health-system/key-health-sector-organisations-and-people/non-governmental-organisations?mega=NZ%20health%20system&amp;title=Non-governmental%20organisations">Non-governmental organisations</a></li>
                                  <li><a href="/new-zealand-health-system/key-health-sector-organisations-and-people/primary-health-organisations?mega=NZ%20health%20system&amp;title=Primary%20health%20organisations">Primary health organisations</a></li>
                                  <li><a href="/new-zealand-health-system/key-health-sector-organisations-and-people/public-health-units?mega=NZ%20health%20system&amp;title=Public%20health%20units">Public health units</a></li>
                                  <li><a href="/new-zealand-health-system/key-health-sector-organisations-and-people?mega=NZ%20health%20system&amp;title=See%20all" class="view-more"><span>See all</span></a></li>
                                          </ul>
          </div>
                                      <div class="col">
            <h3><a href="/new-zealand-health-system/health-targets?mega=NZ%20health%20system&amp;title=Health%20targets" class="menu-header">Health targets</a></h3>
            <ul class="list-unstyled">
                                                <li><a href="/new-zealand-health-system/health-targets/how-my-dhb-performing-2017-18?mega=NZ%20health%20system&amp;title=How%20is%20my%20DHB%20performing%3F">How is my DHB performing?</a></li>
                                  <li><a href="/new-zealand-health-system/health-targets/how-my-pho-performing?mega=NZ%20health%20system&amp;title=How%20is%20my%20PHO%20performing%3F">How is my PHO performing?</a></li>
                                  <li><a href="/new-zealand-health-system/health-targets?mega=NZ%20health%20system&amp;title=See%20all" class="view-more"><span>See all</span></a></li>
                                          </ul>
          </div>
                                      <div class="col">
            <h3><a href="/new-zealand-health-system/eligibility-publicly-funded-health-services?mega=NZ%20health%20system&amp;title=Eligibility%20for%20public%20health%20services" class="menu-header">Eligibility for public health services</a></h3>
            <ul class="list-unstyled">
                                                <li><a href="/new-zealand-health-system/eligibility-publicly-funded-health-services/guide-eligibility-publicly-funded-health-services?mega=NZ%20health%20system&amp;title=Guide%20to%20eligibility">Guide to eligibility</a></li>
                                  <li><a href="/new-zealand-health-system/eligibility-publicly-funded-health-services/eligibility-questions-and-answers-consumers?mega=NZ%20health%20system&amp;title=Q%26A%20for%20consumers">Q&amp;A for consumers</a></li>
                                  <li><a href="/new-zealand-health-system/eligibility-publicly-funded-health-services/eligibility-questions-and-answers-service-providers?mega=NZ%20health%20system&amp;title=Q%26A%20for%20service%20providers">Q&amp;A for service providers</a></li>
                                  <li><a href="/new-zealand-health-system/eligibility-publicly-funded-health-services/reciprocal-health-agreements?mega=NZ%20health%20system&amp;title=Reciprocal%20health%20agreements">Reciprocal health agreements</a></li>
                                  <li><a href="/new-zealand-health-system/eligibility-publicly-funded-health-services?mega=NZ%20health%20system&amp;title=See%20all" class="view-more"><span>See all</span></a></li>
                                          </ul>
          </div>
                                      <div class="col">
            <h3><a href="/new-zealand-health-system/claims-provider-payments-and-entitlements?mega=NZ%20health%20system&amp;title=Claims%2C%20provider%20payments%20and%20entitlements" class="menu-header">Claims &amp; provider payments</a></h3>
            <ul class="list-unstyled">
                                                <li><a href="/new-zealand-health-system/claims-provider-payments-and-entitlements/carer-support-claims?mega=NZ%20health%20system&amp;title=Carer%20Support">Carer Support</a></li>
                                  <li><a href="/new-zealand-health-system/claims-provider-payments-and-entitlements/high-use-health-card-payments?mega=NZ%20health%20system&amp;title=High%20Use%20Health%20Card%20payments">High Use Health Card payments</a></li>
                                  <li><a href="/new-zealand-health-system/claims-provider-payments-and-entitlements/between-travel-settlement?mega=NZ%20health%20system&amp;title=In-Between%20Travel%20Settlement">In-Between Travel Settlement</a></li>
                                  <li><a href="/new-zealand-health-system/claims-provider-payments-and-entitlements/maternity-claim-forms?mega=NZ%20health%20system&amp;title=Maternity%20claim%20forms">Maternity claim forms</a></li>
                                  <li><a href="/new-zealand-health-system/claims-provider-payments-and-entitlements/national-travel-assistance?mega=NZ%20health%20system&amp;title=National%20travel%20assistance%20claims">National travel assistance claims</a></li>
                                  <li><a href="/new-zealand-health-system/claims-provider-payments-and-entitlements?mega=NZ%20health%20system&amp;title=See%20all" class="view-more"><span>See all</span></a></li>
                                          </ul>
          </div>
                        </div>
    </div>
    <div class="feature-links">
      <h3 class="sr-only">Other related resources</h3>
      <a href="/new-zealand-health-system/overview-health-system?mega=NZ%20health%20system&amp;title=Overview">Overview of the health system</a>  <a href="/new-zealand-health-system/my-dhb?mega=NZ%20health%20system&amp;title=Mydhb">My DHB</a> <a href="/new-zealand-health-system/system-level-measures-framework?mega=NZ%20health%20system&amp;title=SLM">System level measures</a>  <a href="/publication/new-zealand-health-strategy-2016?mega=NZ%20health%20system&amp;title=HealthStrategy">NZ Health Strategy</a>    </div>
  </div>
</li>
<li class="dropdown"><a href="/our-work" class="dropdown-toggle active-trail" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-controls="megamenu-dropdown-776">Our work <b class="caret"></b></a>
  <div id="megamenu-dropdown-776" class="dropdown-menu">
    <div class="yamm-content">
      <div class="row">
                            <ul class="col list-unstyled no-menu-header">
                                                                                <li>
                <a href="/our-work/diseases-and-conditions/antimicrobial-resistance?mega=Our%20work&amp;title=Antimicrobial%20resistance" class="menu-header">Antimicrobial resistance</a>                              </li>
                                                                    <li>
                <a href="/our-work/populations/asian-and-migrant-health?mega=Our%20work&amp;title=Asian%20and%20migrant%20health" class="menu-header">Asian and migrant health</a>                              </li>
                                                                    <li>
                <a href="/our-work/border-health?mega=Our%20work&amp;title=Border%20health" class="menu-header">Border health</a>                              </li>
                                                                    <li>
                <a href="/our-work/life-stages/breastfeeding?mega=Our%20work&amp;title=Breastfeeding" class="menu-header">Breastfeeding</a>                              </li>
                                                                    <li>
                <a href="/our-work/diseases-and-conditions/national-cancer-programme?mega=Our%20work&amp;title=Cancer%20programme" class="menu-header">Cancer programme</a>                              </li>
                                                                    <li>
                <a href="/our-work/regulation-health-and-disability-system/certification-health-care-services?mega=Our%20work&amp;title=Certification%20of%20health%20care%20services" class="menu-header">Certification of health care services</a>                              </li>
                                                                    <li>
                <a href="/our-work/life-stages/child-health?mega=Our%20work&amp;title=Child%20health" class="menu-header">Child health</a>                              </li>
                                                                    <li>
                <a href="/our-work/diseases-and-conditions/covid-19-novel-coronavirus?mega=Our%20work&amp;title=COVID-19" class="menu-header">COVID-19 (novel coronavirus)</a>                              </li>
                                                                    <li>
                <a href="/our-work/diseases-and-conditions/diabetes?mega=Our%20work&amp;title=Diabetes" class="menu-header">Diabetes</a>                              </li>
                                                                    <li>
                <a href="/our-work/digital-health?mega=Our%20work&amp;title=Digital%20health" class="menu-header">Digital health</a>                              </li>
                                                                    <li>
                <a href="/our-work/disability-services?mega=Our%20work&amp;title=Disability%20services" class="menu-header">Disability services</a>                              </li>
                                                                </ul>
                            <ul class="col list-unstyled no-menu-header">
                                                                                <li>
                <a href="/our-work/diseases-and-conditions?mega=Our%20work&amp;title=Diseases%20and%20conditions" class="menu-header">Diseases and conditions</a>                              </li>
                                                                    <li>
                <a href="/our-work/hospitals-and-specialist-care/emergency-departments?mega=Our%20work&amp;title=Emergency%20departments" class="menu-header">Emergency departments</a>                              </li>
                                                                    <li>
                <a href="/our-work/emergency-management?mega=Our%20work&amp;title=Emergency%20management" class="menu-header">Emergency management</a>                              </li>
                                                                    <li>
                <a href="/our-work/environmental-health?mega=Our%20work&amp;title=Environmental%20health" class="menu-header">Environmental health</a>                              </li>
                                                                    <li>
                <a href="/our-work/preventative-health-wellness/family-violence?mega=Our%20work&amp;title=Family%20violence" class="menu-header">Family violence</a>                              </li>
                                                                    <li>
                <a href="/our-work/preventative-health-wellness/fluoride-and-oral-health?mega=Our%20work&amp;title=Fluoride%20and%20oral%20health" class="menu-header">Fluoride and oral health</a>                              </li>
                                                                    <li>
                <a href="/our-work/health-identity?mega=Our%20work&amp;title=Health%20identity" class="menu-header">Health identity</a>                              </li>
                                                                    <li>
                <a href="/our-work/life-stages/health-older-people?mega=Our%20work&amp;title=Health%20of%20older%20people" class="menu-header">Health of older people</a>                              </li>
                                                                    <li>
                <a href="/our-work/health-workforce?mega=Our%20work&amp;title=Health%20workforce" class="menu-header">Health workforce</a>                              </li>
                                                                    <li>
                <a href="/our-work/hospital-redevelopment-projects?mega=Our%20work&amp;title=Hospital%20redevelopment%20projects" class="menu-header">Hospital redevelopment projects</a>                              </li>
                                                                    <li>
                <a href="/our-work/hospitals-and-specialist-care?mega=Our%20work&amp;title=Hospitals%20and%20specialist%20care" class="menu-header">Hospitals and specialist care</a>                              </li>
                                                                </ul>
                            <ul class="col list-unstyled no-menu-header">
                                                                                <li>
                <a href="/our-work/preventative-health-wellness/immunisation?mega=Our%20work&amp;title=Immunisation" class="menu-header">Immunisation</a>                              </li>
                                                                    <li>
                <a href="/our-work/ionising-radiation-safety?mega=Our%20work&amp;title=Ionising%20radiation%20safety" class="menu-header">Ionising radiation safety</a>                              </li>
                                                                    <li>
                <a href="/our-work/populations/maori-health?mega=Our%20work&amp;title=M%C4%81ori%20health" class="menu-header">Māori health</a>                              </li>
                                                                    <li>
                <a href="/our-work/life-stages/maternity-services?mega=Our%20work&amp;title=Maternity" class="menu-header">Maternity</a>                              </li>
                                                                    <li>
                <a href="/our-work/regulation-health-and-disability-system/medicines-control?mega=Our%20work&amp;title=Medicines%20control" class="menu-header">Medicines control</a>                              </li>
                                                                    <li>
                <a href="/our-work/mental-health-and-addictions?mega=Our%20work&amp;title=Mental%20health%20and%20addictions" class="menu-header">Mental health and addictions</a>                              </li>
                                                                    <li>
                <a href="/our-work/nursing?mega=Our%20work&amp;title=Nursing" class="menu-header">Nursing</a>                              </li>
                                                                    <li>
                <a href="/our-work/preventative-health-wellness/nutrition?mega=Our%20work&amp;title=Nutrition" class="menu-header">Nutrition</a>                              </li>
                                                                    <li>
                <a href="/our-work/preventative-health-wellness/oral-health?mega=Our%20work&amp;title=Oral%20health" class="menu-header">Oral health</a>                              </li>
                                                                    <li>
                <a href="/our-work/hospitals-and-specialist-care/organ-donation-and-transplantation?mega=Our%20work&amp;title=Organ%20donation%20and%20transplantation" class="menu-header">Organ donation and transplantation</a>                              </li>
                                                                </ul>
                            <ul class="col list-unstyled no-menu-header">
                                                                                <li>
                <a href="/our-work/populations/pacific-health?mega=Our%20work&amp;title=Pacific%20health" class="menu-header">Pacific health</a>                              </li>
                                                                    <li>
                <a href="/new-zealand-health-system/pay-equity-settlements?mega=Our%20work&amp;title=Pay%20equity%20settlements" class="menu-header">Pay equity</a>                              </li>
                                                                    <li>
                <a href="/our-work/preventative-health-wellness/physical-activity?mega=Our%20work&amp;title=Physical%20activity" class="menu-header">Physical activity</a>                              </li>
                                                                    <li>
                <a href="/our-work/hospitals-and-specialist-care/planned-care-services?mega=Our%20work&amp;title=Planned%20Care%20services" class="menu-header">Planned Care services</a>                              </li>
                                                                    <li>
                <a href="/our-work/preventative-health-wellness?mega=Our%20work&amp;title=Preventative%20health/wellness" class="menu-header">Preventative health/wellness</a>                              </li>
                                                                    <li>
                <a href="/our-work/primary-health-care?mega=Our%20work&amp;title=Primary%20health%20care" class="menu-header">Primary health care</a>                              </li>
                                                                    <li>
                <a href="/our-work/public-health-workforce-development?mega=Our%20work&amp;title=Public%20health%20workforce%20development" class="menu-header">Public health workforce</a>                              </li>
                                                                    <li>
                <a href="/our-work/regulation-health-and-disability-system?mega=Our%20work&amp;title=Regulation" class="menu-header">Regulation</a>                              </li>
                                                                    <li>
                <a href="/our-work/preventative-health-wellness/tobacco-control?mega=Our%20work&amp;title=Tobacco%20control" class="menu-header">Tobacco control</a>                              </li>
                                                                    <li>
                <a href="/our-work/who-code-nz?mega=Our%20work&amp;title=WHO%20Code%20in%20NZ" class="menu-header">WHO Code in NZ</a>                              </li>
                      </ul>
              </div>
    </div>
    <div class="feature-links">
      <a href="/our-work?mega=Our%20work&amp;title=A-Z">View the full A-Z</a>    </div>
  </div>
</li>
<li class="dropdown"><a href="/nz-health-statistics" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-controls="megamenu-dropdown-778">Health statistics <b class="caret"></b></a>
    <div id="megamenu-dropdown-778" class="dropdown-menu">
    <div class="yamm-content">
      <div class="row">
                            <div class="col">
            <h3><a href="/nz-health-statistics/health-statistics-and-data-sets?mega=Health%20statistics&amp;title=Health%20statistics%20and%20data%20sets" class="menu-header">Statistics by topic</a></h3>
            <ul class="list-unstyled">
                                                <li><a href="/nz-health-statistics/health-statistics-and-data-sets/cancer-data-and-stats?mega=Health%20statistics&amp;title=Cancer">Cancer</a></li>
                                  <li><a href="/nz-health-statistics/health-statistics-and-data-sets/diabetes-data-and-stats?mega=Health%20statistics&amp;title=Diabetes">Diabetes</a></li>
                                  <li><a href="/nz-health-statistics/health-statistics-and-data-sets/mental-health-data-and-stats?mega=Health%20statistics&amp;title=Mental%20health">Mental health</a></li>
                                  <li><a href="/nz-health-statistics/health-statistics-and-data-sets/maori-health-data-and-stats?mega=Health%20statistics&amp;title=M%C4%81ori%20health">Māori health</a></li>
                                  <li><a href="/nz-health-statistics/health-statistics-and-data-sets/obesity-statistics?mega=Health%20statistics&amp;title=Obesity">Obesity</a></li>
                                  <li><a href="/nz-health-statistics/health-statistics-and-data-sets/suicide-data-and-stats?mega=Health%20statistics&amp;title=Suicide">Suicide</a></li>
                                  <li><a href="/nz-health-statistics/health-statistics-and-data-sets/tobacco-data-and-stats?mega=Health%20statistics&amp;title=Tobacco">Tobacco</a></li>
                                  <li><a href="/nz-health-statistics/health-statistics-and-data-sets?mega=Health%20statistics&amp;title=See%20all" class="view-more"><span>See all</span></a></li>
                                          </ul>
          </div>
                                      <div class="col">
            <h3><a href="/nz-health-statistics/national-collections-and-surveys?mega=Health%20statistics&amp;title=National%20collections%20and%20surveys" class="menu-header">About our surveys &amp; data collections</a></h3>
            <ul class="list-unstyled">
                                                <li><a href="/nz-health-statistics/national-collections-and-surveys/surveys/past-surveys/alcohol-and-drug-use-survey?mega=Health%20statistics&amp;title=Alcohol%20%26%20Drug%20Use%20Survey">Alcohol &amp; Drug Use Survey</a></li>
                                  <li><a href="/nz-health-statistics/national-collections-and-surveys/national-collections-annual-maintenance-project?mega=Health%20statistics&amp;title=NCAMP">NCAMP</a></li>
                                  <li><a href="/nz-health-statistics/national-collections-and-surveys/collections/new-zealand-cancer-registry-nzcr?mega=Health%20statistics&amp;title=NZ%20Cancer%20Registry">NZ Cancer Registry</a></li>
                                  <li><a href="/nz-health-statistics/national-collections-and-surveys/surveys/new-zealand-health-survey?mega=Health%20statistics&amp;title=NZ%20Health%20Survey">NZ Health Survey</a></li>
                                  <li><a href="/nz-health-statistics/national-collections-and-surveys/surveys/past-surveys/nutrition-survey?mega=Health%20statistics&amp;title=Nutrition%20Survey">Nutrition Survey</a></li>
                                  <li><a href="/nz-health-statistics/national-collections-and-surveys/collections/primhd-mental-health-data?mega=Health%20statistics&amp;title=PRIMHD">PRIMHD</a></li>
                                  <li><a href="/nz-health-statistics/national-collections-and-surveys?mega=Health%20statistics&amp;title=See%20all" class="view-more"><span>See all</span></a></li>
                                          </ul>
          </div>
                                      <div class="col">
            <h3><a href="/nz-health-statistics/classification-and-terminology?mega=Health%20statistics&amp;title=Classification%20and%20Terminology" class="menu-header">Classification &amp; terminology</a></h3>
            <ul class="list-unstyled">
                                                <li><a href="/nz-health-statistics/classification-and-terminology/using-icd-10-am-achi-acs/coding-queries/coding-query-database?mega=Health%20statistics&amp;title=Coding%20query%20database">Coding query database</a></li>
                                  <li><a href="/nz-health-statistics/classification-and-terminology/using-icd-10-am-achi-acs/courses-clinical-coding?mega=Health%20statistics&amp;title=Courses%20on%20clinical%20coding">Courses on clinical coding</a></li>
                                  <li><a href="/nz-health-statistics/classification-and-terminology/new-zealand-snomed-ct-national-release-centre?mega=Health%20statistics&amp;title=SNOMED%20CT">SNOMED CT</a></li>
                                  <li><a href="/nz-health-statistics/classification-and-terminology/using-icd-10-am-achi-acs?mega=Health%20statistics&amp;title=Using%20ICD-10-AM/ACHI/ACS">Using ICD-10-AM/ACHI/ACS</a></li>
                                  <li><a href="/nz-health-statistics/classification-and-terminology?mega=Health%20statistics&amp;title=See%20all" class="view-more"><span>See all</span></a></li>
                                          </ul>
          </div>
                                      <div class="col">
            <h3><a href="/nz-health-statistics/data-references?mega=Health%20statistics&amp;title=Data%20references" class="menu-header">Data references</a></h3>
            <ul class="list-unstyled">
                                                <li><a href="/nz-health-statistics/data-references/code-tables?mega=Health%20statistics&amp;title=Code%20tables">Code tables</a></li>
                                  <li><a href="/nz-health-statistics/data-references/data-dictionaries?mega=Health%20statistics&amp;title=Data%20dictionaries">Data dictionaries</a></li>
                                  <li><a href="/nz-health-statistics/data-references/diagnosis-related-groups?mega=Health%20statistics&amp;title=Diagnosis-related%20groups">Diagnosis-related groups</a></li>
                                  <li><a href="/nz-health-statistics/data-references/code-tables/common-code-tables/domicile-code-table?mega=Health%20statistics&amp;title=Domicile%20code%20table">Domicile code table</a></li>
                                  <li><a href="/nz-health-statistics/data-references/mapping-tools?mega=Health%20statistics&amp;title=ICD%20mapping%20tools">ICD mapping tools</a></li>
                                  <li><a href="/nz-health-statistics/data-references/weighted-inlier-equivalent-separations?mega=Health%20statistics&amp;title=Weighted%20Inlier%20Equivalent%20Separations">Weighted Inlier Equivalent Separations</a></li>
                                  <li><a href="/nz-health-statistics/data-references?mega=Health%20statistics&amp;title=See%20all" class="view-more"><span>See all</span></a></li>
                                          </ul>
          </div>
                        </div>
    </div>
    <div class="feature-links">
      <h3 class="sr-only">Other related resources</h3>
      <a href="/nz-health-statistics/health-statistics-and-data-sets/tier-1-health-statistics-release-calendar?mega=Health%20statistics&amp;title=Tier%201%20calendar">Release calendar for our Tier 1 statistics</a> <a href="/nz-health-statistics/about-data-collection?mega=Health%20statistics&amp;title=Enquiries">Data and survey enquiries</a>    </div>
  </div>
</li>
<li class=""><a href="/publications" aria-haspopup="false">Publications</a></li>
<li class=""><a href="/about-ministry" aria-haspopup="false">About us</a></li>
<li class="visible-xs"><a href="/contactus" aria-haspopup="false">Contact us</a></li>
</ul>
                                  </nav>
        </div>
          </div>
  </header>

  <div class="main-container container">
    <!-- announcement -->
        <!-- /announcement -->

    <header role="banner" id="page-header">
      
          </header> <!-- /#page-header -->

    <div class="row">
      
      <section class="col-sm-12">
                        <a id="main-content"></a>
                                                                            <div class="breadcrumbs">
            <ul><li><a href="/">Home</a></li><li><a href="/our-work">Our work</a></li><li><a href="/our-work/diseases-and-conditions">Diseases and conditions</a></li><li><a href="/our-work/diseases-and-conditions/covid-19-novel-coronavirus" class="menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished" data-is-top-level="1" title="">COVID-19</a></li><li><span class="current-breadcrumb">Current cases</span></li></ul>          </div>
        
        
        
          <div class="region region-content">
    <section id="block-system-main" class="block block-system clearfix">

      
  <div class="bootstrap-threecol-stacked" >
  
      <div class="row"> <!-- @TODO: Add extra classes -->
      <div class='panel-panel left col-xs-12 col-md-3 col-lg-3'><div class="panel-pane pane-block pane-menu-block-1 odd pane-top-link" >
  
        <span class="top-link"><a href="/our-work/diseases-and-conditions/covid-19-novel-coronavirus" class="menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished active-trail" data-is-top-level="1">COVID-19</a></span>
    
  
  <div class="pane-content">
        <div class="menu-block-wrapper menu-block-1 menu-name-main-menu parent-mlid-1445 menu-level-2">
  <ul class="menu nav"><li class="first collapsed menu-mlid-10010 health-advice depth-4 section-overview  same-level-as-node"><a href="/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-novel-coronavirus-health-advice-general-public" class="menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished">Health advice</a></li>
<li class="collapsed menu-mlid-10019 information-for-specific-audiences depth-4 same-level-as-node"><a href="/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-novel-coronavirus-information-specific-audiences" class="menu-node-unpublished">Information for specific audiences</a></li>
<li class="collapsed menu-mlid-10037 other-languages depth-4 same-level-as-node"><a href="/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-information-other-languages" class="menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished">Other languages</a></li>
<li class="collapsed menu-mlid-10015 resources depth-4 same-level-as-node"><a href="/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-novel-coronavirus-resources" class="menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished">Resources</a></li>
<li class="leaf menu-mlid-10004 news-and-media depth-4 section-overview hide-children same-level-as-node"><a href="/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-novel-coronavirus-news-and-media-updates" class="menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished">News and media</a></li>
<li class="last leaf active-trail active menu-mlid-10062 active current-cases depth-4 same-level-as-node"><a href="/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases" class="menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished menu-node-unpublished active-trail active">Current cases</a></li>
</ul></div>
  </div>

  
  </div>
</div>      <div class='panel-panel middle col-xs-12 col-md-9 col-lg-9'><div class="panel-pane pane-page-title even" >
  
      
  
  <div class="pane-content">
    <span id="skip-content" tabindex="-1"></span>    <h1>COVID-19 - current cases</h1>
  </div>

  
  </div>
<div class="panel-pane pane-node-content odd" >
  
      
  
  <div class="pane-content">
        <article id="node-10813" class="node node-page view-mode-full clearfix" about="/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases" typeof="sioc:Item foaf:Document">
    <header>
            <span property="dc:title" content="COVID-19 - current cases" class="rdf-meta element-hidden"></span>      </header>
    <div class="field field-name-field-intro-text field-type-text-long field-label-hidden"><div class="field-items"><div class="field-item even"><p class="intro-text">Information about current cases of COVID-19 in New Zealand.</p></div></div></div><div class="field field-name-body field-type-text-with-summary field-label-hidden"><div class="field-items"><div class="field-item even" property="content:encoded"><p>We&#39;ll be updating this page as new information is available.</p>

<p class="georgia-italic">Last updated 5:20&nbsp;pm, 22 March 2020.</p>

<table class="table-style-two">
	<colgroup>
		<col />
		<col />
		<col />
		<col />
		<col />
	</colgroup>
	<thead>
		<tr>
			<th scope="col">Case</th>
			<th scope="col">Location</th>
			<th scope="col">Age</th>
			<th scope="col">Gender</th>
			<th scope="col">Travel details</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>66</td>
			<td>Auckland</td>
			<td>50s</td>
			<td>F</td>
			<td>Dubai to Auckland on 15 March - flight EK448</td>
		</tr>
		<tr>
			<td>65</td>
			<td>Northland</td>
			<td>40s</td>
			<td>F</td>
			<td>Melbourne to Auckland on Sunday 15 March &ndash; flight JQ217</td>
		</tr>
		<tr>
			<td>64</td>
			<td>Canterbury</td>
			<td>50s</td>
			<td>F</td>
			<td>San Francisco to Auckland on Monday 16 March &ndash; flight NZ7<br />
			Auckland to Christchurch on Tuesday 17 March &ndash; flight NZ523&nbsp;</td>
		</tr>
		<tr>
			<td>63</td>
			<td>Taranaki</td>
			<td>20s</td>
			<td>M</td>
			<td>Dubai to Auckland on Tuesday 17 March &ndash; flight EK448<br />
			Auckland to New Plymouth on 18 March &ndash; flight NZ8041</td>
		</tr>
		<tr>
			<td>62</td>
			<td>Taranaki</td>
			<td>50s</td>
			<td>M</td>
			<td>Bangkok to Auckland on Sunday 15 March &ndash; flight TG0491<br />
			Auckland to New Plymouth on 16 March &ndash; flight NZ8041</td>
		</tr>
		<tr>
			<td>61</td>
			<td>Auckland</td>
			<td>40s</td>
			<td>F</td>
			<td><span style="font-size:10.0pt"><span style="line-height:107%"><span style="font-family:&quot;Arial&quot;,sans-serif"><span style="color:#002639">Travel to Africa &ndash; details to come</span></span></span></span></td>
		</tr>
		<tr>
			<td>60</td>
			<td>Auckland</td>
			<td>20s</td>
			<td>M</td>
			<td><span style="font-size:10.0pt"><span style="line-height:107%"><span style="font-family:&quot;Arial&quot;,sans-serif"><span style="color:#002639">Dubai to Auckland on Monday 16 March &ndash; flight EK448</span></span></span></span></td>
		</tr>
		<tr>
			<td>59</td>
			<td>Auckland</td>
			<td>60s</td>
			<td>F</td>
			<td>No international travel history &ndash; exposed at World Herefords Conference in Queenstown.</td>
		</tr>
		<tr>
			<td>58</td>
			<td>Auckland</td>
			<td>60s</td>
			<td>M</td>
			<td>No international travel history &ndash; exposed at World Herefords Conference in Queenstown. Domestic travel history:<br />
			Dunedin to Auckland on Sunday 15 March &ndash; flight NZ674</td>
		</tr>
		<tr>
			<td>57</td>
			<td>Hamilton</td>
			<td>60s</td>
			<td>F</td>
			<td>Travel history to Ireland, Dubai and Australia. Details to come.</td>
		</tr>
		<tr>
			<td>56</td>
			<td>Bay of Plenty</td>
			<td>30s</td>
			<td>M</td>
			<td>Travel history to the United States of America &ndash; details to come.</td>
		</tr>
		<tr>
			<td>55</td>
			<td>Waikato</td>
			<td>60s</td>
			<td>M</td>
			<td>Honolulu to Auckland on 14 March &ndash; flight HA445 (arrived 15 March)</td>
		</tr>
		<tr>
			<td>54</td>
			<td>Waikato</td>
			<td>40s</td>
			<td>F</td>
			<td><span style="font-size:10.0pt"><span style="line-height:107%"><span style="font-family:&quot;Arial&quot;,sans-serif"><span style="color:#002639">Contact with a confirmed case</span></span></span></span></td>
		</tr>
		<tr>
			<td>53</td>
			<td>Dunedin</td>
			<td>40s</td>
			<td>M</td>
			<td>LA to Auckland on 14 March &ndash; flight NZ1<br />
			Auckland to Queenstown on 14 March &ndash; flight NZ615</td>
		</tr>
		<tr>
			<td>52</td>
			<td>Auckland</td>
			<td>50s</td>
			<td>F</td>
			<td>Contact with probable case.</td>
		</tr>
		<tr>
			<td>51</td>
			<td>Nelson</td>
			<td>20s</td>
			<td>F</td>
			<td>Travel related, however international flights outside of infectious period.&nbsp;<br />
			Domestic flights: Auckland to Nelson on 16 March &ndash; flight 5065</td>
		</tr>
		<tr>
			<td>50</td>
			<td>Nelson</td>
			<td>60s</td>
			<td>F</td>
			<td>Contact with traveller. Further investigations continue.</td>
		</tr>
		<tr>
			<td>49</td>
			<td>Manawatu</td>
			<td>20s</td>
			<td>F</td>
			<td>Doha to Auckland on 14 March &ndash; flight QR0920<br />
			Auckland to Palmerston North on 16 March &ndash; flight NZ5107</td>
		</tr>
		<tr>
			<td>48</td>
			<td>Manawatu</td>
			<td>40s</td>
			<td>M</td>
			<td>Queenstown to Christchurch on 13 March &ndash; flight NZ642<br />
			Christchurch to Palmerston North on 13 March &ndash; flight NZ5181</td>
		</tr>
		<tr>
			<td>47</td>
			<td>Taupo</td>
			<td>50s</td>
			<td>M</td>
			<td>Dubai to Auckland on 10 March &ndash; flight EK0448</td>
		</tr>
		<tr>
			<td>46</td>
			<td>Auckland</td>
			<td>70s</td>
			<td>M</td>
			<td>Under investigation. Took internal flight when symptomatic. Dunedin to Auckland on 16 March &ndash; flight NZ674</td>
		</tr>
		<tr>
			<td>45</td>
			<td>Wellington</td>
			<td>30s</td>
			<td>F</td>
			<td>Dubai to Auckland on 12 March &ndash; flight EK44<br />
			Auckland to Wellington on 12 March &ndash; flight NZ433</td>
		</tr>
		<tr>
			<td>44</td>
			<td>Wellington</td>
			<td>50s</td>
			<td>M</td>
			<td>Travel related, however international flights outside of infectious period.&nbsp;<br />
			Domestic flights:<br />
			Auckland to Wellington on 8 March &ndash; flight NZ449<br />
			Wellington to Hamilton on 12 March &ndash; flight NZ5810<br />
			Hamilton to Wellington on 13 March &ndash; flight NZ5823.</td>
		</tr>
		<tr>
			<td>43</td>
			<td>Wellington</td>
			<td>50s</td>
			<td>M</td>
			<td>Sydney to Wellington on 14 March &ndash; flight QF161.</td>
		</tr>
		<tr>
			<td>42</td>
			<td>Waikato</td>
			<td>60s</td>
			<td>F</td>
			<td>Singapore to Auckland on 13 March &ndash; flight SQ0285.</td>
		</tr>
		<tr>
			<td>41</td>
			<td>Auckland</td>
			<td>60s</td>
			<td>M</td>
			<td>Cruise ship travel. Domestic flights &ndash; Dunedin to Auckland on 15 March &ndash; flight NZ670.</td>
		</tr>
		<tr>
			<td>40</td>
			<td>Wellington&nbsp;</td>
			<td>50s</td>
			<td>M</td>
			<td>Travel related, however flights outside of infectious period.&nbsp;</td>
		</tr>
		<tr>
			<td>39</td>
			<td>Otago</td>
			<td>20s</td>
			<td>Male</td>
			<td>LA to Auckland on&nbsp; Wednesday 18 March &ndash; flight NZ554 Auckland to Queenstown on Wednesday 18 March &ndash; flight NZ615</td>
		</tr>
		<tr>
			<td>38</td>
			<td>Wairarapa</td>
			<td>30s</td>
			<td>Male</td>
			<td>Under investigation.</td>
		</tr>
		<tr>
			<td>37</td>
			<td>Auckland</td>
			<td>40s</td>
			<td>Female</td>
			<td>London to Doha to Auckland (on Sunday 15 March) - flight details to come.</td>
		</tr>
		<tr>
			<td>36</td>
			<td>Auckland</td>
			<td>40s</td>
			<td>Male</td>
			<td>Los Angeles to Auckland - flight details to come.</td>
		</tr>
		<tr>
			<td>35</td>
			<td>Auckland</td>
			<td>30s</td>
			<td>Female</td>
			<td>Los Angeles to Auckland - flight details to come.</td>
		</tr>
		<tr>
			<td>34</td>
			<td>Waikato</td>
			<td>60s</td>
			<td>Female</td>
			<td>Dubai to Auckland on Monday 16 March &ndash; flight EK0450</td>
		</tr>
		<tr>
			<td>33</td>
			<td>Waikato</td>
			<td>70s</td>
			<td>Female</td>
			<td>Dubai to Auckland on Monday 16 March &ndash; flight EK0450</td>
		</tr>
		<tr>
			<td>32</td>
			<td>Hawkes Bay</td>
			<td>30s</td>
			<td>Male</td>
			<td>Doha to Auckland on Monday 16 March &ndash; flight QR920 Auckland to Napier on Tuesday 17 March &ndash; flight NZ5021</td>
		</tr>
		<tr>
			<td>31</td>
			<td>Wellington</td>
			<td>40s</td>
			<td>Male</td>
			<td>Melbourne to Wellington on Saturday 14 March &ndash; flight SQ247</td>
		</tr>
		<tr>
			<td>30</td>
			<td>Canterbury</td>
			<td>50s</td>
			<td>Male</td>
			<td>Los Angeles to Auckland on Saturday 14 March &ndash; flight AA83<br />
			Auckland to Christchurch on Sunday 15 March &ndash; flight and NZ535</td>
		</tr>
		<tr>
			<td>29</td>
			<td>Auckland</td>
			<td>40s</td>
			<td>Male</td>
			<td>Singapore to Auckland on 11 March</td>
		</tr>
		<tr>
			<td>28</td>
			<td>Southern DHB</td>
			<td>60s</td>
			<td>Male</td>
			<td>Sydney to Christchurch on Friday 13 March &ndash; flight EK402</td>
		</tr>
		<tr>
			<td>27</td>
			<td>Southern DHB</td>
			<td>&nbsp;30s</td>
			<td>Female</td>
			<td>London to Auckland on&nbsp; Tuesday 17 March &ndash; flight NZ1<br />
			Auckland to Christchurch on Tuesday 17 March &ndash; flight NZ525 Christchurch to Dunedin on Tuesday 17 March &ndash; flight NZ5749</td>
		</tr>
		<tr>
			<td>26</td>
			<td>Auckland</td>
			<td>&nbsp;40s</td>
			<td>Male</td>
			<td>Melbourne to Auckland on Sunday 15 March &ndash; flight QF153</td>
		</tr>
		<tr>
			<td>25</td>
			<td>Auckland</td>
			<td>60s</td>
			<td>Male</td>
			<td>Los Angeles to Auckland on Friday 13 March &ndash; flight NZ05</td>
		</tr>
		<tr>
			<td>24</td>
			<td>Rotorua</td>
			<td>&nbsp;50s</td>
			<td>Male</td>
			<td>Singapore to Auckland on Friday 13 March - flight SQ285</td>
		</tr>
		<tr>
			<td>23</td>
			<td>Northland</td>
			<td>20s</td>
			<td>Male</td>
			<td>Sydney to Auckland on Monday 16 March &ndash; flight VA0141</td>
		</tr>
		<tr>
			<td>22</td>
			<td>Taranaki</td>
			<td>40s</td>
			<td>Male</td>
			<td>Cairo to Frankfurt (Lufthansa LH581 on Saturday 7 March) to Vancouver to Auckland on Sunday 15 March &ndash; flight NZ23 Auckland to New Plymouth on Sunday 15 March &ndash; flight NZ8035</td>
		</tr>
		<tr>
			<td>21</td>
			<td>Taranaki</td>
			<td>40s</td>
			<td>Female</td>
			<td>Dubai to Auckland on Monday 9 March - flight EK448 Auckland to New Plymouth on Monday 9 March - flight NZ8041</td>
		</tr>
		<tr>
			<td>20</td>
			<td>Waikato</td>
			<td>70s</td>
			<td>Male</td>
			<td>Singapore to Auckland on Sunday 15 March &ndash; flight SQ285</td>
		</tr>
		<tr>
			<td>19</td>
			<td>Waikato</td>
			<td>20s</td>
			<td>Female</td>
			<td>Sydney to Auckland on Sunday 8 March &ndash; flight NZ112</td>
		</tr>
		<tr>
			<td>18</td>
			<td>Canterbury</td>
			<td>40s</td>
			<td>Female</td>
			<td>Singapore to Christchurch on Monday 16 March &ndash; flight SQ297</td>
		</tr>
		<tr>
			<td>17</td>
			<td>Invercargill</td>
			<td>40s</td>
			<td>Male</td>
			<td>Not infectious on flight</td>
		</tr>
		<tr>
			<td>16</td>
			<td>Auckland</td>
			<td>60s</td>
			<td>Male</td>
			<td>Travelling from Canada (on Thursday 12 March) - flight details to come.</td>
		</tr>
		<tr>
			<td>15</td>
			<td>Auckland</td>
			<td>60s</td>
			<td>Male</td>
			<td>San Francisco to Auckland on Friday 13 March &ndash; flight NZ7</td>
		</tr>
		<tr>
			<td>14</td>
			<td>Auckland</td>
			<td>40s</td>
			<td>Female</td>
			<td>Not infectious on flight</td>
		</tr>
		<tr>
			<td>13</td>
			<td>Auckland</td>
			<td>50s</td>
			<td>Male</td>
			<td>Dubai to Auckland on 14 March &ndash; flight EK448</td>
		</tr>
		<tr>
			<td>12</td>
			<td>Dunedin</td>
			<td>Teens</td>
			<td>Male</td>
			<td>Associated with travel of case 11.</td>
		</tr>
		<tr>
			<td>11</td>
			<td>Dunedin</td>
			<td>40s</td>
			<td>Male</td>
			<td>Singapore to Auckland on Saturday 7 March - flight NZ283 Auckland to Dunedin on Sunday 8 March - flight NZ675</td>
		</tr>
		<tr>
			<td>10</td>
			<td>Wellington</td>
			<td>70s</td>
			<td>Male</td>
			<td>Los Angeles to Auckland on 14 March &ndash; flight AA83<br />
			Auckland to Wellington on 14 March &ndash; flight NZ419</td>
		</tr>
		<tr>
			<td>9</td>
			<td>Wellington</td>
			<td>30s</td>
			<td>Male</td>
			<td>Los Angeles to Auckland on 14 March &ndash; flight AA83<br />
			Auckland to Wellington on 14 March &ndash; flight NZ419</td>
		</tr>
		<tr>
			<td>8</td>
			<td>Wellington</td>
			<td>60s</td>
			<td>Male</td>
			<td>Brisbane to Wellington on Saturday 14 March &ndash; flight NZ828 &nbsp;</td>
		</tr>
		<tr>
			<td>7</td>
			<td>Dunedin</td>
			<td>30s</td>
			<td>Female</td>
			<td>Denmark to Doha to Auckland on Tuesday 10 March - flight QR920) Auckland to Christchurch on Tuesday 10 March - flight JQ225</td>
		</tr>
		<tr>
			<td>6</td>
			<td>Auckland</td>
			<td>60s</td>
			<td>Male</td>
			<td>Houston to Auckland on Friday 6 March &ndash; flight NZ029 &nbsp;</td>
		</tr>
		<tr>
			<td>5</td>
			<td>Auckland</td>
			<td>40s</td>
			<td>Female</td>
			<td>Associated with travel - Doha to Auckland on Sunday 23 February &ndash; flight QR0920 &nbsp;</td>
		</tr>
		<tr>
			<td>4</td>
			<td>Auckland</td>
			<td>40s</td>
			<td>Male</td>
			<td>Singapore to Auckland on Tuesday 25 February &ndash; flight NZ283 &nbsp;</td>
		</tr>
		<tr>
			<td>3</td>
			<td>Auckland</td>
			<td>40s</td>
			<td>Male</td>
			<td>Associated with travel - Doha to Auckland on Sunday 23 February &ndash; flight QR0920 &nbsp;</td>
		</tr>
		<tr>
			<td>2</td>
			<td>Auckland</td>
			<td>30s</td>
			<td>Female</td>
			<td>Singapore to Auckland on Tuesday 25 February - flight NZ283 &nbsp;</td>
		</tr>
		<tr>
			<td>1</td>
			<td>Auckland</td>
			<td>60s</td>
			<td>&nbsp;</td>
			<td>Iran to Bali to Auckland on Wednesday 26 February &ndash; flight EK450&nbsp;</td>
		</tr>
	</tbody>
</table>
</div></div></div>    </article>
  </div>

  
  </div>
<div class="panel-pane pane-node-links even" >
  
      
  
  <div class="pane-content">
          </div>

  
  </div>
</div>          </div>
  
  </div>

</section>
  </div>
      </section>

      
    </div>
    <div id="content-footer-wrapper" class="clearfix">
      <div id="content-footer" class="clearfix">
                  <p class="page_updated">Page last updated: <span class="date">22 March 2020</span></p>                  <div class="region region-content-footer">
    <section id="block-moh-tools-page-tools" class="block block-moh-tools clearfix">
  <a href="#"
        data-placement="top"
        data-title="Share this content."
        data-html="true"
        data-content="<p>Share this page on some of the most popular social networking and content sites on the internet.</p><div class='service-links'><ul><li><a href='https://twitter.com/share?url=https%3A//www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases&amp;text=COVID-19%20-%20current%20cases' title='Share this on Twitter' class='service-links-twitter' rel='nofollow'><img typeof='foaf:Image' class='img-responsive' src='https://www.health.govt.nz/sites/all/modules/contrib/service_links/images/twitter.png' alt='Twitter' /> Twitter</a></li>
<li><a href='https://www.facebook.com/sharer.php?u=https%3A//www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases&amp;t=COVID-19%20-%20current%20cases' title='Share on Facebook' class='service-links-facebook' rel='nofollow'><img typeof='foaf:Image' class='img-responsive' src='https://www.health.govt.nz/sites/all/modules/contrib/service_links/images/facebook.png' alt='Facebook' /> Facebook</a></li>
</ul></div>" class="share-this-content"><i class="fa fa-share"></i> Share</a><a href="#" title="print this page" class="print"><i class="fa fa-print"></i> Print</a><a href="https://www.health.govt.nz/forward?path=node/10813" title="Email this page" class="email"><i class="fa fa-envelope"></i> Email</a><a href="/feedback?ref=https%3A//www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases" title="Feedback" class="rss"><i class="fa fa-comment"></i> Feedback</a></section>

  </div>
      </div>
    </div>

  </div>
  <footer class="footer container">
    <h2 class='hidden'>Site Footer</h2>
    <div class="footer-default">
      <div class="row">
        <div class="col-sm-6 col-md-6">
          <div class="field field-name-field-tax-first-column-links">
            <ul class="field-items"><li class="field-item"><a
                href="https://www.health.govt.nz/node/492"
                class=""
                >About this site</a
              ></li><li class="field-item"><a
                href="https://www.health.govt.nz/node/524"
                class=""
                >Contact us</a
              ></li><li class="field-item"><a
                href="https://www.health.govt.nz/node/488"
                class=""
                >Other Ministry of Health websites</a
              ></li><li class="field-item"><a
                href="https://www.health.govt.nz/node/7497"
                class=""
                >Official Information Act requests</a
              ></li><li class="field-item"><a
                href="https://www.health.govt.nz/about-ministry/information-releases"
                class=""
                >Information releases</a
              ></li><li class="field-item"><a
                href="https://consult.health.govt.nz/"
                class=""
                >Consultations</a
              ></li></ul>
          </div>
        </div>
        <div class="col-sm-6 col-md-6">
          <div class="field field-name-field-tax-footer-body field-type-text-long field-label-hidden"><div class="field-items"><div class="field-item even"><h3>Where to go for help</h3>

<table>
	<tbody>
		<tr>
			<th scope="row">Emergencies</th>
			<td><strong>Dial <a href="tel:111">111</a></strong> (for ambulance, fire or police)</td>
		</tr>
		<tr>
			<th scope="row">Healthline</th>
			<td><strong>Dial <a href="tel:0800611116">0800 611 116</a></strong></td>
		</tr>
		<tr>
			<th scope="row">Poisons</th>
			<td><strong>Dial <a href="tel:0800764766">0800 POISON</a> </strong>(<a href="tel:0800764766">0800 764 766</a>)</td>
		</tr>
		<tr>
			<th scope="row">Mental health crisis</th>
			<td><strong><a href="/your-health/services-and-support/health-care-services/mental-health-services/crisis-assessment-teams">Emergency contact numbers</a></strong></td>
		</tr>
	</tbody>
</table>
</div></div></div>        </div>
      </div>
      <div class="row">
        <div class="sub-footer">
          <div class="column col-sm-12 col-md-3">
            <a href="https://www.govt.nz/">
              <img src="/sites/all/themes/mohpub_bootstrap/images/nzgovtlogo_white.png"
                   width="152" height="16"
                   alt="govt.nz - connecting you to New Zealand central &amp; local government services"
                   title="govt.nz - connecting you to New Zealand central &amp; local government services" />
            </a>
          </div>
          <div class="column col-sm-12 col-md-9">
          <span class="bottom-menu-moh with-v-divider">&copy; Ministry of Health – Manatū Hauora</span><ul class="bottom-menu-list"><li class="bottom-menu-list-item with-v-divider"><a href="https://www.health.govt.nz/sitemap"class="">Site map</a></li><li class="bottom-menu-list-item with-v-divider"><a href="https://www.health.govt.nz/about-site/privacy-and-security"class="">Privacy & security</a></li><li class="bottom-menu-list-item with-v-divider"><a href="https://www.health.govt.nz/about-site/copyright"class="">Copyright</a></li></ul>          </div>
        </div>
      </div>
    </div>
    <div class="footer-print">&copy; Ministry of Health – Manatū Hauora</div>
  </footer>
  <a class="scrollToTop">Back to top <i class="fa fa-arrow-up"></i></a>
</div>
  <script src="https://www.health.govt.nz/sites/default/files/js/js_akZOsKtodu3PdnQzY3_ElOfujkLxJcowmaWgHTBBLOE.js"></script>
</body>
</html>
`;
  const $ = await cheerio.load(html);

  const lastUpdated = $(".page_updated .date").text();

  let cases = [];
  $(".table-style-two tbody tr").each((i, elem) => {
    cases.push({
      caseId: $(elem)
        .find("td:nth-child(1)")
        .text()
        .trim(),
      location: $(elem)
        .find("td:nth-child(2)")
        .text()
        .trim(),
      age: $(elem)
        .find("td:nth-child(3)")
        .text()
        .trim(),
      gender: $(elem)
        .find("td:nth-child(4)")
        .text()
        .trim(),
      details: $(elem)
        .find("td:nth-child(5)")
        .text()
        .trim()
    });
  });

  let data = [];
  let totalCases = 0;
  cases.forEach(item => {
    totalCases++;

    // correct typos on MOH site
    if (item.location === "Coramandel") {
      item.location = "Coromandel";
    }
    if (item.location === "Dundedin") {
      item.location = "Dunedin";
    }

    // normalize genders
    if (item.gender === "M") {
      item.gender = "Male";
    }
    if (item.gender === "F") {
      item.gender = "Female";
    }

    const n = data.find(x => item.location === x.location);
    if (n) {
      n.numCases++;
      n.cases.push(item);
    } else {
      const loc = locations.find(x => item.location === x.location);
      if (loc) {
        data.push({
          location: item.location,
          numCases: 1,
          latlng: loc.latlng,
          cases: [item]
        });
      } else {
        // region doesn't exist in constants
        throw new Error(`No region ${item.location} exist`);
      }
    }
  });

  data.sort((a, b) => {
    if (a.numCases === b.numCases) {
      return a.location > b.location ? 1 : -1;
    }
    return a.numCases > b.numCases ? -1 : 1;
  });

  return {
    props: {
      data,
      lastUpdated,
      totalCases
    }
  };
}

const Wrap = styled.div`
  ${({ theme }) => css`
    @media (min-width: ${theme.sm}) {
      display: flex;
    }
  `}
`;

const Main = styled.div`
  flex: 1;
`;

const Info = styled.div`
  ${({ theme }) => css`
    color: ${theme.dark};
    box-sizing: border-box;
    padding: 20px;
    background: ${theme.light};
    @media (min-width: ${theme.sm}) {
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      height: 100vh;
      width: 375px;
    }
    a {
      color: ${theme.dark};
    }
  `}
`;

const Summary = styled.div`
  ${({ theme }) => css`
    .logo {
      width: 40px;
      @media (min-width: ${theme.md}) {
        width: 73px;
      }
    }
    h1 {
      font-size: 30px;
      color: ${theme.teal};
      margin: 0;
      @media (min-width: ${theme.md}) {
        font-size: 42px;
      }
    }
    h2 {
      font-size: 18px;
      color: ${theme.teal};
      margin: 0 0 1em;
      line-height: 1.1;
      @media (min-width: ${theme.md}) {
        font-size: 23px;
      }
    }
    h2.split {
      display: flex;
      justify-content: space-between;
    }
    .meta {
      margin: 1.5em 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }
    td,
    th {
      font-size: 24px;
      text-align: left;
      padding: 7px 15px;
      &:last-child {
        text-align: right;
      }
    }
    th {
      background: ${theme.green};
      color: white;
    }
    td {
      background: white;
      border-top: solid ${theme.light} 4px;
    }
  `}
`;

const Location = styled.button`
  ${({ theme }) => css`
    text-decoration: underline;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    background: white;
    padding: 7px 15px;
    margin-top: 4px;
    border: none;
    width: 100%;
    transition: 0.3s ease;
    color: ${theme.dark};
    @media (min-width: ${theme.md}) {
      font-size: 24px;
    }
    :hover {
      background: #bee1dd;
    }
  `}
`;

const Details = styled.div``;

const Bar = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    background: ${theme.green};
    color: white;
    padding: 7px 15px;
    @media (min-width: ${theme.md}) {
      font-size: 24px;
    }
  `}
`;

const Case = styled.div`
  ${({ theme }) => css`
    font-size: 14px;
    margin-top: 4px;
    h3 {
      margin: 0;
      font-size: 14px;
      color: white;
      background: ${theme.teal};
      padding: 2px 15px;
    }
    .age {
      color: ${theme.teal};
    }
    .details {
      background: white;
      padding: 10px 15px;
    }
  `}
`;

const BackButton = styled.button`
  ${({ theme }) => css`
    background: none;
    border: none;
    color: ${theme.dark};
    margin-bottom: 1.5em;
    padding: 0;
    font-size: 14px;
  `}
`;

const Alert = styled.a`
  padding: 5px 20px;
  color: white !important;
  font-size: 24px;
  background: #ffcd38 url(/alert.svg) 174px 50% no-repeat;
  margin: -20px -20px 20px;
  display: block;
`;

const LinkButton = styled.button`
  ${({ theme }) => css`
    border: none;
    background: none;
    display: inline;
    padding: 0;
    text-decoration: underline;
    color: ${theme.dark};
  `}
`;
