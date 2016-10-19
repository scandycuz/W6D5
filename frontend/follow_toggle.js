class FollowToggle {
  constructor(el, options) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id") || options.userId;
    this.followState = this.$el.data("initial-follow-state") ||
                        options.followState;
    this.render();

    $(el).on("click", this.handleClick.bind(this));
  }

  render() {
    switch (this.followState) {
      case "unfollowed":
        this.$el.prop("disabled", false);
        this.$el.html("Follow");
        break;
      case "followed":
        this.$el.prop("disabled", false);
        this.$el.html("Unfollow");
        break;
      case "following":
        this.$el.prop("disabled", true);
        this.$el.html("following");
        break;
      case "unfollowing":
        this.$el.prop("disabled", true);
        this.$el.html("unfollowing");
        break;
    }
  }

  handleClick(event) {
    const followToggle = this;
    event.preventDefault();

    if (this.followState === "unfollowed") {
      this.followState = "following";
      this.render();

      $.ajax({
        url: `/users/${this.userId}/follow`,
        dataType: "json",
        method: "POST",
        success() {
          followToggle.followState = "followed";
          followToggle.render();
        }
      });
    } else {
      this.followState = "unfollowing";
      this.render();

      $.ajax({
        url: `/users/${this.userId}/follow`,
        dataType: "json",
        method: "DELETE",
        success() {
          followToggle.followState = "unfollowed";
          followToggle.render();
        }
      });
    }
  }
}


module.exports = FollowToggle;
