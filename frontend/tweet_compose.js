class TweetCompose {
  constructor(form) {
    this.$form = form;
    $(form).on("submit", this.submit.bind(this));
  }

  submit(event) {
    event.preventDefault();
    const formData = $(event.currentTarget).serializeJSON();

    //disabling inputs
    const $inputs = $(":input");
    $inputs.each( el => $(el).prop("disabled", true));

    $.ajax({
      url: "/tweets",
      dataType: "JSON",
      method: "POST",
      data: formData,
      success: (data) => {
        this.handleSuccess($inputs, data);
      }
    });
  }

  clearInput(inputs) {
    inputs.each( el => $(el).val("") );
  }

  handleSuccess(inputs, data) {
    const $inputs = inputs;
    $inputs.each( el => $(el).prop("disabled", false));
    this.clearInput($inputs);
    const tweetFeed = $('#feed');
    let tweet = $(`<li>${data.content}</li>`);
    tweetFeed.append(tweet);
  }


}


module.exports = TweetCompose;
