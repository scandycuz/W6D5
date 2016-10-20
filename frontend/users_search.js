const FollowToggle = require('./follow_toggle');

class UsersSearch {
  constructor(el) {
    this.$el = el;
    this.$input = $('#users-search-input');
    this.$ul = $('.users');
    this.$input.on("input", this.handleInput.bind(this));
  }

  handleInput(event) {
    if (this.$input.val() === "") {
      this.renderResults([]);
      return;
    }

    $.ajax({
      url: '/users/search',
      dataType: 'JSON',
      method: 'GET',
      data: { query: this.$input.val() },
      success: this.renderResults.bind(this)
    });
  }

  renderResults(users) {
    console.log(users);
    this.$ul.empty();
    users.forEach( (user) => {
      let $listItem = (
        `<li>
          <a href=\"/users/${user.id}\">${user.username}</a>
        </li>`
      );
      let $buttonItem = $(`<button></button>`);
      new FollowToggle($buttonItem, {
        userId: user.id,
        followState: user.followed ? "followed" : "unfollowed"
      });
      this.$ul.append($listItem);
      this.$ul.append($buttonItem);
    });
  }
}

module.exports = UsersSearch;
