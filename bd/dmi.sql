-- buscando adm 

select id_admin   as id, 
       ds_email   as email,
       nm_usuario as nome,
       img_adm    as img
from   tb_admin 
where  ds_email = ?
and    ds_senha = ?

-- Inserindo cliente
insert into tb_cliente(nm_cliente, ds_telefone, ds_cpf, dt_nascimento, ds_email, ds_senha, dt_cadastro)
                                values(?, ?, ?, ?, ?, ?, now());

-- Inserindo produto
insert into tb_produto (id_detalhe, id_admin, id_categoria, nm_produto, vl_preco, vl_preco_promocional, bt_disponivel_assinatura, qtd_estoque)
                values(4, 2, 1, 'sla', 335.55, 35.55, true, 5);

-- Inserindo Adms
insert into tb_admin(ds_email, nm_usuario, ds_senha, img_adm)
				values('pietro@gmail.com', 'pietro', '1234', null);
insert into tb_admin(ds_email, nm_usuario, ds_senha, img_adm)
				values('william@gmail.com', 'william', '1234', null);
insert into tb_admin(ds_email, nm_usuario, ds_senha, img_adm)
				values('thiago@gmail.com', 'thiago', '1234', null);
insert into tb_admin(ds_email, nm_usuario, ds_senha, img_adm)
				values('eduardo@gmail.com', 'eduardo', '1234', null);

-- Inserindo categorias
insert into tb_categoria(nm_categoria, img_categoria)
				values('Filtros', '/assets/images/categorias/filtros.webp');
insert into tb_categoria(nm_categoria, img_categoria)
				values('Grãos', '/assets/images/categorias/graosz-cat.png');
insert into tb_categoria(nm_categoria, img_categoria)
				values('Café em pó', '/assets/images/categorias/poo-cat.png');
insert into tb_categoria(nm_categoria, img_categoria)
				values('Cafeteiras', '/assets/images/categorias/cafeteiraa-cat.png');
insert into tb_categoria(nm_categoria, img_categoria)
				values('Combos', '/assets/images/categorias/cat-graoss.png');
insert into tb_categoria(nm_categoria, img_categoria)
				values('Moedores', '/assets/images/categorias/moedores+.webp');
insert into tb_categoria(nm_categoria, img_categoria)
				values('Cápsulas', '/assets/images/categorias/capsulas.webp');                