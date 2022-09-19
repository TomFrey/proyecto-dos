<?php

class DB
{
	private static $SERVERNAME = "localhost";
	private static $DB_NAME = "chooseOne";
	private static $USERNAME = "rootuser";
	private static $PASSWORD = "rootpw";

	private static $CONN;

	public static function get() {
		if (!DB::$CONN) {
			DB::$CONN = new PDO("mysql:host=" . DB::$SERVERNAME . ";dbname=" . DB::$DB_NAME . ";charset=utf8mb4", DB::$USERNAME, DB::$PASSWORD);
			DB::$CONN->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
			return DB::$CONN;
		} else {
			return DB::$CONN;
		}
	}
}
