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