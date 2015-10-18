<?php

namespace Mkox\SolmikBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class JasmineTestController extends Controller {

    /**
     * @Route("/solmik/jasmine", name="solmik-jasmine")
     * @Template()
     */
    public function indexAction() {
        
        return array();
    }

}
