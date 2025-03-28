<?php

declare(strict_types=1);

namespace OCA\MetadataGenerator\AppInfo;

// Define routes for your app
return [
    'routes' => [
        [
            'name' => 'page#main',
            'url' => '/main',
            'verb' => 'GET',
        ],
        [
            'name' => 'api#save',
            'url' => '/api/save',
            'verb' => 'POST',
        ],
        [
            'name' => 'api#getFolderStructure',
            'url' => '/api/folder-structure',
            'verb' => 'GET',
        ],
    ],
];
