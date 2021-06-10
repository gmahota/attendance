-- use attendance_dev03;
-- INSERT INTO `userGroup`
-- (`id`,
-- `name`,
-- createdAt,updatedAt,parent_id )
-- select id,name,createdAt,updatedAt,parent_id  from biostar_tna.usergroup;

DELIMITER $$
create PROCEDURE jobCopyUserGroups() 
BEGIN 
	INSERT INTO `userGroup`
	(`id`,
	`name`,
	createdAt,updatedAt,parent_id )
	select id,name,createdAt,updatedAt,parent_id  from biostar_tna.usergroup;
END $$
DELIMITER ;


DELIMITER $$
create PROCEDURE jobCopyUsers() 
BEGIN 
	INSERT INTO `user`
	(`id`,
	`name`,
	`userGroupId`,`scheduleByUserOrGroup`)
	select user_id,name,ugid,'G' from biostar_tna.user;
END $$
DELIMITER ;

-- INSERT INTO `user`
-- (`id`,
-- `name`,
-- `userGroupId`,`scheduleByUserOrGroup`)
-- select user_id,name,ugid,'G' from biostar_tna.user;

DELIMITER $$
create PROCEDURE jobCopyPunchLog() 
BEGIN 

INSERT INTO punchLog
(`id`,
`userId`,
`userName`,
`userGroup`,
`userDepartment`,
`date`,
`device`,
`deviceId`,
`userDefinedSchedulerName`
)
select * from (
	select p1.id,p1.user_id,p1.user_name,user.userGroupId as userGroup,
		user.departmentid,
		p1.devdt as date,
		p1.devnm as device,p1.devid as deviceId,
		'G' as userDefinedSchedulerId from biostar_tna.punchlog p1
		left join user on user.id = p1.user_id
        left join attendance_dev03.punchLog p2 on p2.id = p1.id
        where p2.id is null
	order by p1.createdat desc limit 50
) a;

END $$
DELIMITER ;


DELIMITER $$
create PROCEDURE jobUpdateUser() 
BEGIN 

update user devuser
INNER JOIN biostar_tna.user tnauser
        ON devuser.id = tnauser.user_id
        set devuser.name = tnauser.name, devuser.userGroupId = tnauser.ugid 
        where (tnauser.name!=devuser.name or tnauser.ugid!=devuser.userGroupId);

END $$
DELIMITER ;

DELIMITER $$
create PROCEDURE git () 
BEGIN 
        
update userGroup devgroup
inner join biostar_tna.usergroup tnagroup
on devgroup.id = tnagroup.id
set devgroup.name = tnagroup.name, devgroup.createdAt = tnagroup.createdAt, devgroup.updatedAt = tnagroup.updatedAt, devgroup.parent_id = tnagroup.parent_id
where (devgroup.name != tnagroup.name or devgroup.createdAt != tnagroup.createdAt or devgroup.updatedAt != tnagroup.updatedAt or devgroup.parent_id != tnagroup.parent_id);

	

END $$
DELIMITER ;