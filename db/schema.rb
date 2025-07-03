# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_07_03_143842) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "shift_trades", force: :cascade do |t|
    t.bigint "shift_from_id", null: false
    t.bigint "shift_to_id"
    t.bigint "from_user_id", null: false
    t.bigint "to_user_id", null: false
    t.string "status", default: "pending"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["from_user_id"], name: "index_shift_trades_on_from_user_id"
    t.index ["shift_from_id"], name: "index_shift_trades_on_shift_from_id"
    t.index ["shift_to_id"], name: "index_shift_trades_on_shift_to_id"
    t.index ["to_user_id"], name: "index_shift_trades_on_to_user_id"
  end

  create_table "shifts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "title"
    t.text "details"
    t.datetime "start_time"
    t.datetime "end_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_shifts_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "shift_trades", "shifts", column: "shift_from_id"
  add_foreign_key "shift_trades", "shifts", column: "shift_to_id"
  add_foreign_key "shift_trades", "users", column: "from_user_id"
  add_foreign_key "shift_trades", "users", column: "to_user_id"
  add_foreign_key "shifts", "users"
end
