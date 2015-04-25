Идея
====

Описание
--------

Система за тракване на преходи в планината. Отбелязване на пътеки, хижи, вело маршрути и други. 
Ще предоставя api, коeто ще приема и обработва GPS координати и допълнителна помощна информация. 
Ще има и мобилно приложение, чрез което ще може да се записва даден преход; 
да се използва като навигация за вече записан маршрут.

Участници
---------

Владимир, Георги и други (todo)


Технологии
----------

HTML / CSS / JavaScript , Python, Django, Databases - SQL или NoSQL


Задачки
=======

1. Да можеш да добавяш note в някоя точка на пътя например качваш снимка, добавяш sound recording примерно "Тука не тръгвайте по горната пътечка, а по долната"
2. Идейка, интеграция с други тракващи програми

Подкарване на Docker
==================
1. Свалете си docker от [https://master.dockerproject.com/](https://master.dockerproject.com/)
2. Влезнете в директорията на docker и изпълнете `chown <your_user> docker`
3. Преместете го `mv ./docker /usr/local/bin`
4. Пуснете docker daemon-ът `docker -d &`
5. Подсигурете се, че имате cgroups `service cgroups status`. Ако нямате (ubuntu & forks): `apt-get install cgroups-lite` 
6. Готови сте за ползване.

Помощни материали
=================

1. [How to use docker on windows](http://blog.tutum.co/2014/11/05/how-to-use-docker-on-windows/ "How to use docker on windows")
2. [Docker Cheat Sheet](https://github.com/vkorichkov/docker-cheat-sheet "Docker Cheat Sheet")
3. [Testing with Docker](https://github.com/realpython/django-docker-tests "Testing with Docker")
4. [Sublime Text 2/3 Markdown Preview](https://github.com/revolunet/sublimetext-markdown-preview "Sublime Text 2/3 Markdown Preview")
