<?php
declare(strict_types=1);

namespace OCA\MetadataGenerator\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IRequest;
use Psr\Log\LoggerInterface;  // ✅ Keep Psr LoggerInterface

class PageController extends Controller {
    private LoggerInterface $logger;  

    public function __construct(
        string $appName,
        IRequest $request,
        LoggerInterface $logger  // ✅ Now properly injected
    ) {
        parent::__construct($appName, $request);
        $this->logger = $logger;
    }

    /**
     * The main page of the app.
     *
     * @return TemplateResponse
     */
    #[NoCSRFRequired] // ✅ Disable CSRF check for this route
    #[NoAdminRequired] // ✅ Ensure no admin privileges are required
    public function main(): TemplateResponse {
        // ✅ Use Nextcloud's logger for debugging
        $this->logger->info("Metadata Generator app route accessed");

        return new TemplateResponse('metadatagenerator', 'main');
    }
}
