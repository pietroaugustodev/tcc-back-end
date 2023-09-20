-- buscando adm 

select id_admin   as id, 
       ds_email   as email,
       nm_usuario as nome,
       img_adm    as img
from   tb_admin 
where  ds_email = ?
and    ds_senha = ?

-- inserindo cliente
insert into tb_cliente(nm_cliente, ds_telefone, ds_cpf, dt_nascimento, ds_email, ds_senha, dt_cadastro)
                                values(?, ?, ?, ?, ?, ?, now());


-- Inserindo Adm
insert into tb_admin(ds_email, nm_usuario, ds_senha, img_adm)
				values('pietro@gmail.com', 'pietro', '1234', null);
insert into tb_admin(ds_email, nm_usuario, ds_senha, img_adm)
				values('william@gmail.com', 'william', '1234', null);
insert into tb_admin(ds_email, nm_usuario, ds_senha, img_adm)
				values('thiago@gmail.com', 'thiago', '1234', null);
insert into tb_admin(ds_email, nm_usuario, ds_senha, img_adm)
				values('eduardo@gmail.com', 'eduardo', '1234', null);