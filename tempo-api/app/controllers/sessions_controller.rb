class SessionsController < ApplicationController
  def create
    user = User.find_by_email(params[:email])

    if user.try(:authenticate, params[:password])
      render json: { user_id: user.id, auth_token: user.auth_token }
    else
      head 401
    end
  end
end
