
var sidePanel = $('#twitter');

updateTwitterTimeline = profile => {

  if (profile == undefined)
  {
    return true;
    console.log(profile);
  }
  else
  {
    sidePanel.empty();
    $('#cat').hide();
    $('#searchBtn').hide();


    var tTag= $('<a>');

    tTag.attr('href', `https://twitter.com/${profile}`);
    tTag.attr('class', 'twitter-timeline');
    tTag.attr('data-width', 'auto');
    tTag.attr('data-height', '460');
    tTag.attr('data-theme', 'dark');

    sidePanel.append(tTag);

    twttr.widgets.load();
  }
}

restoreCat = () => {
  if ($('#wrapper').hasClass("open") == true)
  {
    return true;
  }
  else
  {
    $('#cat').show();
    $('#searchBtn').show();
    sidePanel.empty();
  }
}
