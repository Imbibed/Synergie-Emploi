INSERT INTO role (id, name) VALUES (1, 'Administrateur');
INSERT INTO role (id, name) VALUES (2, 'Conseiller Insertion');
INSERT INTO role (id, name) VALUES (3, 'Agent Accueil');
INSERT INTO role (id, name) VALUES (4, 'Responsable Relation Pro');

INSERT INTO user (id, username, password, role_id) VALUES (1, 'admin_user', 'test', 1);
INSERT INTO user (id, username, password, role_id) VALUES (1, 'ins_user', 'test', 2);
INSERT INTO user (id, username, password, role_id) VALUES (1, 'acc_user', 'test', 3);
INSERT INTO user (id, username, password, role_id) VALUES (1, 'rel_user', 'test', 4);
