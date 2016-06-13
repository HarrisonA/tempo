class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  protected

  def current_user
    token = request.headers['X-CSRF-Token']
    user = User.find_by(auth_token: token)
  end

  private

  def authorize_user
    unless current_user
      head 401
    end
  end
end
