# Challenge Laravel and React

## Available Scripts with React.js
We have to locate in the **fe-project** directory

First we have to install all dependencies, you can run:

### `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Available Scripts with Laravel
We have to locate in the **be-project** directory

First we have to install all dependencies of Laravel

### `composer install`

After that we have to create our database with name `beproject` or run this script in your database 

### `CREATE DATABASE IF NOT EXISTS 'beproject'`

No we have to eject the migration to create our table in the database

### `php artisan migrate`

or run this script in your database
```sql
CREATE TABLE IF NOT EXISTS `tasks` (
`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`completed` tinyint(1) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

We can create some examples by ejecuting

### `php artisan db:seed --class=TaskTableSeeder`

And finally we can run this script in command line to run our server

### `php artisan serve`

Our server will be running in `http://127.0.0.1:8000`
