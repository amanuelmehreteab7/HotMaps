
var sidePanel = $('#twitter');
var wrap2 = $('#wrap2')

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




//
//
// restoreCat = () => {
//   // wrap2.update()
//
//   if ($('#wrap2').hasClass("open"))
//   {
//     console.log("catpop");
//     return true;
//   }
//   else
//   {
//     $('#cat').show();
//     $('#searchBtn').show();
//     sidePanel.empty();
//     console.log("no1");
//   }
// }
//
// moveTwitter = () => {
//   if ($('.table').hasClass("open"))
//   {
//     sidePanel.animate({left: "800px"});
//     console.log("tutut");
//   }
//   else {
//     {
//       console.log("no2");
//       return true;
//
//     }
//   }
// }
