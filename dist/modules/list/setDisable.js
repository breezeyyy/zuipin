"use strict";define(["cd"],function(l){return function(e){var n=e.pageIndex,i=e.nav;l(e),0===n?i[0].previousElementSibling.className+=" disable":n===i.length-1?i[i.length-1].nextElementSibling.className+=" disable":l(e)}});