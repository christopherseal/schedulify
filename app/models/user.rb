class User < ApplicationRecord
  has_secure_password

  VALID_EMAIL_REGEX = URI::MailTo::EMAIL_REGEXP
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }

  has_many :shifts, dependent: :destroy
end
