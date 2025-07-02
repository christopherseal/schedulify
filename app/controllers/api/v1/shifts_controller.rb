class Api::V1::ShiftsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user

  def index
    unless @user == current_user
      return render json: { error: "Forbidden" }, status: :forbidden
    end

    start_date = parse_date(params[:start]) || Date.today.beginning_of_month
    end_date = parse_date(params[:end]) || Date.today.end_of_month

    shifts = @user.shifts.where(start_time: start_date.beginning_of_day..end_date.end_of_day)

    render json: shifts.as_json(only: [ :id, :title, :start_time, :end_time, :details ]), status: :ok
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "User not found" }, status: :not_found
  end

  def parse_date(date_string)
    Date.parse(date_string) if date_string.present?
  rescue ArgumentError
    nil
  end
end
