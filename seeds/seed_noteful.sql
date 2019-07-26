TRUNCATE folders, notes RESTART IDENTITY CASCADE;

INSERT INTO folders
    (name)
    VALUES
    ('Important'),
    ('Super'),
    ('Spangley');

INSERT INTO notes  
    (name, folderId, modified, content)
    VALUES 
        ('Dogs', 1, '2019-01-03T00:00:00.000Z', 'auctor velit. Aliquam nisl.'),
        ('Cats', 2, '2018-08-15T23:00:00.000Z', 'auctor velit. Aliquam nisl. '),
        ('Pigs', 2, '2018-03-01T00:00:00.000Z', 'auctor velit. Aliquam nisl. '),
        ('Birds', 1, '2019-01-04T00:00:00.000Z', 'auctor velit. Aliquam nisl. '),
        ('Bears', 1, '2018-07-12T23:00:00.000Z', 'auctor velit. Aliquam nisl. '),
        ('Horses', 2, '2018-08-20T23:00:00.000Z', 'auctor velit. Aliquam nisl. '),
        ('Tigers', 3, '2018-03-03T00:00:00.000Z', 'auctor velit. Aliquam nisl.'),
        ('Wolves', 3, '2018-05-16T23:00:00.000Z', 'auctor velit. Aliquam nisl. '),
        ('Elephants', 2, '2018-04-11T23:00:00.000Z', 'auctor velit. Aliquam nisl. '),
        ('Lions', 1, '2018-04-26T23:00:00.000Z', 'auctor velit. Aliquam nisl. '),
        ('Monkeys', 3, '2018-02-05T00:00:00.000Z', 'auctor velit. Aliquam nisl.'),
        ('Bats', 1, '2018-12-01T00:00:00.000Z', 'auctor velit. Aliquam nisl.'),
        ('Turtles', 2, '2018-09-11T23:00:00.000Z', 'auctor velit. Aliquam nisl. '),
        ('Zebras', 2, '2018-08-13T23:00:00.000Z', 'auctor velit. Aliquam nisl. ');