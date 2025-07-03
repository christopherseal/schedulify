class ShiftTrade < ApplicationRecord
  belongs_to :shift_from, class_name: "Shift"
  belongs_to :shift_to, class_name: "Shift", optional: true
  belongs_to :from_user, class_name: "User"
  belongs_to :to_user, class_name: "User"

  validates :status, inclusion: { in: %w[pending accepted rejected] }
end
