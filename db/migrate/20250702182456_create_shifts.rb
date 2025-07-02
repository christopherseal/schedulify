class CreateShifts < ActiveRecord::Migration[8.0]
  def change
    create_table :shifts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.text :details
      t.datetime :start_time
      t.datetime :end_time

      t.timestamps
    end
  end
end
