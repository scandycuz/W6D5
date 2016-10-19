class UsersSearch {
  constructor(el) {
    this.$el = el;
    this.$input = $('#users-search-input');
    this.$ul = $('.users');
    this.$input.on("input", this.handleInput.bind(this));
  }

  handleInput(event) {
    console.log(this);
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
    this.$ul.empty();
    users.forEach( (user) => {
      let $listItem = (
        `<li><a href=\"/users/${user.id}\">${user.username}</a></li>`
      );
      this.$ul.append($listItem);
    });
  }
}

module.exports = UsersSearch;
