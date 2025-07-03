class Api::V1::ShiftTradesController < ApplicationController
  before_action :authenticate_user!

  def index
    trades = ShiftTrade
      .includes(:shift_from, :from_user, :to_user)
      .where("from_user_id = ? OR to_user_id = ?", current_user.id, current_user.id)

    render json: trades.map { |trade|
      {
        id: trade.id,
        status: trade.status,
        from_user: {
          id: trade.from_user.id,
          email: trade.from_user.email
        },
        to_user: {
          id: trade.to_user.id,
          email: trade.to_user.email
        },
        shift_from: {
          id: trade.shift_from.id,
          title: trade.shift_from.title,
          start_time: trade.shift_from.start_time,
          end_time: trade.shift_from.end_time
        }
      }
    }
  end

  def create
    shift_from = Shift.find(params[:shift_from_id])
    shift_to = params[:shift_to_id].present? ? Shift.find(params[:shift_to_id]) : nil
    to_user = User.find(params[:to_user_id])

    unless shift_from.user == current_user
      return render json: { error: "You can only trade your own shift" }, status: :forbidden
    end

    if shift_to && !ShiftTradeService.valid_trade?(user: to_user, new_shift: shift_from, skip_shift: shift_to)
      return render json: { error: "Trade would break scheduling rules for recipient" }, status: :unprocessable_entity
    end

    trade = ShiftTrade.create!(
      shift_from: shift_from,
      shift_to: shift_to,
      from_user: current_user,
      to_user: to_user,
      status: "pending"
    )

    render json: trade, status: :created
  end

  def update
    trade = ShiftTrade.find(params[:id])

    unless trade.to_user_id == current_user.id
      return render json: { error: "Unauthorized" }, status: :unauthorized
    end

    status = params[:status]
    unless %w[accepted rejected].include?(status)
      return render json: { error: "Invalid status" }, status: :unprocessable_entity
    end

    trade.status = status

    if status == "accepted"
      trade.shift_from.update!(user_id: current_user.id)
    end

    if trade.save
      render json: { message: "Trade #{status}" }, status: :ok
    else
      render json: { error: "Failed to update trade" }, status: :unprocessable_entity
    end
  end
end
