const FollowToggle = require("./follow_toggle");
const UsersSearch = require("./users_search");

$( () => {
  $(".follow-toggle").each( function(index, button) {
    new FollowToggle(button);
  });

  $(".users-search").each( function(index, nav) {
    new UsersSearch(nav);
  });

  $("li").each( function(index, button) {
    new FollowToggle(button, {});
  });
});
