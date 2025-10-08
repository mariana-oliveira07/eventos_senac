create table tbatividades (
    id serial primary key,
    tipo varchar(50) not null,
    titulo varchar(100) not null,
    data date not null,
    hora time not null,
    palestrante varchar(100),
    descricao text,
    local varchar(100) not null,
    vagas int not null,
);

INSERT INTO tbatividades (tipo, titulo, data, hora, palestrante, descricao, local, vagas) VALUES
('Palestra', 'Inovação Tecnológica', '2024-07-15', '10:00', 'Dr. João Silva', 'Uma palestra sobre as últimas tendências em inovação tecnológica.', 'Auditório A', 100),
('Workshop', 'Desenvolvimento Web', '2024-07-16', '14:00', 'Maria Oliveira', 'Um workshop prático sobre desenvolvimento web moderno.', 'Laboratório de Informática', 30),
('Seminário', 'Sustentabilidade e Meio Ambiente', '2024-07-17', '09:00', 'Carlos Pereira', 'Discussão sobre práticas sustentáveis e preservação ambiental.', 'Sala de Conferências', 50);