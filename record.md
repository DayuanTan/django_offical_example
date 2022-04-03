# Record


django_offical_example$ python -m venv venv

django_offical_example$ source venv/bin/activate

(venv) django_offical_example$ pip install django

django_offical_example$ django-admin startproject mysite

django_offical_example/mysite$ python manage.py runserver

django_offical_example/mysite$ python manage.py startapp polls

django_offical_example/mysite$ python manage.py runserver


$ brew install mysql

- Install path:
usr/local/Cellar/mysql/8.0.28_1/


$ brew services start mysql



$ mysql -u root -p
Enter password: no pwd. brew by default install mysql without root pwd

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)

mysql> CREATE USER 'admin'@'%' IDENTIFIED BY 'admin';
Query OK, 0 rows affected (0.02 sec)

mysql> grant all privileges on *.* to 'admin'@'%';
Query OK, 0 rows affected (0.01 sec)

mysql> exit

$ brew services stop mysql
Stopping `mysql`... (might take a while)
==> Successfully stopped `mysql` (label: homebrew.mxcl.mysql)



# Explain:
- If you are working on the machine with MySQL, use username@localhost to define the user.
- If you are connecting remotely, use username@ip_address, and replace ip_address with the actual address of the remote system hosting MySQL.
- Therefore, the command will be:

- - CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';

- - or

- - CREATE USER 'username'@'ip_address' IDENTIFIED BY 'password';

- You can also create a user that can connect from any machine with the command:

- - CREATE USER 'username'@'%' IDENTIFIED BY 'password';
- To grant all privileges to MySQL User on all databases use the command:

- - GRANT ALL PRIVILEGES ON *.* TO 'database_user'@'localhost';
- The basic syntax used to grant privileges to a user account is:

- - GRANT permission_type ON database.table TO 'username'@'localhost';
- For example, to grant insert privileges to a MySQL user you would run the command:

- - GRANT INSERT ON *.* TO 'username'@'localhost';


# Record continue

django_offical_example/mysite$ pip install mysqlclient

$ pip install mysqlclient
django.db.utils.OperationalError: (1045, "Access denied for user 'dyt'@'localhost' (using password: NO)")

$ mysql -u root -p
mysql> CREATE USER 'dyt'@'%' IDENTIFIED BY 'admin';
Query OK, 0 rows affected (0.04 sec)

mysql> grant all privileges on *.* to 'dyt'@'%';
Query OK, 0 rows affected (0.01 sec)


$ python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying admin.0003_logentry_add_action_flag_choices... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying auth.0010_alter_group_name_max_length... OK
  Applying auth.0011_update_proxy_permissions... OK
  Applying auth.0012_alter_user_first_name_max_length... OK
  Applying sessions.0001_initial... OK


(vene) django_offical_example/mysite$ python manage.py makemigrations polls
Migrations for 'polls':
  polls/migrations/0001_initial.py
    - Create model Question
    - Create model Choice

(vene) django_offical_example/mysite$  python manage.py sqlmigrate polls 0001
--
-- Create model Question
--
CREATE TABLE `polls_question` (`id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY, `question_text` varchar(200) NOT NULL, `pub_date` datetime(6) NOT NULL);
--
-- Create model Choice
--
CREATE TABLE `polls_choice` (`id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY, `choice_text` varchar(200) NOT NULL, `votes` integer NOT NULL, `question_id` bigint NOT NULL);
ALTER TABLE `polls_choice` ADD CONSTRAINT `polls_choice_question_id_c5b4b260_fk_polls_question_id` FOREIGN KEY (`question_id`) REFERENCES `polls_question` (`id`);

(vene) django_offical_example/mysite$ python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, polls, sessions
Running migrations:
  Applying polls.0001_initial... OK


(vene) django_offical_example/mysite$ python manage.py shell
Python 3.7.2 (v3.7.2:9a3ffc0492, Dec 24 2018, 02:44:43)
[Clang 6.0 (clang-600.0.57)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
(InteractiveConsole)
>>> from polls.models import Choice, Question
>>> Question.objects.all()
<QuerySet []>
>>> from django.utils import timezone
>>> q = Question(question_text="What's new?", pub_date=timezone.now())
>>> q.save()
>>> q.id
1
>>> q.question_text
"What's new?"
>>> q.pub_date
datetime.datetime(2022, 3, 30, 18, 34, 8, 648755, tzinfo=<UTC>)
>>> q.question_text = "What's up?"
>>> q.save()
>>> Question.objects.all()
<QuerySet [<Question: Question object (1)>]>
>>> exit()

$ python manage.py createsuperuser
admin/admin