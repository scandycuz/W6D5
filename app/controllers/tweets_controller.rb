class TweetsController < ApplicationController
  before_action :require_logged_in!

  def create
    # simulate latency
    sleep(1)

    @tweet = current_user.tweets.build(tweet_params)

    respond_to do |format|
      format.html { render :tweet }
      format.json { render :show }
    end
  end

  private
  def tweet_params
    params.require(:tweet).permit(:content, mentioned_user_ids: [])
  end
end
