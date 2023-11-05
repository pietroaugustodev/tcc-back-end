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
				values('Café em grãos', '/assets/images/categorias/graos.png');
insert into tb_categoria(nm_categoria, img_categoria)
				values('Café em pó', '/assets/images/categorias/po.png');
insert into tb_categoria(nm_categoria, img_categoria)
				values('Cafeteiras', '/assets/images/categorias/cafeteiras.png');
insert into tb_categoria(nm_categoria, img_categoria)
				values('Combos', '/assets/images/categorias/combo.png');
insert into tb_categoria(nm_categoria, img_categoria)
				values('Filtros', '/assets/images/categorias/filtros.webp');
insert into tb_categoria(nm_categoria, img_categoria)
				values('Cápsulas', '/assets/images/categorias/capsulas.webp');                
insert into tb_categoria(nm_categoria, img_categoria)
				values('Moedores', '/assets/images/categorias/moedores.webp');
insert into tb_categoria(nm_categoria, img_categoria)
				values('Acessórios', '/assets/images/categorias/acessorios.jpg');        

-- Inserindo pedido
insert into tb_pedido(id_cliente, id_endereco_entrega, ds_codigo_pedido, tp_entrega, tp_forma_pagamento, dt_pedido, ds_situacao, vl_subtotal, vl_frete, vl_total, ds_avaliacao)
				values  (1, 1, '000-000', 'Entrega Express', 'Cartão de Crédito', now(), 'Aguardando pagamento', 300.00, 11.00, 311.00, 5);