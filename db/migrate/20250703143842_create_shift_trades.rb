class CreateShiftTrades < ActiveRecord::Migration[8.0]
  def change
    create_table :shift_trades do |t|
      t.references :shift_from, null: false, foreign_key: { to_table: :shifts }
      t.references :shift_to, foreign_key: { to_table: :shifts }
      t.references :from_user, null: false, foreign_key: { to_table: :users }
      t.references :to_user, null: false, foreign_key: { to_table: :users }
      t.string :status, default: 'pending'
      t.timestamps
    end
  end
end
