class ApplicationController < ActionController::API
  def authenticate_user!
    unless current_user
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def current_user
    return @current_user if defined?(@current_user)

    auth_header = request.headers["Authorization"]
    token = auth_header&.split(" ")&.last

    if token
      begin
        decoded = JWT.decode(token, Rails.application.credentials.secret_key_base)[0]
        @current_user = User.find(decoded["user_id"])
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound
        @current_user = nil
      end
    else
      @current_user = nil
    end
  end
end
