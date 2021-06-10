/*SELECT * FROM attendance_dev.punchLog;
*/
/**/

alter View View_PunchCard
as
(
select tab2.*, timeIn, timeOut, description, dayofweek, shift.id shiftId, minTimeIn, maxTimeOut from (
select tab1.id, tab1.code, tab1.userId, tab1.userName, tab1.userGroup, tab1.date, dayofweek(tab1.date) as diaSemanaPunch, tab1.device, tab1.deviceId, tab1.userDefinedSchedulerId, 
tab1.schedulerId, tab1.userDefinedSchedulerName, tab1.exception, tab1.shiftSupposedTimeIn, tab1.shiftSupposedTimeOut, tab1.shiftSupposedGracePerior
, tab1.shiftDescription, tab1.json, case when row_num %2 !=0 then 'Entrada' else 'Saida' end AS punchType from (

SELECT *,   
    ROW_NUMBER() OVER(PARTITION BY userId, date(date) order by date) AS row_num  
FROM punchLog) tab1) tab2
left outer join shift on tab2.userDefinedSchedulerId = shift.scheduleIdId  and time(date) between time(shift.minTimeIn) and time(shift.maxTimeOut)
and tab2.diaSemanaPunch = shift.dayofweek);

/*select * from View_PunchCard;
*/

    ;
  alter view view_PunchDaily
as
select delayEntrance, delayOut, addtime(delayEntrance, delayOut) totalDelay, date, userId, userName, userGroup, shiftId, description, entrada, entradashift,
saida, saidashift, shiftSupposedGracePerior, totalHorasEntrada, totalHorasSaida, totalHorasTrabalho from 
(
select if(delayEntrance < '00:00:00', '00:00:00', delayEntrance) delayEntrance, if(delayOut < '00:00:00', '00:00:00', delayOut) delayOut  , 
date, userId, userName, userGroup, shiftId, description, entrada, entradashift, totalHorasEntrada, totalHorasSaida, SEC_TO_TIME(totalHorasSaida - totalHorasEntrada) totalHorasTrabalho,
saida, saidashift, shiftSupposedGracePerior from 
(
select subtime(time(tab1.entrada), time(entradashift)) delayEntrance, subtime( time(saida), time(tab1.saidashift)) delayOut,     
    tab1.* from ( select v.date, v.userid, v.userName,userGroup,v.shiftid, v.description, min(v.entrada) entrada, Sum(Time_to_sec(time(v.entrada))) totalHorasEntrada, Sum(Time_to_sec(time(v.saida))) totalHorasSaida, 
    timeIn entradashift,max(v.saida) saida, timeOut saidashift, shiftSupposedGracePerior from   (   SELECT date(v.date) date, 
    v.userName, v.userid,userGroup,v.shiftid, timeIn, timeOut, description, shiftSupposedGracePerior,    
    case when punchtype = 'Entrada' then v.date end entrada,    case when punchtype = 'Saida' then v.date end saida  
    FROM View_PunchCard as v) as v     group by v.date, v.userid,userGroup,v.shiftid     ) tab1
    
    )tab2
    
    )tab3;


        create view view_totalWHours
    as
    select tab1.*, userGroup.name userGroup from (
    select userId, min(userName) userName, max(userGroup) userGroupId, count(date) workingDays, SEC_TO_TIME(Sum(Time_to_sec(totalDelay))) totalDelay, SEC_TO_TIME(Sum(Time_to_sec(totalHorasTrabalho))) totalWorkingHours from view_PunchDaily
    group by userId) tab1 left join userGroup on tab1.userGroupId = userGroup.id ; 


     DELIMITER $$
create PROCEDURE getTotalWorkingHours 
(
   IN theUserId int,
   IN userGroup varchar(50),
   IN dateBegin date,
   IN dateEnd date
) 
BEGIN 
    select ROW_NUMBER() OVER(PARTITION BY userId) as id, tab2.* from (select tab1.*, userGroup.name userGroup from (
    select userId, min(userName) userName, max(userGroup) userGroupId, count(date) workingDays, 
    SEC_TO_TIME(Sum(Time_to_sec(totalDelay))) totalDelay, SEC_TO_TIME(Sum(Time_to_sec(totalHorasTrabalho))) totalWorkingHours from view_PunchDaily
    where date between dateBegin and dateEnd
    group by userId) tab1 left join userGroup on tab1.userGroupId = userGroup.id ) tab2; 
    
END $$
DELIMITER ;