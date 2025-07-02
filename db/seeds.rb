# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
user = User.find_by(email: 'christopherseal@gmail.com') # or create a test user

user.shifts.create!(
  title: "Morning Shift",
  start_time: DateTime.new(2025, 7, 1, 9, 0, 0),
  end_time: DateTime.new(2025, 7, 1, 13, 0, 0),
  details: "At front desk"
)

user.shifts.create!(
  title: "Evening Shift",
  start_time: DateTime.new(2025, 7, 2, 14, 0, 0),
  end_time: DateTime.new(2025, 7, 2, 18, 0, 0),
  details: "Inventory and stocking"
)
