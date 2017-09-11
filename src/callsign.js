/**
 * @file Highlight amateur radio call signs in web pages with this JavaScript library
 * @version 0.1.0
 * @author Philip Eriksson <www.philiperiksson.se>
 * @see {@link https://github.com/Lominean/callsign.js|Repository at GitHub}
 */

/** @constant */
const ITU_PREFIX_TABLE = {
  AL: "ZA",
  AR: "AY-AZ,LO-LW",
  AT: "OE",
  AU: "AX,VH-VN,VZ",
  BR: "PP-PY,ZV-ZZ",
  CA: "CF-CK,CY-CZ,VA-VG,VO,VX-VY,XJ-XO",
  CH: "HB,HE",
  CN: "B,VR,XS,XX",
  DE: "DA-DR",
  DK: "OU-OZ,XP",
  EE: "ES",
  ES: "AM-AO,EA-EH",
  FI: "OF-OJ",
  FR: "F,HW-HY",
  GB: "G,M,VP-VQ,VS,ZB-ZJ,ZN-ZO,ZQ",
  GQ: "3C",
  HI: "4V",
  HU: "HA,HG",
  ID: "AT-AW,VT-VW",
  IL: "4X,4Z",
  IS: "TF",
  IT: "I",
  JP: "JA-JS",
  KR: "DS-DT,HL",
  MC: "3A",
  MU: "3B",
  NL: "PA-PI,PJ",
  NO: "LA-LN",
  PL: "HF,SN-SR,3Z",
  RO: "YO-YR",
  RU: "R,UA-UI",
  SE: "SA-SM,7S",
  SK: "OM",
  TH: "HS",
  UA: "EM-EO,UR-UZ",
  US: "AA-AL,K,N,W",
  YE: "7O",
  ZA: "ZR-ZU"
};

/** @constant */
const CALLSIGN_REGEX = /(\d?\D{1,3})\d\D{1,3}/;

/**
 * Converts an ISO 3166-1 alpha-2 code to a flag emoji.
 * @param {!string} code The ISO 3166-1 alpha-2 code
 * @returns {string}
 */
function flag(code) {
  'use strict';
  return String.fromCodePoint(...[...code].map(c => c.charCodeAt() + 127397));
}

/**
 * Checks if a character combination is inside a specified range.
 * @param {!string} value
 * @param {!string} range
 * @returns {boolean}
 */
function inRange(value, range) {
  'use strict';
  let split = range.split('-');

  if (split.length == 1 && split[0] == value)
    return true;

  if (value.length < split[0].length)
    return false;

  if (split[0] == split[1])
    return false;

  let newRange = split[0];
  let c = newRange.charCodeAt(0);
  switch (c) {
    case 90:
      newRange = 'A';
    default:
      newRange = String.fromCharCode(++c);
  }
  return inRange(value, newRange);
}

/**
 * Expand the letter intervals.
 */
function expand() {
  'use strict';
  //console.log(text);
}

function callsign() {
  'use strict';
  if (csettings == null)
    var csettings = {};
  if (csettings.debug == null)
    csettings.debug = true;
  if (csettings.zero == null)
    csettings.zero = true;

  if (window.console == null)
    csettings.debug = false;

  if (csettings.debug) {
    if (window.performance !== null) {
      performance.mark("cs-start");
    } else {
      console.error('Performance API n/a');
    }
  }

  // Go through all callsign elements and apply flag and strike through zero
  if (csettings.flag == null || csettings.flag == true) {
    let callsignElements = document.getElementsByTagName('callsign');
    for (let i = 0; i < callsignElements.length; i++) {
      if (csettings.debug)
        console.log("Found callsign:", callsignElements[i].innerHTML);
      for (let row in ITU_PREFIX_TABLE) {
        let prefix = CALLSIGN_REGEX.exec(callsignElements[i].innerHTML);
        if (inRange(prefix[1], ITU_PREFIX_TABLE[row])) {
          let flagElement = document.createElement('span');
          flagElement.setAttribute('class', 'callsign-flag');
          flagElement.setAttribute('title', row);
          flagElement.innerHTML = flag(row);
          callsignElements[i].parentNode.insertBefore(flagElement, callsignElements[i]);
        }
      }
      if (csettings.zero) {
        callsignElements[i].innerHTML = callsignElements[i].innerHTML.replace(/0/, '0\u0338');
      }
    }
  }

  if (csettings.debug) {
    if (window.performance != null) {
      performance.mark("cs-done");
      performance.measure("callsign", "cs-start", "cs-done");
      let measures = performance.getEntriesByName("callsign");
      let measure = measures[0];
      console.log('callsign.js exec took', measure.duration);
      performance.clearMarks();
      performance.clearMeasures();
    }
  }
}

callsign();
