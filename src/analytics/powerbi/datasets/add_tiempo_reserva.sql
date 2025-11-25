-- HU3 - Adaptativo: agregar nuevo campo a tienda
ALTER TABLE tiendas
ADD COLUMN tiempo_max_reserva_minutos INT DEFAULT 60;

