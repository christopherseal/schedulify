class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    users = User.where.not(id: current_user.id)
    render json: users.select(:id, :email), status: :ok
  end
end
