<?php

namespace Mkox\SolmikBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class DefaultController extends Controller
{
    /**
     * @Route("/solmik/start")
     * @Template()
     */
    public function indexAction() {

        $objectManager = $this->getServiceLocator()->get('Doctrine\ORM\EntityManager');

        $repository = $objectManager->getRepository('Solmik\Entity\Category');

        $categoriesList = $repository->findBy(array(), array('name' => 'ASC'));

        $stringForms = array();
        for ($i = 0; $i < count($categoriesList); $i++) {

            $solmistrings = $categoriesList[$i]->getSolmistrings();
            if ($solmistrings) {

                $stringForms[$i] = array();
                for ($j = 0; $j < count($solmistrings); $j++) {

                    $stringForm = new Form\SolmistringFormForList($objectManager);
                    $stringForms[$i][] = $stringForm->bind($solmistrings[$j]);
                }
            }
        }


        return new ViewModel(array(
            'categories' => $categoriesList,
            'stringForms' => $stringForms
        ));
    }
}
