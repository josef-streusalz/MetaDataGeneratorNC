<?php

namespace OCA\MetadataGenerator\AppInfo;

use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use Psr\Log\LoggerInterface;
use OCP\ILogger;

class Application extends App implements IBootstrap {
    public const APP_ID = 'metadatagenerator';

    public function __construct(array $urlParams = []) {
        parent::__construct(self::APP_ID, $urlParams);
    }

    /**
     * Register services during app registration.
     */
    public function register(IRegistrationContext $context): void {
        $context->registerService(LoggerInterface::class, function ($c) {
            return new class($c->get(ILogger::class)) implements LoggerInterface {
                private $logger;
                public function __construct(ILogger $logger) {
                    $this->logger = $logger;
                }
                public function emergency($message, array $context = []) { $this->logger->log(ILogger::EMERGENCY, $message, $context); }
                public function alert($message, array $context = []) { $this->logger->log(ILogger::ALERT, $message, $context); }
                public function critical($message, array $context = []) { $this->logger->log(ILogger::CRITICAL, $message, $context); }
                public function error($message, array $context = []) { $this->logger->log(ILogger::ERROR, $message, $context); }
                public function warning($message, array $context = []) { $this->logger->log(ILogger::WARNING, $message, $context); }
                public function notice($message, array $context = []) { $this->logger->log(ILogger::NOTICE, $message, $context); }
                public function info($message, array $context = []) { $this->logger->log(ILogger::INFO, $message, $context); }
                public function debug($message, array $context = []) { $this->logger->log(ILogger::DEBUG, $message, $context); }
                public function log($level, $message, array $context = []) { $this->logger->log($level, $message, $context); }
            };
        });
    }

    /**
     * Perform actions during the app boot process.
     */
    public function boot(IBootContext $context): void {
        $logger = $context->getAppContainer()->query(LoggerInterface::class);
        $logger->info(self::APP_ID . ' app bootstrapped successfully.');
    }
}
