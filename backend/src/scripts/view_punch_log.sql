/*SELECT * FROM attendance_dev.punchLog;
*/
/**/

use attendance_dev;
alter View View_PunchCard
as
(
select tab2.*, timeIn, timeOut, description, dayofweek, shift.id shiftId from (
select tab1.id, tab1.code, tab1.userId, tab1.userName, tab1.userGroup, tab1.date, weekday(tab1.date) as diaSemanaPunch, tab1.device, tab1.deviceId, tab1.userDefinedSchedulerId, 
tab1.schedulerId, tab1.userDefinedSchedulerName, tab1.exception, tab1.shiftSupposedTimeIn, tab1.shiftSupposedTimeOut, tab1.shiftSupposedGracePerior
, tab1.shiftDescription, tab1.json, tab1.dailyCardId, time(date) /60 tempoEmMinutos, case when row_num %2 !=0 then 'Entrada' else 'Saida' end AS punchType from (

SELECT *,   
    ROW_NUMBER() OVER(PARTITION BY userId) AS row_num  
FROM punchLog) tab1) tab2
left outer join shift on tab2.userDefinedSchedulerId = shift.scheduleIdId  and tempoEmMinutos between shift.timeIn and shift.timeOut
and tab2.diaSemanaPunch = shift.dayofweek);

/*select * from View_PunchCard;
*/

create view view_PunchDailyDetails
as
select v.data, v.userid,userGroup,v.shiftid,max(v.entrada) entrada ,max(v.saida) saida from 
	(
		SELECT date(v.date) data, v.userid,userGroup,v.shiftid,
			case when punchtype = 'Entrada' then v.tempoEmMinutos end entrada,
			case when punchtype = 'Saida' then v.tempoEmMinutos end saida 
    FROM View_PunchCard as v) as v
    group by v.data, v.userid,userGroup,v.shiftid;