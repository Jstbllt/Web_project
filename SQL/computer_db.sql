CREATE DATABASE if not EXISTS computersDB;
Use computersDB;

DROP TABLE IF EXISTS computers;
DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS cpu;
DROP TABLE IF EXISTS gpu;
DROP TABLE IF EXISTS features;

Create table brands ( 
    brand_id int AUTO_INCREMENT PRIMARY Key ,
    brand_name varchar(100) not null DEFAULT NULL
);

create table cpu (
    cpu_id int AUTO_INCREMENT PRIMARY KEY,
    cpu_brand int not null DEFAULT NULL,
    cpu_model varchar(100) not null DEFAULT NULL,
    cpu_basefrequency double not null DEFAULT NULL,
    cpu_boostfrequency double not null DEFAULT NULL,
    cpu_cores int not null DEFAULT NULL,
    constraint fk_cpu foreign key (cpu_brand) references brands(brand_id)
);

create table gpu (
    gpu_id int AUTO_INCREMENT PRIMARY KEY,
    gpu_brand int not null DEFAULT NULL,
    gpu_model varchar(100) not null DEFAULT NULL,
    gpu_fillrate_pixel double not null DEFAULT NULL,
    gpu_cu int not null DEFAULT NULL,
    gpu_memory int not null DEFAULT NULL,
    constraint fk_gpu foreign key (gpu_brand) references brands(brand_id)
);

Create table computers(
    computer_id int AUTO_INCREMENT primary key,
    computer_brand int not null DEFAULT NULL,
    computer_model varchar(100) not null DEFAULT NULL,
    computer_cpu int not null DEFAULT NULL,
    computer_gpu int not null DEFAULT NULL,
    computer_storage int not null DEFAULT NULL,
    computer_ram int not null DEFAULT NULL,
    computer_size double not null DEFAULT NULL,
    computer_price int not null DEFAULT NULL,
    constraint fk_computers1 foreign key (computer_brand) references brands(brand_id),
    constraint fk_computers2 foreign key (computer_cpu) references cpu(cpu_id),
    constraint fk_computers3 foreign key (computer_gpu) references gpu(gpu_id)
);

create table features (
    feat_id int AUTO_INCREMENT primary key,
    feat_name varchar(100) not null DEFAULT NULL,
    feat_price int not null DEFAULT NULL
);
    
create table conn (
    conn_id int AUTO_INCREMENT PRIMARY KEY,
    conn_computer int not null DEFAULT NULL,
    conn_feat int not null DEFAULT NULL,
    CONSTRAINT fk_conn_computer FOREIGN KEY (conn_computer) REFERENCES computers(computer_id),
    CONSTRAINT fk_conn_feat FOREIGN KEY (conn_feat) REFERENCES features(feat_id)
);


INSERT INTO brands VALUES
	(1,	"Apple"),
	(2,	"Asus"),
	(3,	"HP"),
    (4,	"Microsoft"),
    (5,	"Acer"),
    (6,	"Toshiba"),
    (7,	"Lenovo"),
    (8,	"DELL"),
    (9,	"MSI"),
    (10, "Razer"),
    (11, "Intel"),
    (12, "AMD"),
    (13, "NVIDIA");
    
INSERT INTO cpu VALUES
    (1,	11,	"Pentium",	1.6, null, 2),
    (2,	11,	"Core i3",	2.1, null, 4),
    (3,	11,	"Core i5",	2.3, 2.9, 4),
    (4,	11,	"Core i7",	2.2, 3.1, 8),
    (5,	11,	"Core i9",	3.1, 5, 16),
    (6,	12,	"Ryzen 3",	3.6, 3.9, 4),
    (7,	12,	"Ryzen 5",	3.6, 4.1, 6),
    (8,	12,	"Ryzen 7",	3.6, 4.4, 8),
    (9,	12,	"Ryzen 9",	3.8, 4.6, 12),
    (10, 1,	"M1", 2.1, 3.2, 8);

INSERT INTO gpu VALUES
    (1,	13,	"GeForce GTX 1080", 102.8, 20, 8),
    (2,	13,	"GeForce GTX 1660 Ti", 72, 24, 6),
    (3,	13,	"GeForce RTX 2080 Ti", 118.8, 68, 11),
    (4,	13,	"GeForce RTX 3070", 144, 46, 8),
    (5,	13,	"GeForce RTX 3080 Ti", 153.5, 80, 12),
    (6,	12,	"Radeon RX 6600", 104.1, 28, 8),
    (7,	12,	"Radeon RX 6600 XT", 126, 32, 8),
    (8,	12,	"Radeon RX 6700 XT", 148.5, 40, 12),
    (9,	12,	"Radeon RX 6900 XT", 233.6, 80, 16),
    (10, 1,	"M1", 41, 128, 8);

INSERT INTO computers VALUES
	(1, 2, "VivoBook Pro", 4, 1, 1256, 16, 15.6, 1750),
	(2,	1, "MacBook Pro", 10, 10, 512, 8, 13, 1679),
	(3,	1, "MacBook Air", 10, 10, 256, 8, 13, 1129),
    (4,	7,	"Yoga SLim7", 7, 2, 256, 8, 15.6, 799),		
    (5,	5,	"ChromeBook", 2, null, 512, 8, 17, 599),
    (6,	4,	"Surface Pro 7", 4, null, 256, 16, 13, 1700),
    (7,	8,	"Inspiron", 6, null, 256, 4, 15, 399),
    (8,	10,	"Blade 15", 9, 5, 1256, 16, 17, 3000),
    (9,	9,	"GE66 Raider", 8, 9, 1256, 16, 17, 2700),
    (10, 3,	"Pavilion 15", 1, null, 256, 4, 15, 399);

INSERT INTO features VALUES
	(1,	"Touch Screen", 250),
	(2,	"Fingerprint Identification", 100),
	(3,	"Backlit Keyboard", 150),
    (4,	"Face Identification", 200),
    (5,	"UBS-C port", 75);

INSERT INTO conn (conn_computer, conn_feat) VALUES
	(7,2),(4,4),(2,5),(9,1),(6,4),(10,2),(4,2),(1,4),(4,3),(5,5);

SELECT * FROM brands;
SELECT * FROM cpu;
SELECT * FROM gpu;
SELECT * FROM computers;
SELECT * FROM features;
SELECT * FROM conn;
