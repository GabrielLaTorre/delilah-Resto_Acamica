---------------------------------------------------------------------------------------------------------------------------------
-- Datos para tabla "Usuarios"

INSERT INTO `usuarios` (`nombre_usuario`, `nombre_apellido`, `email`, `direccion`, `telefono`, `password`, `es_admin`) 
VALUES ('Robertox', 'Roberto Gomez', 'robertito@gmail.com', 'Calle Falsa 123', '2133423432', 'password1', '1'),
('Loco22', 'Lucas Hope', 'lHope@gmail.com', 'Kennedy 1234', '1123890912', 'password2', '0'),
('Terminator1', 'Tomas Lazo', 'Tlazo@gmail.com', '9 de julio 2000', '1190432390', 'password3', '0'),
('Auro', 'Aurora Hanks', 'Hanksa@gmail.com', 'Tapiales 932', '46540921', 'password4', '0');

---------------------------------------------------------------------------------------------------------------------------------
-- Datos para tabla "Platos"

INSERT INTO `platos` (`nombre_plato`, `precio_plato`) 
VALUES ('Tarta de jamon y queso', '200'),
('Papas fritas', '100'),
('CangreBurger', '300'),
('Ensalada Waldo', '250'),
('Agua mineral', '80'),
('Mousse de Limon', '150'),
('Pizza Napolitana', '500');