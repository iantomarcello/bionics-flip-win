create table flip_win_records (
  id int(4) primary key auto_increment,
  prize_id int(1),
  date_created datetime,
  memberid int(6) zerofill
);
