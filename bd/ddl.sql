
create database bunaShiki;
use bunaShiki;

create table tb_admin (
	id_admin	int primary key auto_increment,
	ds_email	varchar(100) not null,
	nm_usuario	varchar(200) not null,
	ds_senha	varchar(20) not null,
	img_adm		varchar(800) null
);

create table tb_detalhes (
	id_detalhe 		int primary key auto_increment,
	ds_intensidade 	varchar(10) not null,
	ds_docura 		varchar(50) not null,
	ds_acidez 		varchar(50) not null,
	ds_torra 		varchar(50) not null,
	ds_produto 		varchar(1200) not null,
	ds_marca 		varchar(200) not null,
	ds_peso 		varchar(200) not null,
	ds_alergia 		varchar(800) null,
	ds_dimensoes 	varchar(100) not null
);

create table tb_categoria (
	id_categoria 	int primary key auto_increment,
	nm_categoria 	varchar(100) not null,
	img_categoria 	varchar(1200) not null
);

create table tb_produto (
	id_produto					int primary key auto_increment,
	id_detalhe					int not null,
    id_admin					int not null,
	id_categoria 				int not null,
	nm_produto 					varchar(400) not null,
	vl_preco 					decimal(5,2) not null,
	vl_preco_promocional 		decimal(5,2) null,
	bt_disponivel_assinatura	boolean not null,
	qtd_estoque 				int not null,
    foreign key (id_admin) references tb_admin(id_admin),
    foreign key (id_detalhe) references tb_detalhes(id_detalhe),
    foreign key (id_categoria) references tb_categoria(id_categoria)
);

create table tb_produto_imagem (
	id_produto_img 	int primary key auto_increment,
	id_produto 		int not null,
	ds_caminho 		varchar(1200) not null,
    foreign key (id_produto) references tb_produto(id_produto)
);



create table tb_cliente (
	id_cliente int primary key auto_increment,
	nm_cliente varchar(200) not null,
	ds_telefone varchar(100) not null,
	ds_cpf varchar(20) not null,
	dt_nascimento date null,
    ds_email varchar(100) not null,
	ds_senha varchar(100) not null,
	dt_cadastro datetime not null
);

                    
create table tb_endereco (
	id_endereco int primary key auto_increment,
	id_cliente int not null,
	ds_cep varchar(15) not null,
	ds_rua varchar(200) not null,
	ds_cidade varchar(100) not null,
	ds_complemento varchar(200) null,
	nr_endereco varchar(15) not null,
    foreign key (id_cliente) references tb_cliente(id_cliente)
);

create table tb_assinatura (
	id_assinatura int primary key auto_increment,
	id_cliente int,
	id_endereco int,
	dt_inicio datetime not null,
	dt_fim date null,
	vl_mensalidade decimal(6,2) not null,
    foreign key (id_cliente) references tb_cliente(id_cliente),
    foreign key (id_endereco) references tb_endereco(id_endereco)
);

create table tb_assinatura_item (
	id_assinatura_item int primary key auto_increment,
	id_produto int not null,
	id_assinatura int not null,
	qtd_itens int not null,
    foreign key (id_produto) references tb_produto(id_produto),
    foreign key (id_assinatura) references tb_assinatura(id_assinatura)
);

create table tb_cartoes (
	id_cartoes int primary key auto_increment,
	id_cliente int not null,
	ds_identidade_titular varchar(100) not null, 
	ds_nome_titular varchar(100) not null,
	ds_cvv varchar(10) not null,
	ds_validade varchar(10) not null,
	nr_cartao varchar(50) not null,
    foreign key(id_cliente) references tb_cliente(id_cliente)
);	

create table tb_pedido (
	id_pedido int primary key auto_increment,
	id_cliente int not null,
    id_endereco_entrega int not null,
	tp_entrega varchar(100) not null,
	tp_forma_pagamento varchar(100) not null ,
	dt_pedido datetime not null,
	dt_entrega_pedido date not null,
	ds_situacao varchar(100) not null,
	vl_subtotal decimal(7, 2) not null,
	vl_frete decimal(5, 2) not null,
	vl_total decimal(7, 2) not null,
	ds_avaliacao int null,
    foreign key (id_cliente) references tb_cliente(id_cliente),
    foreign key (id_endereco_entrega) references tb_endereco(id_endereco)
);


create table tb_pedido_item (
	id_pedido_item int primary key auto_increment,
	id_pedido int not null,
	id_produto int not null,
	qtd_itens int not null,
    foreign key (id_pedido) references tb_pedido(id_pedido)
);

create table tb_combo (
	id_combo int primary key auto_increment,
	nm_combo varchar(250) not null,
	vl_preco decimal(7, 2) not null,
	qtd_estoque int not null
);

create table tb_combo_item (
	id_combo_item int primary key auto_increment,
	id_combo int not null,
	id_produto int not null,
	qtd_itens int not null,
    foreign key (id_combo) references tb_combo(id_combo),
    foreign key (id_produto) references tb_produto(id_produto)
);