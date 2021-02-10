-- change the dates to what suits, refer to /flip-win/server/prize-config.php for the dates
SELECT * FROM members JOIN flip_win_records ON flip_win_records.memberid = members.memberid WHERE flip_win_records.prize_id <= 4 AND flip_win_records.date_created BETWEEN "2019-07-07 10:00:00" AND "2019-07-14 09:59:59"
