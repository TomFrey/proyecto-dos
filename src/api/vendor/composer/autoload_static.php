<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit47e2616f3d5a91c975220998698ff567
{
    public static $classMap = array (
        'ComposerAutoloaderInit47e2616f3d5a91c975220998698ff567' => __DIR__ . '/..' . '/composer/autoload_real.php',
        'Composer\\Autoload\\ClassLoader' => __DIR__ . '/..' . '/composer/ClassLoader.php',
        'Composer\\Autoload\\ComposerStaticInit47e2616f3d5a91c975220998698ff567' => __DIR__ . '/..' . '/composer/autoload_static.php',
        'DB' => __DIR__ . '/../..' . '/database/DB.php',
        'Kurs' => __DIR__ . '/../..' . '/models/Kurs.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInit47e2616f3d5a91c975220998698ff567::$classMap;

        }, null, ClassLoader::class);
    }
}