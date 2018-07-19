INSERT INTO public.batchs (id,batch_number,start_date,end_date)
VALUES (1,1,'1990-10-03','1995-09-09') ;
INSERT INTO public.batchs (id,batch_number,start_date,end_date)
values (2,2,'2000-01-01','2000-12-25') ;
insert into public.students (id,firstName,last_name,batch_id)
values (1,'Adam','Passingham',1);
insert into public.students (id,firstName,last_name,batch_id)
values (2,'Lloyd','Passingham',1);
insert into public.students (id,firstName,last_name,batch_id)
values (3,'Adrian','Passingham',2);
insert into public.students (id,firstName,last_name,batch_id)
values (4,'Nigel','Passingham',2);
insert into public.teachers (id, "name", email, password)
values (1,'Kat Carson','kat@carson.com','katcarson1');
insert into public.evaluations (id,"comment","date",color,student_id,teacher_id)
values (1,'this is a good evaluation','2018-06-12','green',1,1);