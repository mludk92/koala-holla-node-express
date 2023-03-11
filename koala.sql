--drop table koala;

create table koala (
id SERIAL PRIMARY KEY,
name varchar(50) not null,
age int not null,
gender varchar(1) not null,
ready_to_transfer boolean not null,
notes varchar(1028),
transfered varchar(10) default null
);

--select * from koala;

-- insert into koala (name, age, gender, ready_to_transfer, notes) 
-- values('new name', 12, 'M', true, 'test note value of this' ) 