class ShiftTradeService
  MAX_HOURS_PER_DAY = 14

  def self.valid_trade?(user:, new_shift:, skip_shift: nil)
    overlapping = user.shifts.any? do |existing|
      existing.id != skip_shift&.id &&
        existing.start_time < new_shift.end_time &&
        new_shift.start_time < existing.end_time
    end

    return false if overlapping

    same_day_shifts = user.shifts.select do |s|
      s.id != skip_shift&.id &&
      s.start_time.to_date == new_shift.start_time.to_date
    end

    total_hours = same_day_shifts.sum do |s|
      ((s.end_time - s.start_time) / 1.hour).round
    end

    new_hours = ((new_shift.end_time - new_shift.start_time) / 1.hour).round

    (total_hours + new_hours) <= MAX_HOURS_PER_DAY
  end
end
