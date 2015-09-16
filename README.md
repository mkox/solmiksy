solmiksy - solmization tool
=========================

Introduction
------------
A test presentation of this you find in **http://solmiksytest1.michaelkox.de/**.
It is best tested with Firefox. It does not work with Internet Explorer, because the wav audio format is used 
(but it works with Microsoft Edge).
It is not ready to use for a general public, but already has a lot of functionality. 

Some of the tools used for it:
- Symfony: http://symfony.com/
- Doctrine, Object Relational Mapper (ORM): http://www.doctrine-project.org/projects/orm.html
- Javascript: jQuery (http://jquery.com/), angularJS (https://angularjs.org/), requireJS (http://requirejs.org/)

My own code you find mainly in folder src/Mkox/SolmikBundle.

Installation
------------

Insert in a linux shell:

    git clone https://github.com/mkox/solmiksy.git
    cd solmiksy
    php composer.phar self-update
    php composer.phar install

The way of calling composer can be different, depending on your composer installation.

When using "php composer.phar install", you also get the oportunity to insert data 
to "app/config/parameters.yml" (e.g. database_name and database_password). You
can simply press the enter key here and insert the data later.

    php app/console doctrine:schema:validate

When so far everything is ok, the following should be shown in the shell:

    [Mapping]  OK - The mapping files are correct.
    [Database] FAIL - The database schema is not in sync with the current mapping file.

Now create database tables:

    php app/console doctrine:schema:update --force

Now you can insert data into the database tables from the file solmik_insert_data.sql.

    php app/console fos:user:create

With this you can create a user for the login area.

    php app/console assets:install --symlink

This is necessary to use the content from src/Mkox/SolmikBundle/Resources

If you use it in production context, you should rename web/.htaccess_ORIGINAL to
web/.htaccess.

Additional info: http://symfony.com/doc/current/cookbook/deployment/tools.html

Usage
-----

It is about relative solmization (http://youcantrustyourears.com/wp/solfege-solfeggio-or-solmization/). Connected with
relative solmization is a concept for learning to sing better that uses hand signs (http://dictionary.onmusic.org/appendix/topics/syllables-of-solmization). 
My idea is to replace these hand signs with units of 7 squares that you have in mind. These squares you find 
in http://solmiksytest1.michaelkox.de/ left below the music staff.

There is a music staff, which you can use amongth others to rapidly read solmization values from random notes. 
There are some configurations to decide from which area you choose random notes.
In the music staff you find also notes that represent solmization strings that can be choosen, created and played
further below.

You can hear the sound of the solmization strings, at the moment you can choose between 4 instruments.

There is a login area where you can insert new solmization strings and new categies, or change or delete them.

The buttons "start", "stop" and "reset" belong to an experimental feature for using sound that is sent 
through a microphone.

It is best tested with major sound keys, minor sound keys do not work correctly.

