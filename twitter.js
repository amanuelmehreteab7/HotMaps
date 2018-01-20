// <a class="twitter-timeline"
// href="https://twitter.com/TwitterDev"
// data-width="300"
// data-height="300">
// Tweets by @TwitterDev
// </a>

var sidePanel = $('#twitter');

updateTwitterTimeline = (profile) => {

  sidePanel.empty();
  var tTag= $('<a>');

  tTag.attr('href', `https://twitter.com/${profile}`)
  tTag.attr('class', 'twitter-timeline')
  tTag.attr('data-width', 'auto')
  tTag.attr('data-height', '500')
  tTag.attr('theme', 'light')

  sidePanel.append(tTag)

  twttr.widgets.load();
;


}
