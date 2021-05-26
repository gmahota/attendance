/*SELECT * FROM attendance_dev.punchLog;
*/
/**/

alter View View_PunchCard
as
(
alter View View_PunchCard
as
  (
  select tab2.*, timeIn, timeOut, description, dayofweek, shift.id shiftId, minTimeIn, maxTimeOut
  from (
select tab1.id, tab1.code, tab1.userId, tab1.userName, tab1.userDepartment , tab1.userGroupName as userGroup, tab1.date, weekday(tab1.date) as diaSemanaPunch, tab1.device, tab1.deviceId, tab1.userDefinedSchedulerId,
      tab1.schedulerId, tab1.userDefinedSchedulerName, tab1.exception, tab1.shiftSupposedTimeIn, tab1.shiftSupposedTimeOut, tab1.shiftSupposedGracePerior
, tab1.shiftDescription, tab1.json, case when row_num %2 !=0 then 'Entrada' else 'Saida' end AS punchType
    from (

SELECT punchLog.*, userGroup.name as userGroupName,
        ROW_NUMBER() OVER(PARTITION BY userId) AS row_num
      FROM punchLog
        left join userGroup on punchLog.userGroup = userGroup.id ) tab1) tab2
    left outer join shift on tab2.userDefinedSchedulerId = shift.scheduleIdId and time(date) between time(shift.minTimeIn) and time(shift.maxTimeOut)
      and tab2.diaSemanaPunch = shift.dayofweek
);

/*select * from View_PunchCard;
*/

select *
from view_PunchDaily;
alter view view_PunchDaily
as
  select delayEntrance, delayOut, addtime(delayEntrance, delayOut) totalDelay, date, userId, userName, userGroup, shiftId, description, entrada, entradashift,
    saida, saidashift, shiftSupposedGracePerior
  from
    (
select if(delayEntrance < '00:00:00', '00:00:00', delayEntrance) delayEntrance, 
if(delayOut < '00:00:00', '00:00:00', delayOut) delayOut  , 
date, userId, userName, userGroup, shiftId, description, entrada, entradashift,
saida, saidashift, shiftSupposedGracePerior from
(
select subtime(time(tab1.entrada), time(entradashift)) delayEntrance, subtime( time(saida), time(tab1.saidashift)) delayOut,
  tab1.*
from ( select v.date, v.userid, v.userName, userGroup, v.shiftid, v.description, max(v.entrada) entrada,
    timeIn entradashift, max(v.saida) saida, timeOut saidashift, shiftSupposedGracePerior
  from (   SELECT date(v.date) date,
      v.userName, v.userid, userGroup, v.shiftid, timeIn, timeOut, description, shiftSupposedGracePerior,
      case when punchtype = 'Entrada' then v.date end entrada, case when punchtype = 'Saida' then v.date end saida
    FROM View_PunchCard as v) as v
  group by v.date, v.userid,userGroup,v.shiftid     ) tab1
    
    )
tab2
    
    )tab3;