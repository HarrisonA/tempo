class UsersController < ApplicationController
  respond_to :json

  before_action :set_user, only: :show

  def index
    @users = User.all

    render json: @users
  end

  def show
    render json: @user
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require[:user].permit(:email, :password)
  end
end
